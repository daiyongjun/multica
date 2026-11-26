"use client";

import { Suspense, lazy, useState } from "react";
import { Dices } from "@multica/ui/icons";
import { PresetAvatarGlyph } from "@multica/ui/components/common/preset-avatar-glyph";
import {
  MYTHOLOGY_AVATAR_PRESETS,
  MYTHOLOGY_AVATAR_SERIES,
  pickRandomMythologyPreset,
  type MythologyAvatarSeriesId,
} from "@multica/ui/lib/avatar-presets";
import { cn } from "@multica/ui/lib/utils";

const EmojiPicker = lazy(() =>
  import("@multica/ui/components/common/emoji-picker").then((m) => ({
    default: m.EmojiPicker,
  })),
);

export function MythologyAvatarGrid({
  selectedValue,
  onSelect,
  columns = 6,
  compact = false,
}: {
  selectedValue?: string | null;
  onSelect: (value: string) => void;
  columns?: 5 | 6;
  compact?: boolean;
}) {
  const [series, setSeries] = useState<MythologyAvatarSeriesId>("beasts");
  const items = MYTHOLOGY_AVATAR_PRESETS.filter((p) => p.series === series);

  return (
    <div className={cn("flex flex-col gap-2", compact ? "p-2" : "p-2.5")}>
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          {MYTHOLOGY_AVATAR_SERIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSeries(tab.id)}
              className={cn(
                "rounded-md px-2 py-1 text-caption font-medium transition-colors",
                series === tab.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelect(pickRandomMythologyPreset(selectedValue).value)}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-caption text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="随机一个神话图腾"
        >
          <Dices className="size-3.5" />
          <span>随机</span>
        </button>
      </div>
      <div
        className={cn(
          "grid max-h-56 gap-1.5 overflow-y-auto pr-0.5",
          columns === 5 ? "grid-cols-5" : "grid-cols-6",
        )}
      >
        {items.map((preset) => {
          const active = selectedValue === preset.value;
          return (
            <button
              key={preset.id}
              type="button"
              title={`${preset.label} (${preset.id})`}
              aria-label={preset.label}
              aria-pressed={active}
              onClick={() => onSelect(preset.value)}
              className={cn(
                "group flex flex-col items-center gap-0.5 rounded-lg p-1 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active && "bg-accent ring-1 ring-ring",
              )}
            >
              <span className="flex size-9 items-center justify-center overflow-hidden rounded-full shadow-xs">
                <PresetAvatarGlyph value={preset.value} alt={preset.label} />
              </span>
              <span className="max-w-full truncate text-[10px] leading-tight text-muted-foreground group-hover:text-foreground">
                {preset.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MythologyIconPicker({
  value,
  onSelect,
}: {
  value?: string | null;
  onSelect: (icon: string) => void;
}) {
  const [mode, setMode] = useState<"myth" | "emoji">("myth");

  return (
    <div className={cn(mode === "myth" ? "w-[336px]" : "w-auto")}>
      <div className="flex items-center gap-1 border-b px-2.5 py-2">
        <button
          type="button"
          onClick={() => setMode("myth")}
          className={cn(
            "rounded-md px-2.5 py-1 text-caption font-medium transition-colors",
            mode === "myth"
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
          )}
        >
          神话图腾 (60)
        </button>
        <button
          type="button"
          onClick={() => setMode("emoji")}
          className={cn(
            "rounded-md px-2.5 py-1 text-caption font-medium transition-colors",
            mode === "emoji"
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
          )}
        >
          Emoji
        </button>
      </div>
      {mode === "myth" ? (
        <MythologyAvatarGrid selectedValue={value} onSelect={onSelect} />
      ) : (
        <Suspense
          fallback={
            <div className="p-4 text-body text-muted-foreground">Loading...</div>
          }
        >
          <EmojiPicker onSelect={onSelect} />
        </Suspense>
      )}
    </div>
  );
}
