import { useId } from "react";
import { cn } from "../../lib/utils";
import type { ThinkingIconVariant } from "../../lib/workstack-brand";

export type MulticaIconMode =
  /** The mark at rest. */
  | "static"
  /** The centre opens and the arms light up in turn: an agent at work, loading, waiting. */
  | "think"
  /**
   * Tile pops in, arms grow out of the centre as the star turns into place.
   * Sign-in only: loading screens use `think`, so the intro never plays twice
   * or gets cut off when loading finishes early.
   */
  | "intro";

interface MulticaIconProps extends Omit<React.ComponentProps<"svg">, "mode"> {
  mode?: MulticaIconMode;
  /** `circle` is the avatar form. */
  shape?: "square" | "circle";
  /** Force a specific theme variant or follow the active light/dark theme automatically. */
  variant?: "auto" | ThinkingIconVariant;
  /**
   * Rendered size in px. Sets width/height and picks the optical size (24px and
   * below draws a bigger, heavier star). Omit to size with `className` (1em
   * default); the small optical size is used then.
   */
  size?: number;
  /** Accessible name. Without one the mark is decorative. */
  title?: string;
}

function ThinkingMarkGlyph({
  variant,
  rx,
  idPrefix,
}: {
  variant: ThinkingIconVariant;
  rx: number;
  idPrefix: string;
}) {
  const isLight = variant === "light";
  const p = `${idPrefix}-${variant}`;

  if (isLight) {
    return (
      <>
        <defs>
          <linearGradient id={`${p}-bg`} x1="14%" y1="6%" x2="86%" y2="96%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="52%" stopColor="#F4F6FB" />
            <stop offset="100%" stopColor="#E5E9F5" />
          </linearGradient>
          <radialGradient id={`${p}-aura`} cx="50%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#D5DCEE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#BCC6DF" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`${p}-arc-a`} x1="18%" y1="18%" x2="82%" y2="48%">
            <stop offset="0%" stopColor="#1E2547" />
            <stop offset="55%" stopColor="#3730A3" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${p}-arc-b`} x1="82%" y1="82%" x2="18%" y2="52%">
            <stop offset="0%" stopColor="#1E2547" />
            <stop offset="55%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${p}-star`} x1="25%" y1="18%" x2="78%" y2="85%">
            <stop offset="0%" stopColor="#1D2652" />
            <stop offset="45%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect x="0.75" y="0.75" width="98.5" height="98.5" rx={rx} fill={`url(#${p}-bg)`} stroke={`url(#${p}-rim)`} strokeWidth={1.5} />
        <rect x="2" y="2" width="96" height="96" rx={Math.max(rx - 1.5, 0)} fill={`url(#${p}-aura)`} />
        <circle cx="50" cy="50" r="35.5" fill="none" stroke="#CBD5E1" strokeOpacity="0.55" strokeWidth="0.9" />
        <path d="M23.5 38.5 A 29 29 0 0 1 68.5 27.5" fill="none" stroke={`url(#${p}-arc-a)`} strokeWidth={3.6} strokeLinecap="round" />
        <path d="M76.5 61.5 A 29 29 0 0 1 31.5 72.5" fill="none" stroke={`url(#${p}-arc-b)`} strokeWidth={3.6} strokeLinecap="round" />
        <circle cx="71.2" cy="29.4" r="3.4" fill="#4338CA" />
        <circle cx="71.2" cy="29.4" r="1.4" fill="#E0E7FF" />
        <circle cx="28.8" cy="70.6" r="3.4" fill="#2563EB" />
        <circle cx="28.8" cy="70.6" r="1.4" fill="#E0F2FE" />
        <path
          d="M50 25.5 C51.6 39.2 60.8 48.4 74.5 50 C60.8 51.6 51.6 60.8 50 74.5 C48.4 60.8 39.2 51.6 25.5 50 C39.2 48.4 48.4 39.2 50 25.5 Z"
          fill={`url(#${p}-star)`}
        />
        <circle cx="50" cy="50" r="4.2" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="2" fill="#4338CA" />
      </>
    );
  }

  return (
    <>
      <defs>
        <linearGradient id={`${p}-bg`} x1="16%" y1="4%" x2="84%" y2="96%">
          <stop offset="0%" stopColor="#1B1E2E" />
          <stop offset="50%" stopColor="#0F111B" />
          <stop offset="100%" stopColor="#07080E" />
        </linearGradient>
        <radialGradient id={`${p}-aura`} cx="50%" cy="46%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.34" />
          <stop offset="48%" stopColor="#4F46E5" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#07080E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="38%" stopColor="#818CF8" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`${p}-arc-a`} x1="18%" y1="18%" x2="82%" y2="48%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="55%" stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${p}-arc-b`} x1="82%" y1="82%" x2="18%" y2="52%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="55%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${p}-star`} x1="22%" y1="18%" x2="80%" y2="84%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="48%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="98.5" height="98.5" rx={rx} fill={`url(#${p}-bg)`} stroke={`url(#${p}-rim)`} strokeWidth={1.5} />
      <rect x="2" y="2" width="96" height="96" rx={Math.max(rx - 1.5, 0)} fill={`url(#${p}-aura)`} />
      <circle cx="50" cy="50" r="35.5" fill="none" stroke="#94A3B8" strokeOpacity="0.16" strokeWidth="0.9" />
      <path d="M23.5 38.5 A 29 29 0 0 1 68.5 27.5" fill="none" stroke={`url(#${p}-arc-a)`} strokeWidth={3.6} strokeLinecap="round" />
      <path d="M76.5 61.5 A 29 29 0 0 1 31.5 72.5" fill="none" stroke={`url(#${p}-arc-b)`} strokeWidth={3.6} strokeLinecap="round" />
      <circle cx="71.2" cy="29.4" r="3.4" fill="#C7D2FE" />
      <circle cx="71.2" cy="29.4" r="1.5" fill="#FFFFFF" />
      <circle cx="28.8" cy="70.6" r="3.4" fill="#7DD3FC" />
      <circle cx="28.8" cy="70.6" r="1.5" fill="#FFFFFF" />
      <path
        d="M50 25.5 C51.6 39.2 60.8 48.4 74.5 50 C60.8 51.6 51.6 60.8 50 74.5 C48.4 60.8 39.2 51.6 25.5 50 C39.2 48.4 48.4 39.2 50 25.5 Z"
        fill={`url(#${p}-star)`}
      />
      <circle cx="50" cy="50" r="4.2" fill="#1E2340" stroke="#A5B4FC" strokeOpacity="0.45" strokeWidth="0.9" />
      <circle cx="50" cy="50" r="2.1" fill="#FFFFFF" />
    </>
  );
}

export function MulticaIcon({
  mode = "static",
  shape = "square",
  variant = "auto",
  size,
  title,
  className,
  style,
  ...props
}: MulticaIconProps) {
  const rawId = useId();
  const idPrefix = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const rx = shape === "circle" ? 50 : 22.5;

  return (
    <svg
      viewBox="0 0 100 100"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn(
        "inline-block shrink-0",
        size == null && "size-[1em]",
        mode === "intro" && "multica-pop",
        mode === "think" && "animate-pulse",
        className,
      )}
      style={{ ...(size != null && { width: size, height: size }), ...style }}
      {...props}
    >
      {variant === "auto" ? (
        <>
          <g className="dark:hidden">
            <ThinkingMarkGlyph variant="light" rx={rx} idPrefix={idPrefix} />
          </g>
          <g className="hidden dark:inline">
            <ThinkingMarkGlyph variant="dark" rx={rx} idPrefix={idPrefix} />
          </g>
        </>
      ) : (
        <ThinkingMarkGlyph variant={variant} rx={rx} idPrefix={idPrefix} />
      )}
    </svg>
  );
}
