package daemon

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"github.com/multica-ai/multica/server/pkg/agent"
)

// stubLookPath swaps the package-level lookPath indirection used by
// registerRuntimesForWorkspace to resolve custom runtime-profile commands,
// so tests don't have to mutate the process PATH. resolved maps a command
// name to the absolute path it should resolve to; an absent name reports
// "not found".
func stubLookPath(t *testing.T, resolved map[string]string) {
	t.Helper()
	orig := lookPath
	lookPath = func(cmd string) (string, error) {
		if p, ok := resolved[cmd]; ok {
			return p, nil
		}
		return "", &osExecNotFound{cmd: cmd}
	}
	t.Cleanup(func() { lookPath = orig })
}

type osExecNotFound struct{ cmd string }

func (e *osExecNotFound) Error() string { return "exec: " + e.cmd + ": not found in $PATH" }

// TestClient_GetRuntimeProfiles_RequestShape asserts the daemon GETs the
// documented path and parses the server's runtime_profiles payload.
func TestClient_GetRuntimeProfiles_RequestShape(t *testing.T) {
	var gotMethod, gotPath, gotDaemon string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotMethod = r.Method
		gotPath = r.URL.Path
		gotDaemon = r.URL.Query().Get("daemon_id")
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{
			"workspace_id":"ws-1",
			"runtime_profiles":[{
				"id":"prof-1",
				"workspace_id":"ws-1",
				"display_name":"Company Codex",
				"protocol_family":"codex",
				"command_name":"company-codex",
				"description":null,
				"fixed_args":["--foo"],
				"visibility":"workspace",
				"created_by":null,
				"enabled":true,
				"created_at":"2026-01-01T00:00:00Z",
				"updated_at":"2026-01-01T00:00:00Z"
			}]
		}`))
	}))
	defer srv.Close()

	c := NewClient(srv.URL)
	c.SetToken("tok")
	resp, err := c.GetRuntimeProfiles(context.Background(), "ws-1", "daemon-1")
	if err != nil {
		t.Fatalf("GetRuntimeProfiles: %v", err)
	}
	if gotDaemon != "daemon-1" {
		t.Fatalf("daemon_id = %q", gotDaemon)
	}
	if gotMethod != http.MethodGet {
		t.Errorf("method = %q, want GET", gotMethod)
	}
	if gotPath != "/api/daemon/workspaces/ws-1/runtime-profiles" {
		t.Errorf("path = %q, want /api/daemon/workspaces/ws-1/runtime-profiles", gotPath)
	}
	if resp.WorkspaceID != "ws-1" || len(resp.RuntimeProfiles) != 1 {
		t.Fatalf("unexpected response: %+v", resp)
	}
	p := resp.RuntimeProfiles[0]
	if p.ID != "prof-1" || p.ProtocolFamily != "codex" || p.CommandName != "company-codex" {
		t.Errorf("profile fields wrong: %+v", p)
	}
	if !p.Enabled {
		t.Errorf("profile should be enabled")
	}
	if len(p.FixedArgs) != 1 || p.FixedArgs[0] != "--foo" {
		t.Errorf("fixed_args = %v, want [--foo]", p.FixedArgs)
	}
}

// profileRegisterFixture wires a Daemon against a fake server that serves a
// configurable set of runtime profiles and captures the runtimes array sent
// to /api/daemon/register.
type profileRegisterFixture struct {
	daemon       *Daemon
	server       *httptest.Server
	sentRuntimes []map[string]any
	sentFailures []map[string]any
}

func newProfileRegisterFixture(t *testing.T, profiles []RuntimeProfile, profilesStatus int) *profileRegisterFixture {
	t.Helper()
	fx := &profileRegisterFixture{}
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch {
		case r.URL.Path == "/api/daemon/register":
			var body struct {
				Runtimes       []map[string]any `json:"runtimes"`
				FailedProfiles []map[string]any `json:"failed_profiles"`
			}
			_ = json.NewDecoder(r.Body).Decode(&body)
			fx.sentRuntimes = body.Runtimes
			fx.sentFailures = body.FailedProfiles
			// Echo back a Runtime row per requested runtime, threading
			// profile_id so the caller can populate runtimeIndex from it.
			var resp RegisterResponse
			for i, rt := range body.Runtimes {
				id := "rt-" + strconv.Itoa(i)
				profileID, _ := rt["profile_id"].(string)
				typ, _ := rt["type"].(string)
				resp.Runtimes = append(resp.Runtimes, Runtime{
					ID:        id,
					Name:      "n",
					Provider:  typ,
					Status:    "online",
					ProfileID: profileID,
				})
			}
			w.Header().Set("Content-Type", "application/json")
			_ = json.NewEncoder(w).Encode(resp)
		case len(r.URL.Path) > len("/runtime-profiles") && strings.HasSuffix(r.URL.Path, "/runtime-profiles"):
			if profilesStatus != 0 && profilesStatus != http.StatusOK {
				w.WriteHeader(profilesStatus)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			_ = json.NewEncoder(w).Encode(RuntimeProfilesResponse{
				WorkspaceID:     "ws-1",
				RuntimeProfiles: profiles,
			})
		default:
			w.WriteHeader(http.StatusOK)
		}
	}))
	t.Cleanup(srv.Close)
	d := freshDaemon(srv.URL)
	d.profileLaunchSpecs = make(map[string]profileLaunchSpec)
	fx.daemon = d
	fx.server = srv
	return fx
}

// TestRegisterRuntimes_AppendsProfileRuntime verifies that a custom profile
// whose command resolves on PATH is appended as a runtime entry carrying
// profile_id, and that its resolved command path is recorded for runTask.
// Uses a custom-only host (no built-in agents) to also prove that path still
// registers.
func TestRegisterRuntimes_IncludesBuiltInQwen(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	fx := newProfileRegisterFixture(t, nil, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{
		"qwen": {Path: "/usr/bin/true", Command: "qwen", Model: "qwen3.8-max-preview"},
	}

	resp, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
	if err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}
	if len(fx.sentRuntimes) != 1 {
		t.Fatalf("sent runtimes = %d, want 1: %+v", len(fx.sentRuntimes), fx.sentRuntimes)
	}
	sent := fx.sentRuntimes[0]
	if sent["type"] != "qwen" || sent["name"] != "Qwen Code" || sent["version"] != "9.9.9" || sent["status"] != "online" {
		t.Fatalf("registered Qwen runtime = %+v", sent)
	}
	if len(resp.Runtimes) != 1 || resp.Runtimes[0].Provider != "qwen" {
		t.Fatalf("register response = %+v", resp)
	}
}

func TestRegisterRuntimes_IncludesBuiltInQoderCN(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	fx := newProfileRegisterFixture(t, nil, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{
		"qoderclicn": {Path: "/usr/bin/true", Command: "qoderclicn"},
	}

	resp, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
	if err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}
	if len(fx.sentRuntimes) != 1 {
		t.Fatalf("sent runtimes = %d, want 1: %+v", len(fx.sentRuntimes), fx.sentRuntimes)
	}
	sent := fx.sentRuntimes[0]
	if sent["type"] != "qoderclicn" || sent["name"] != "Qoder CN" || sent["version"] != "9.9.9" || sent["status"] != "online" {
		t.Fatalf("registered Qoder CN runtime = %+v", sent)
	}
	if len(resp.Runtimes) != 1 || resp.Runtimes[0].Provider != "qoderclicn" {
		t.Fatalf("register response = %+v", resp)
	}
}

func TestRegisterRuntimes_AppendsProfileRuntime(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{"company-codex": "/opt/bin/company-codex"})

	profiles := []RuntimeProfile{{
		ID:             "prof-1",
		WorkspaceID:    "ws-1",
		DisplayName:    "Company Codex",
		ProtocolFamily: "codex",
		CommandName:    "company-codex",
		FixedArgs:      []string{"--model", "composer-2.5"},
		Visibility:     "workspace",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	d := fx.daemon
	// Custom-only host: no built-in agents configured.
	d.cfg.Agents = map[string]AgentEntry{}

	resp, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
	if err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}

	// The register request must carry exactly one runtime: the profile.
	if len(fx.sentRuntimes) != 1 {
		t.Fatalf("sent runtimes = %d, want 1: %+v", len(fx.sentRuntimes), fx.sentRuntimes)
	}
	sent := fx.sentRuntimes[0]
	if sent["type"] != "codex" {
		t.Errorf("sent type = %v, want codex", sent["type"])
	}
	if sent["profile_id"] != "prof-1" {
		t.Errorf("sent profile_id = %v, want prof-1", sent["profile_id"])
	}
	if sent["status"] != "online" {
		t.Errorf("sent status = %v, want online", sent["status"])
	}

	// The resolved command path must be recorded keyed by profile_id.
	got := d.profileLaunchSpecs["prof-1"]
	if got.path != "/opt/bin/company-codex" {
		t.Errorf("profileLaunchSpecs[prof-1].path = %q, want /opt/bin/company-codex", got.path)
	}
	if got.version != "9.9.9" {
		t.Errorf("profileLaunchSpecs[prof-1].version = %q, want 9.9.9", got.version)
	}
	if strings.Join(got.fixedArgs, " ") != "--model composer-2.5" {
		t.Errorf("profileLaunchSpecs[prof-1].fixedArgs = %v, want [--model composer-2.5]", got.fixedArgs)
	}

	// The response runtime carries the profile_id back.
	if len(resp.Runtimes) != 1 || resp.Runtimes[0].ProfileID != "prof-1" {
		t.Fatalf("response runtimes wrong: %+v", resp.Runtimes)
	}
}

// TestRegisterRuntimes_ProfileReusesDiscoveredProviderCommand verifies that a
// bare profile command can use the matching provider path already found by the
// daemon's richer discovery logic. GUI-launched daemons may not have a CLI on
// PATH even when discovery found it through a login shell or a provider's
// stable user install directory.
func TestRegisterRuntimes_ProfileReusesDiscoveredProviderCommand(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{})

	profiles := []RuntimeProfile{{
		ID:             "prof-codearts",
		WorkspaceID:    "ws-1",
		DisplayName:    "CodeArts Profile",
		ProtocolFamily: "codearts",
		CommandName:    "codearts",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{
		"codearts": {
			Path:    `C:\Users\tester\.codeartsdoer\installers\codearts.cmd`,
			Command: "codearts",
		},
	}

	if _, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1"); err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}

	got := d.profileLaunchSpecs["prof-codearts"]
	if got.path != `C:\Users\tester\.codeartsdoer\installers\codearts.cmd` {
		t.Errorf("profileLaunchSpecs[prof-codearts].path = %q, want discovered CodeArts path", got.path)
	}
	if len(fx.sentRuntimes) != 2 {
		t.Fatalf("sent runtimes = %d, want built-in plus profile: %+v", len(fx.sentRuntimes), fx.sentRuntimes)
	}
	if fx.sentRuntimes[1]["profile_id"] != "prof-codearts" || fx.sentRuntimes[1]["type"] != "codearts" {
		t.Fatalf("profile runtime = %+v, want CodeArts prof-codearts", fx.sentRuntimes[1])
	}
}

// TestRegisterRuntimes_ReportsProfileNotOnPath verifies a profile whose command
// is missing on this host is reported to the server as a failed profile so the
// UI can show an actionable registration error.
func TestRegisterRuntimes_SkipsProfileNotOnPath(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{}) // nothing resolves

	profiles := []RuntimeProfile{{
		ID:             "prof-1",
		WorkspaceID:    "ws-1",
		DisplayName:    "Company Codex",
		ProtocolFamily: "codex",
		CommandName:    "company-codex",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{}

	_, sig, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
	if err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}
	if sig == "" {
		t.Errorf("profileSig must still be returned even when registration short-circuits, so the drift path can cache the converged-empty signature")
	}
	if _, ok := d.profileLaunchSpecs["prof-1"]; ok {
		t.Errorf("profileLaunchSpecs should not record an unresolved profile")
	}
	if len(fx.sentRuntimes) != 0 {
		t.Fatalf("sent runtimes = %+v, want none", fx.sentRuntimes)
	}
	if len(fx.sentFailures) != 1 || fx.sentFailures[0]["profile_id"] != "prof-1" {
		t.Fatalf("sent failures = %+v, want prof-1", fx.sentFailures)
	}
}

// TestRegisterRuntimes_SkipsUnsupportedProfileFamily verifies historical
// profiles whose protocol_family is no longer supported are not registered as
// online runtimes even when their command still resolves locally.
func TestRegisterRuntimes_SkipsUnsupportedProfileFamily(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{"gemini": "/usr/bin/gemini"})

	profiles := []RuntimeProfile{{
		ID:             "prof-gemini",
		WorkspaceID:    "ws-1",
		DisplayName:    "Old Gemini",
		ProtocolFamily: "gemini",
		CommandName:    "gemini",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{}

	_, sig, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
	if err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}
	if sig == "" {
		t.Errorf("profileSig must still be returned for unsupported historical profiles")
	}
	if _, ok := d.profileLaunchSpecs["prof-gemini"]; ok {
		t.Errorf("profileLaunchSpecs should not record an unsupported profile")
	}
	if len(fx.sentRuntimes) != 0 {
		t.Fatalf("sent runtimes = %+v, want none", fx.sentRuntimes)
	}
	if len(fx.sentFailures) != 1 {
		t.Fatalf("sent failures = %+v, want one unsupported profile failure", fx.sentFailures)
	}
	failure := fx.sentFailures[0]
	if failure["profile_id"] != "prof-gemini" {
		t.Errorf("failure profile_id = %v, want prof-gemini", failure["profile_id"])
	}
	if failure["command_name"] != "gemini" {
		t.Errorf("failure command_name = %v, want gemini", failure["command_name"])
	}
	reason, _ := failure["reason"].(string)
	if !strings.Contains(reason, "unsupported runtime_type: gemini") {
		t.Errorf("failure reason = %q, want unsupported runtime_type: gemini", reason)
	}
}

// TestRegisterRuntimes_ProfilesFetchErrorIsBestEffort verifies a 404 from the
// profiles endpoint does not fail registration when a built-in agent exists.
func TestRegisterRuntimes_ProfilesFetchErrorIsBestEffort(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{})

	fx := newProfileRegisterFixture(t, nil, http.StatusNotFound)
	d := fx.daemon
	// Built-in agent present so registration has something to register.
	d.cfg.Agents = map[string]AgentEntry{"claude": {Path: "/usr/bin/true"}}

	resp, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
	if err != nil {
		t.Fatalf("registration should succeed despite profiles 404: %v", err)
	}
	if len(fx.sentRuntimes) != 1 || fx.sentRuntimes[0]["type"] != "claude" {
		t.Fatalf("expected only the built-in claude runtime, got %+v", fx.sentRuntimes)
	}
	if len(resp.Runtimes) != 1 {
		t.Fatalf("response runtimes = %d, want 1", len(resp.Runtimes))
	}
}

// TestRegisterRuntimes_PrefersCommandPathOverride verifies that a per-machine
// command path override (MUL-3284) is used in preference to the PATH lookup:
// the resolved/recorded path is the override, even when lookPath would resolve
// command_name to a different binary.
func TestRegisterRuntimes_PrefersCommandPathOverride(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	// PATH would resolve to a *different* binary; the override must win.
	stubLookPath(t, map[string]string{"company-codex": "/usr/bin/company-codex"})
	stubResolveProfileOverridePath(t, map[string]string{"/opt/custom/company-codex": "/opt/custom/company-codex"})

	profiles := []RuntimeProfile{{
		ID:             "prof-1",
		WorkspaceID:    "ws-1",
		DisplayName:    "Company Codex",
		ProtocolFamily: "codex",
		CommandName:    "company-codex",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{}
	d.cfg.ProfileCommandOverrides = map[string]string{"prof-1": "/opt/custom/company-codex"}

	if _, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1"); err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}

	if got := d.profileLaunchSpecs["prof-1"].path; got != "/opt/custom/company-codex" {
		t.Errorf("profileLaunchSpecs[prof-1].path = %q, want the override /opt/custom/company-codex", got)
	}
	if len(fx.sentRuntimes) != 1 || fx.sentRuntimes[0]["profile_id"] != "prof-1" {
		t.Fatalf("expected the profile runtime to register, got %+v", fx.sentRuntimes)
	}
}

// TestRegisterRuntimes_OverrideNotExecutableFallsBackToPath verifies that an
// override pointing at a non-executable / missing path is ignored and the
// daemon falls back to resolving command_name on PATH.
func TestRegisterRuntimes_OverrideNotExecutableFallsBackToPath(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{"company-codex": "/usr/bin/company-codex"})
	// Override path does not resolve -> must fall back to PATH.
	stubResolveProfileOverridePath(t, map[string]string{})

	profiles := []RuntimeProfile{{
		ID:             "prof-1",
		WorkspaceID:    "ws-1",
		DisplayName:    "Company Codex",
		ProtocolFamily: "codex",
		CommandName:    "company-codex",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	d := fx.daemon
	d.cfg.Agents = map[string]AgentEntry{}
	d.cfg.ProfileCommandOverrides = map[string]string{"prof-1": "/opt/stale/company-codex"}

	if _, _, _, err := d.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1"); err != nil {
		t.Fatalf("registerRuntimesForWorkspace: %v", err)
	}

	if got := d.profileLaunchSpecs["prof-1"].path; got != "/usr/bin/company-codex" {
		t.Errorf("profileLaunchSpecs[prof-1].path = %q, want the PATH fallback /usr/bin/company-codex", got)
	}
}

// stubResolveProfileOverridePath swaps the package-level
// resolveProfileOverridePath indirection so override-preference tests can
// decide which paths resolve without staging real files. An absent path
// reports exec.ErrNotFound.
func stubResolveProfileOverridePath(t *testing.T, resolved map[string]string) {
	t.Helper()
	orig := resolveProfileOverridePath
	resolveProfileOverridePath = func(path string) (string, error) {
		if p, ok := resolved[path]; ok {
			return p, nil
		}
		return "", exec.ErrNotFound
	}
	t.Cleanup(func() { resolveProfileOverridePath = orig })
}

// bookkeeping that runTask relies on to override the launch path.
func TestCustomCommandPathForRuntime(t *testing.T) {
	d := freshDaemon("")
	d.profileLaunchSpecs = map[string]profileLaunchSpec{
		"prof-1": {path: "/opt/bin/company-codex", version: "9.8.7", fixedArgs: []string{"--model", "composer-2.5"}},
	}
	// rt-custom is a custom-profile runtime; rt-builtin is a normal one.
	d.runtimeIndex["rt-custom"] = Runtime{ID: "rt-custom", Provider: "codex", ProfileID: "prof-1"}
	d.runtimeIndex["rt-builtin"] = Runtime{ID: "rt-builtin", Provider: "claude"}

	if spec, ok := d.customProfileLaunchForRuntime("rt-custom"); !ok || spec.path != "/opt/bin/company-codex" || spec.version != "9.8.7" || strings.Join(spec.fixedArgs, " ") != "--model composer-2.5" {
		t.Errorf("custom runtime: got (%+v, %v), want profile launch spec", spec, ok)
	}
	if spec, ok := d.customProfileLaunchForRuntime("rt-builtin"); ok || spec.path != "" {
		t.Errorf("built-in runtime: got (%+v, %v), want empty false", spec, ok)
	}
	if spec, ok := d.customProfileLaunchForRuntime("rt-unknown"); ok || spec.path != "" {
		t.Errorf("unknown runtime: got (%+v, %v), want empty false", spec, ok)
	}
	// A custom runtime whose profile path was never resolved on this host
	// (profile_id not in profileLaunchSpecs) must report not-custom so
	// runTask falls back to its normal provider lookup rather than launching
	// an empty path.
	d.runtimeIndex["rt-unresolved"] = Runtime{ID: "rt-unresolved", Provider: "codex", ProfileID: "prof-missing"}
	if spec, ok := d.customProfileLaunchForRuntime("rt-unresolved"); ok || spec.path != "" {
		t.Errorf("unresolved profile: got (%+v, %v), want empty false", spec, ok)
	}
}

func TestRegisterRuntimes_ProfileCompatibilityTarget(t *testing.T) {
	t.Cleanup(stubAgentVersion(t))
	stubLookPath(t, map[string]string{"wrapper": "/opt/bin/wrapper"})
	for _, target := range []string{"", "pi", "omp"} {
		t.Run("target="+target, func(t *testing.T) {
			fx := newProfileRegisterFixture(t, []RuntimeProfile{{ID: "prof-1", ProtocolFamily: "pi", RuntimeType: target, CommandName: "wrapper", FixedArgs: []string{"launch"}, Enabled: true}}, http.StatusOK)
			fx.daemon.cfg.Agents = map[string]AgentEntry{}
			resp, _, _, err := fx.daemon.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1")
			want := target
			if want == "" {
				want = "pi"
			}
			if err != nil || len(resp.Runtimes) != 1 || resp.Runtimes[0].Provider != want || resp.Runtimes[0].ProfileID != "prof-1" {
				t.Fatalf("lost compatibility target or provenance: %+v, %v", resp, err)
			}
			spec := fx.daemon.profileLaunchSpecs["prof-1"]
			if spec.path != "/opt/bin/wrapper" || strings.Join(spec.fixedArgs, " ") != "launch" {
				t.Fatalf("lost custom command: %+v", spec)
			}
		})
	}
}

func TestRegisterRuntimes_CustomCodexFallsBackWhenPathBinaryBroken(t *testing.T) {
	bundleDir := t.TempDir()
	healthyCodex := filepath.Join(bundleDir, "codex")
	if err := os.WriteFile(healthyCodex, []byte("#!/bin/sh\necho 'codex-cli 0.171.0'\n"), 0o755); err != nil {
		t.Fatalf("write healthy codex: %v", err)
	}

	stubLookPath(t, map[string]string{"codex": "/opt/homebrew/bin/codex"})
	origBundles := codexDesktopAppBundlePaths
	codexDesktopAppBundlePaths = func() []string { return []string{healthyCodex} }
	t.Cleanup(func() { codexDesktopAppBundlePaths = origBundles })

	origDetect := detectAgentVersion
	detectAgentVersion = func(_ context.Context, cmd agent.Command) (string, error) {
		if cmd.Path == "/opt/homebrew/bin/codex" {
			return "", errors.New("exit status 1: missing optional dependency @openai/codex-darwin-arm64")
		}
		if cmd.Path == healthyCodex {
			return "0.171.0", nil
		}
		return "", errors.New("unexpected path: " + cmd.Path)
	}
	t.Cleanup(func() { detectAgentVersion = origDetect })

	profiles := []RuntimeProfile{{
		ID:             "prof-codex",
		WorkspaceID:    "ws-1",
		DisplayName:    "Codex",
		ProtocolFamily: "codex",
		RuntimeType:    "codex",
		CommandName:    "codex",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	fx.daemon.cfg.Agents = map[string]AgentEntry{}

	if _, _, _, err := fx.daemon.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1"); err != nil {
		t.Fatalf("registerRuntimesForWorkspaceLocked: %v", err)
	}
	if len(fx.sentRuntimes) != 1 {
		t.Fatalf("sent runtimes = %+v, want 1", fx.sentRuntimes)
	}
	if fx.sentRuntimes[0]["version"] != "0.171.0" {
		t.Fatalf("sent version = %v, want 0.171.0", fx.sentRuntimes[0]["version"])
	}
	spec := fx.daemon.profileLaunchSpecs["prof-codex"]
	if spec.path != healthyCodex {
		t.Fatalf("profileLaunchSpecs[prof-codex].path = %q, want %q", spec.path, healthyCodex)
	}
	if spec.commandName != "codex" {
		t.Fatalf("profileLaunchSpecs[prof-codex].commandName = %q, want codex", spec.commandName)
	}
}

func TestRegisterRuntimes_CustomCodexSkipsBrokenWhenNoHealthyFallback(t *testing.T) {
	stubLookPath(t, map[string]string{"codex": "/opt/homebrew/bin/codex"})
	origBundles := codexDesktopAppBundlePaths
	codexDesktopAppBundlePaths = func() []string { return nil }
	t.Cleanup(func() { codexDesktopAppBundlePaths = origBundles })

	origDetect := detectAgentVersion
	detectAgentVersion = func(_ context.Context, cmd agent.Command) (string, error) {
		return "", errors.New("exit status 1: spawn codex ENOENT")
	}
	t.Cleanup(func() { detectAgentVersion = origDetect })

	profiles := []RuntimeProfile{{
		ID:             "prof-codex-broken",
		WorkspaceID:    "ws-1",
		DisplayName:    "Codex",
		ProtocolFamily: "codex",
		RuntimeType:    "codex",
		CommandName:    "codex",
		Enabled:        true,
	}}
	fx := newProfileRegisterFixture(t, profiles, http.StatusOK)
	fx.daemon.cfg.Agents = map[string]AgentEntry{}

	if _, _, _, err := fx.daemon.registerRuntimesForWorkspaceLocked(context.Background(), "ws-1"); err != nil {
		t.Fatalf("registerRuntimesForWorkspaceLocked: %v", err)
	}
	if len(fx.sentRuntimes) != 0 {
		t.Fatalf("broken codex must not register as online, got %+v", fx.sentRuntimes)
	}
	if len(fx.sentFailures) != 1 || fx.sentFailures[0]["profile_id"] != "prof-codex-broken" {
		t.Fatalf("expected failed_profiles entry for broken codex, got %+v", fx.sentFailures)
	}
}

func TestResolveCustomProfileLaunchForRuntime_HealsVanishedPath(t *testing.T) {
	bundleDir := t.TempDir()
	healthyCodex := filepath.Join(bundleDir, "codex")
	if err := os.WriteFile(healthyCodex, []byte("#!/bin/sh\necho 'codex-cli 0.171.0'\n"), 0o755); err != nil {
		t.Fatalf("write healthy codex: %v", err)
	}

	stubLookPath(t, map[string]string{})
	origBundles := codexDesktopAppBundlePaths
	codexDesktopAppBundlePaths = func() []string { return []string{healthyCodex} }
	t.Cleanup(func() { codexDesktopAppBundlePaths = origBundles })

	origDetect := detectAgentVersion
	detectAgentVersion = func(_ context.Context, cmd agent.Command) (string, error) {
		if cmd.Path == healthyCodex {
			return "0.171.0", nil
		}
		return "", errors.New("unexpected path")
	}
	t.Cleanup(func() { detectAgentVersion = origDetect })

	d := freshDaemon("")
	d.runtimeIndex["rt-custom"] = Runtime{ID: "rt-custom", Provider: "codex", ProfileID: "prof-codex"}
	d.profileLaunchSpecs = map[string]profileLaunchSpec{
		"prof-codex": {
			path:        filepath.Join(t.TempDir(), "deleted-codex"),
			version:     "",
			commandName: "codex",
			runtimeType: "codex",
		},
	}

	spec, ok := d.resolveCustomProfileLaunchForRuntime(context.Background(), "rt-custom")
	if !ok {
		t.Fatal("expected custom profile launch spec")
	}
	if spec.path != healthyCodex || spec.version != "0.171.0" {
		t.Fatalf("healed spec = %+v, want path=%q version=0.171.0", spec, healthyCodex)
	}
	if got := d.profileLaunchSpecs["prof-codex"].path; got != healthyCodex {
		t.Fatalf("cached spec path = %q, want %q", got, healthyCodex)
	}
}

func TestProbeBuiltinRuntime_CodexFallsBackToDesktopBundleWhenPathBroken(t *testing.T) {
	bundleDir := t.TempDir()
	brokenCodex := filepath.Join(bundleDir, "broken-codex")
	healthyCodex := filepath.Join(bundleDir, "healthy-codex")
	for _, p := range []string{brokenCodex, healthyCodex} {
		if err := os.WriteFile(p, []byte("#!/bin/sh\nexit 0\n"), 0o755); err != nil {
			t.Fatalf("write %s: %v", p, err)
		}
	}

	origBundles := codexDesktopAppBundlePaths
	codexDesktopAppBundlePaths = func() []string { return []string{healthyCodex} }
	t.Cleanup(func() { codexDesktopAppBundlePaths = origBundles })

	origDetect := detectAgentVersion
	origMin := checkAgentMinVersion
	detectAgentVersion = func(_ context.Context, cmd agent.Command) (string, error) {
		if cmd.Path == brokenCodex {
			return "", errors.New("exit status 1")
		}
		if cmd.Path == healthyCodex {
			return "0.171.0", nil
		}
		return "", errors.New("unexpected path")
	}
	checkAgentMinVersion = func(string, string) error { return nil }
	t.Cleanup(func() {
		detectAgentVersion = origDetect
		checkAgentMinVersion = origMin
	})

	d := freshDaemon("")
	res := d.probeBuiltinRuntime(context.Background(), "codex", AgentEntry{Path: brokenCodex, Command: "codex"})
	if res.verdict != builtinProbeOK || res.version != "0.171.0" {
		t.Fatalf("probeBuiltinRuntime = %+v, want OK 0.171.0", res)
	}
	resolved, ver := d.resolveAgentEntry(context.Background(), "codex", AgentEntry{Path: brokenCodex, Command: "codex"})
	if resolved.Path != healthyCodex || ver != "0.171.0" {
		t.Fatalf("resolved entry = (%q, %q), want (%q, 0.171.0)", resolved.Path, ver, healthyCodex)
	}
}
