import type { Project } from "@multica/core/types";
import { PresetAvatarGlyph } from "@multica/ui/components/common/preset-avatar-glyph";
import { parsePresetAvatar } from "@multica/ui/lib/avatar-presets";
import { cn } from "@multica/ui/lib/utils";

export type ProjectIconSize = "sm" | "md" | "lg";

export interface ProjectIconProps {
  project?: Pick<Project, "icon"> | null;
  size?: ProjectIconSize;
  className?: string;
}

const SIZE_CLASS: Record<ProjectIconSize, string> = {
  sm: "size-3.5 text-caption leading-none",
  md: "size-4 text-body leading-none",
  lg: "size-6 text-display-sm leading-none",
};

export function ProjectIcon({ project, size = "sm", className }: ProjectIconProps) {
  const preset = parsePresetAvatar(project?.icon);
  if (preset) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          SIZE_CLASS[size],
          className,
        )}
      >
        <PresetAvatarGlyph value={project?.icon} />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        SIZE_CLASS[size],
        className,
      )}
    >
      {project?.icon || "📁"}
    </span>
  );
}
