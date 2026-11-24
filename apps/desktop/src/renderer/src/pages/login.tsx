import { useState } from "react";
import { useAuthStore } from "@multica/core/auth";
import { LoginPage } from "@multica/views/auth";
import { DragStrip } from "@multica/views/platform";
import { Button } from "@multica/ui/components/ui/button";
import { MulticaIcon } from "@multica/ui/components/common/multica-icon";

function requireRuntimeConfig() {
  const runtimeConfig = window.desktopAPI.runtimeConfig;
  if (!runtimeConfig.ok) {
    throw new Error(
      "Invariant violated: DesktopLoginPage rendered before App accepted runtime config",
    );
  }
  return runtimeConfig.config;
}

export function DesktopLoginPage() {
  const { apiUrl, defaultLoginKey } = requireRuntimeConfig();
  const [pending, setPending] = useState(false);
  const [defaultLoginFailed, setDefaultLoginFailed] = useState(false);

  async function loginWithDefaultAccount() {
    setPending(true);
    setDefaultLoginFailed(false);
    try {
      const response = await fetch(`${apiUrl}/auth/think-default`, {
        method: "POST",
        headers: { Authorization: `Bearer ${defaultLoginKey}` },
        redirect: "error",
      });
      if (!response.ok) throw new Error("Default login failed");
      const { token } = await response.json();
      if (typeof token !== "string" || !token) throw new Error("Missing session token");
      await useAuthStore.getState().loginWithToken(token);
    } catch {
      setDefaultLoginFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <DragStrip />
      <LoginPage
        logo={<MulticaIcon mode="intro" size={48} />}
        onSuccess={() => {
          // Auth store update triggers AppContent re-render → shows DesktopShell.
          // Initial workspace navigation happens in routes.tsx via IndexRedirect.
        }}
        primaryAction={defaultLoginKey && (
          <>
            <Button type="button" size="lg" className="w-full" disabled={pending} onClick={() => void loginWithDefaultAccount()}>
              {pending ? "\u6b63\u5728\u767b\u5f55\u2026" : "\u9ed8\u8ba4\u8d26\u53f7\u767b\u5f55"}
            </Button>
            {defaultLoginFailed && <p role="alert" className="mt-2 text-sm text-destructive">{"\u9ed8\u8ba4\u8d26\u53f7\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u3002"}</p>}
          </>
        )}
      />
    </div>
  );
}
