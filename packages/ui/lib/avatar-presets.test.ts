import { describe, expect, it } from "vitest";
import {
  AGENT_AVATAR_PRESETS,
  MYTHOLOGY_AVATAR_PRESETS,
  THINKING_BRAND_AVATAR,
  findMythologyPresetBySlug,
  getPresetAvatarDataUri,
  parsePresetAvatar,
} from "./avatar-presets";

describe("avatar-presets", () => {
  it("ships 100 unique AI Agent presets and 60 unique Mythology presets", () => {
    expect(AGENT_AVATAR_PRESETS).toHaveLength(100);
    expect(new Set(AGENT_AVATAR_PRESETS.map((p) => p.value)).size).toBe(100);
    expect(MYTHOLOGY_AVATAR_PRESETS).toHaveLength(60);
    expect(new Set(MYTHOLOGY_AVATAR_PRESETS.map((p) => p.value)).size).toBe(60);
  });

  it("parses brand:thinking and preset markers and generates valid SVG data URIs", () => {
    expect(parsePresetAvatar(THINKING_BRAND_AVATAR)).toEqual({
      kind: "brand",
      value: "brand:thinking",
      label: "Thinking",
    });

    const firstAgent = AGENT_AVATAR_PRESETS[0]!;
    expect(parsePresetAvatar(firstAgent.value)?.kind).toBe("agent");
    expect(getPresetAvatarDataUri(firstAgent.value)).toMatch(
      /^data:image\/svg\+xml;charset=utf-8,/,
    );

    const baize = findMythologyPresetBySlug("baize");
    expect(baize.value).toBe("preset:myth:M01");
    expect(baize.label).toBe("白泽");
    expect(getPresetAvatarDataUri(baize.value)).toMatch(
      /^data:image\/svg\+xml;charset=utf-8,/,
    );

    const xuanwu = findMythologyPresetBySlug("xuanwu");
    expect(xuanwu.value).toBe("preset:myth:M02");
    expect(xuanwu.label).toBe("玄武");
  });
});
