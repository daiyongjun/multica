import { forwardRef, type SVGProps } from "react";
import type { IconComponent, IconProps } from "@multica/ui/icons";
import { cn } from "@multica/ui/lib/utils";

type RailIconProps = Omit<IconProps, "ref"> & {
  active?: boolean;
};

function createThinkingRailIcon(
  displayName: string,
  slug: string,
  renderPaths: (active: boolean) => React.ReactNode,
): IconComponent {
  const Component = forwardRef<SVGSVGElement, Omit<RailIconProps, "ref">>(
    ({ size = 24, className, active = false, ...rest }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.65}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={rest["aria-label"] || rest.role ? undefined : true}
        className={cn(
          `icon icon-thinking-${slug} transition-transform duration-150 ease-out`,
          className,
        )}
        {...(rest as SVGProps<SVGSVGElement>)}
      >
        {renderPaths(active)}
      </svg>
    ),
  );
  Component.displayName = displayName;
  return Component as IconComponent;
}

/** Quick Compose / New Issue: architectural sheet + precision stylus nib. */
export const ThinkingComposeIcon = createThinkingRailIcon("ThinkingComposeIcon", "compose", () => (
  <>
    <path
      d="M12.5 4.25H7.25A3 3 0 0 0 4.25 7.25v9.5a3 3 0 0 0 3 3h9.5a3 3 0 0 0 3-3V11.5"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path
      d="M15.85 4.15a1.9 1.9 0 0 1 2.7 0l1.3 1.3a1.9 1.9 0 0 1 0 2.7l-7.25 7.25-3.85.9.9-3.85 6.2-8.3Z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path d="M14.7 6.1 17.9 9.3" />
  </>
));

/** Global Search: optical precision lens with subtle glass sheen & crisp handle. */
export const ThinkingSearchIcon = createThinkingRailIcon("ThinkingSearchIcon", "search", () => (
  <>
    <circle cx="10.75" cy="10.75" r="6.75" fill="currentColor" fillOpacity="0.08" />
    <path d="M7.6 8.3a4.3 4.3 0 0 1 4.6-1.45" strokeOpacity="0.45" strokeWidth={1.45} />
    <path d="m15.75 15.75 4.25 4.25" strokeWidth={1.9} />
  </>
));

/** Work / Tasks: stepped Chain-of-Thought capsule bars echoing Thinking #T16. */
export const ThinkingWorkIcon = createThinkingRailIcon("ThinkingWorkIcon", "work", () => (
  <>
    <rect x="4" y="4.75" width="10.5" height="3.75" rx="1.875" fill="currentColor" fillOpacity="0.24" stroke="none" />
    <rect x="6.75" y="10.125" width="10.5" height="3.75" rx="1.875" fill="currentColor" fillOpacity="0.56" stroke="none" />
    <rect x="9.5" y="15.5" width="10.5" height="3.75" rx="1.875" fill="currentColor" stroke="none" />
    <circle cx="18.1" cy="17.375" r="1.05" className="fill-white dark:fill-[#111319]" stroke="none" />
  </>
));

/** Team / AI Agents: sculpted monochrome AI mind visor with twin focus nodes. */
export const ThinkingTeamIcon = createThinkingRailIcon("ThinkingTeamIcon", "team", () => (
  <>
    <path
      d="M5.75 9.25A3.25 3.25 0 0 1 9 6h6a3.25 3.25 0 0 1 3.25 3.25v.25"
      strokeOpacity="0.38"
      strokeWidth={1.45}
    />
    <rect
      x="4.75"
      y="9.25"
      width="14.5"
      height="10.25"
      rx="4.25"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M12 6V4.3" strokeOpacity="0.55" />
    <circle cx="12" cy="3.75" r="1.1" fill="currentColor" stroke="none" opacity="0.85" />
    <circle cx="9.6" cy="14.35" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="14.35" r="1.3" fill="currentColor" stroke="none" />
  </>
));

/** Chat / Dialogue: sculpted thought-bubble with progressive 3-dot Thinking ellipsis. */
export const ThinkingChatIcon = createThinkingRailIcon("ThinkingChatIcon", "chat", () => (
  <>
    <path
      d="M6.75 4.75h10.5a3.25 3.25 0 0 1 3.25 3.25v6a3.25 3.25 0 0 1-3.25 3.25H10.6l-3.95 2.75a.65.65 0 0 1-1.02-.53V17.25h-.38A1.75 1.75 0 0 1 3.5 15.5V8a3.25 3.25 0 0 1 3.25-3.25Z"
      fill="currentColor"
      fillOpacity="0.09"
    />
    <circle cx="8.7" cy="11" r="1.05" fill="currentColor" stroke="none" opacity="0.38" />
    <circle cx="12" cy="11" r="1.2" fill="currentColor" stroke="none" opacity="0.68" />
    <circle cx="15.4" cy="11" r="1.35" fill="currentColor" stroke="none" />
  </>
));

/** Autopilots / Kinetic Automation: minimalist orbital loop with monochrome energy bolt. */
export const ThinkingAutopilotIcon = createThinkingRailIcon("ThinkingAutopilotIcon", "autopilot", () => (
  <>
    <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.07" stroke="none" />
    <path d="M19.35 12.4A7.4 7.4 0 1 1 16.5 6.1" />
    <path d="M16.75 3.75v2.9h-2.9" />
    <path
      d="m12.75 7.75-3.4 4.75h2.75l-.85 3.75 3.4-4.75h-2.75l.85-3.75Z"
      fill="currentColor"
      fillOpacity="0.2"
      strokeWidth={1.5}
    />
  </>
));

/** Docs / Knowledge: sculpted layered folio with clean spine highlight. */
export const ThinkingDocsIcon = createThinkingRailIcon("ThinkingDocsIcon", "docs", () => (
  <>
    <path
      d="M4.25 6.25A2.25 2.25 0 0 1 6.5 4H10a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h3.5a2.25 2.25 0 0 1 2.25 2.25v11.5a1.5 1.5 0 0 1-1.5 1.5H14a2.25 2.25 0 0 0-2 1.25 2.25 2.25 0 0 0-2-1.25H5.75a1.5 1.5 0 0 1-1.5-1.5V6.25Z"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M12 5v15.2" strokeOpacity="0.48" />
    <path d="M7.2 8.75h2.4M14.4 8.75h2.4M14.4 12h1.8" strokeOpacity="0.45" strokeWidth={1.45} />
  </>
));

/** Help / Guidance: refined optical ring with soft depth & crisp question glyph. */
export const ThinkingHelpIcon = createThinkingRailIcon("ThinkingHelpIcon", "help", () => (
  <>
    <circle cx="12" cy="12" r="8.25" fill="currentColor" fillOpacity="0.08" />
    <path d="M9.65 9.35a2.45 2.45 0 0 1 4.7.8c0 1.55-2.35 2.05-2.35 3.1" />
    <circle cx="12" cy="16.45" r="0.95" fill="currentColor" stroke="none" />
  </>
));

/** Settings / Precision Control: minimalist watch-rotor dial with crisp center point. */
export const ThinkingSettingsIcon = createThinkingRailIcon("ThinkingSettingsIcon", "settings", () => (
  <>
    <path
      d="M10.45 4.2a1.7 1.7 0 0 1 3.1 0l.32.72a1.5 1.5 0 0 0 1.98.78l.72-.3a1.7 1.7 0 0 1 2.2 2.2l-.3.72a1.5 1.5 0 0 0 .78 1.98l.72.32a1.7 1.7 0 0 1 0 3.1l-.72.32a1.5 1.5 0 0 0-.78 1.98l.3.72a1.7 1.7 0 0 1-2.2 2.2l-.72-.3a1.5 1.5 0 0 0-1.98.78l-.32.72a1.7 1.7 0 0 1-3.1 0l-.32-.72a1.5 1.5 0 0 0-1.98-.78l-.72.3a1.7 1.7 0 0 1-2.2-2.2l.3-.72a1.5 1.5 0 0 0-.78-1.98l-.72-.32a1.7 1.7 0 0 1 0-3.1l.72-.32a1.5 1.5 0 0 0 .78-1.98l-.3-.72a1.7 1.7 0 0 1 2.2-2.2l.72.3a1.5 1.5 0 0 0 1.98-.78l.32-.72Z"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <circle cx="12" cy="12" r="3.1" fill="currentColor" fillOpacity="0.14" />
    <circle cx="12" cy="12" r="1.05" fill="currentColor" stroke="none" />
  </>
));
