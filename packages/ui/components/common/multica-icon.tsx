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

function ChainOfThoughtGlyph({
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
          <linearGradient id={`${p}-bg`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#F6F7FA" />
            <stop offset="100%" stopColor="#EAECEF" />
          </linearGradient>
          <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#DCDFE8" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#C6CBD7" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id={`${p}-s1`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C2C7D2" />
            <stop offset="100%" stopColor="#AAB1C0" />
          </linearGradient>
          <linearGradient id={`${p}-s2`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#707787" />
            <stop offset="100%" stopColor="#535A6A" />
          </linearGradient>
          <linearGradient id={`${p}-s3`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#222531" />
            <stop offset="100%" stopColor="#0E1016" />
          </linearGradient>
        </defs>
        <rect x="0.75" y="0.75" width="98.5" height="98.5" rx={rx} fill={`url(#${p}-bg)`} stroke={`url(#${p}-rim)`} strokeWidth={1.4} />
        <rect x="22" y="25" width="38" height="14" rx="7" fill={`url(#${p}-s1)`} />
        <rect x="31" y="43" width="38" height="14" rx="7" fill={`url(#${p}-s2)`} />
        <rect x="40" y="61" width="38" height="14" rx="7" fill={`url(#${p}-s3)`} />
        <circle cx="71" cy="68" r="3.5" fill="#FFFFFF" />
      </>
    );
  }

  return (
    <>
      <defs>
        <linearGradient id={`${p}-bg`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#1E2028" />
          <stop offset="52%" stopColor="#13151B" />
          <stop offset="100%" stopColor="#0A0B0F" />
        </linearGradient>
        <linearGradient id={`${p}-rim`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`${p}-s1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5E6474" />
          <stop offset="100%" stopColor="#454A58" />
        </linearGradient>
        <linearGradient id={`${p}-s2`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B5BCCB" />
          <stop offset="100%" stopColor="#9299AA" />
        </linearGradient>
        <linearGradient id={`${p}-s3`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4E8F1" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="98.5" height="98.5" rx={rx} fill={`url(#${p}-bg)`} stroke={`url(#${p}-rim)`} strokeWidth={1.4} />
      <rect x="22" y="25" width="38" height="14" rx="7" fill={`url(#${p}-s1)`} />
      <rect x="31" y="43" width="38" height="14" rx="7" fill={`url(#${p}-s2)`} />
      <rect x="40" y="61" width="38" height="14" rx="7" fill={`url(#${p}-s3)`} />
      <circle cx="71" cy="68" r="3.5" fill="#111319" />
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
            <ChainOfThoughtGlyph variant="light" rx={rx} idPrefix={idPrefix} />
          </g>
          <g className="hidden dark:inline">
            <ChainOfThoughtGlyph variant="dark" rx={rx} idPrefix={idPrefix} />
          </g>
        </>
      ) : (
        <ChainOfThoughtGlyph variant={variant} rx={rx} idPrefix={idPrefix} />
      )}
    </svg>
  );
}
