import { WORKSTACK_BACKGROUND, WORKSTACK_ACCENT, WORKSTACK_FOREGROUND, WORKSTACK_BARS, WORKSTACK_TALL_BAR } from "../../lib/workstack-brand";
import { cn } from "../../lib/utils";

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
  /**
   * Rendered size in px. Sets width/height and picks the optical size (24px and
   * below draws a bigger, heavier star). Omit to size with `className` (1em
   * default); the small optical size is used then.
   */
  size?: number;
  /** Accessible name. Without one the mark is decorative. */
  title?: string;
}

export function MulticaIcon({ mode = "static", shape = "square", size, title, className, style, ...props }: MulticaIconProps) {
  return (
    <svg viewBox="0 0 100 100" role={title ? "img" : undefined} aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("inline-block shrink-0", size == null && "size-[1em]", mode === "intro" && "multica-pop", mode === "think" && "animate-pulse", className)}
      style={{ ...(size != null && { width: size, height: size }), ...style }} {...props}>
      <rect width="100" height="100" rx={shape === "circle" ? 50 : 22.5} fill={WORKSTACK_BACKGROUND} />
      <path d={WORKSTACK_BARS} fill={WORKSTACK_ACCENT} />
      <path d={WORKSTACK_TALL_BAR} fill={WORKSTACK_FOREGROUND} />
    </svg>
  );
}
