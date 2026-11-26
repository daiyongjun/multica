"use client";

import { cn } from "../../lib/utils";
import {
  getPresetAvatarDataUri,
  parsePresetAvatar,
} from "../../lib/avatar-presets";
import { MulticaIcon } from "./multica-icon";

export function PresetAvatarGlyph({
  value,
  alt,
  className,
}: {
  value?: string | null;
  alt?: string;
  className?: string;
}) {
  const parsed = parsePresetAvatar(value);
  if (!parsed) return null;

  if (parsed.kind === "brand") {
    return (
      <MulticaIcon
        shape="circle"
        title={alt ?? "Thinking"}
        className={cn("h-full w-full", className)}
      />
    );
  }

  const uri = getPresetAvatarDataUri(parsed.preset.value);
  if (!uri) return null;

  return (
    <img
      src={uri}
      alt={alt ?? parsed.preset.label}
      draggable={false}
      className={cn("h-full w-full select-none object-cover", className)}
    />
  );
}
