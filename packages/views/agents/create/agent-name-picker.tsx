"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ExternalLink, Globe, RefreshCw, Sparkles } from "@multica/ui/icons";
import { Button } from "@multica/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@multica/ui/components/ui/dialog";
import { Input } from "@multica/ui/components/ui/input";
import { cn } from "@multica/ui/lib/utils";

export const HIFOX_NAMING_TOOL_URL = "https://quming.hifox.com/";

export type NameCategoryId = "featured" | "wuxia" | "anime" | "classic" | "geek";

export interface NameCategory {
  id: NameCategoryId;
  label: string;
  names: readonly string[];
}

export const AGENT_NAME_CATEGORIES: readonly NameCategory[] = [
  {
    id: "featured",
    label: "精选",
    names: [
      "甘道夫",
      "风清扬",
      "红孩儿",
      "露琪亚",
      "韦小宝",
      "莱戈拉斯",
      "太上老君",
      "印第安纳琼斯",
      "孙悟空",
      "诸葛亮",
      "贾维斯",
      "雅典娜",
      "李逍遥",
      "夏洛克",
      "韩立",
      "图灵",
      "令狐冲",
      "灰原哀",
      "王阳明",
      "苏东坡",
      "索隆",
      "姜子牙",
      "达芬奇",
      "墨子",
    ],
  },
  {
    id: "wuxia",
    label: "武侠仙侠",
    names: [
      "风清扬",
      "韦小宝",
      "令狐冲",
      "韩立",
      "李逍遥",
      "太上老君",
      "红孩儿",
      "杨过",
      "小龙女",
      "黄蓉",
      "郭靖",
      "乔峰",
      "段誉",
      "张无忌",
      "赵灵儿",
      "重楼",
      "景天",
      "萧炎",
      "唐三",
      "石昊",
    ],
  },
  {
    id: "anime",
    label: "动漫电影",
    names: [
      "甘道夫",
      "莱戈拉斯",
      "露琪亚",
      "印第安纳琼斯",
      "路飞",
      "索隆",
      "灰原哀",
      "工藤新一",
      "夏洛克",
      "贾维斯",
      "阿童木",
      "哆啦A梦",
      "卡卡西",
      "鸣人",
      "朽木白哉",
      "赫敏",
      "邓布利多",
      "钢铁侠",
      "星期五",
      "瓦力",
    ],
  },
  {
    id: "classic",
    label: "古典神话",
    names: [
      "诸葛亮",
      "孙悟空",
      "太上老君",
      "姜子牙",
      "苏东坡",
      "王阳明",
      "墨子",
      "庄子",
      "老子",
      "鬼谷子",
      "张良",
      "韩信",
      "李白",
      "辛弃疾",
      "雅典娜",
      "阿波罗",
      "赫尔墨斯",
      "普罗米修斯",
      "哪吒",
      "二郎神",
    ],
  },
  {
    id: "geek",
    label: "极客大师",
    names: [
      "图灵",
      "达芬奇",
      "特斯拉",
      "爱因斯坦",
      "香农",
      "冯诺依曼",
      "牛顿",
      "费曼",
      "居里夫人",
      "高斯",
      "欧拉",
      "阿基米德",
      "伽利略",
      "开普勒",
      "麦克斯韦",
      "狄拉克",
      "林纳斯",
      "乔布斯",
      "凯文凯利",
      "戴森",
    ],
  },
];

const SUGGESTIONS_PER_PAGE = 8;

/**
 * Extracts a clean agent name from clipboard text copied out of quming.hifox.com
 * (which may be a single name, or a full roster line like `甘道夫｜架构师` or multi-line).
 */
export function parseCopiedAgentName(raw: string): string {
  const firstLine = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0);
  if (!firstLine) return "";
  const beforePipe = firstLine.split(/[｜|]/)[0]?.trim() ?? "";
  return beforePipe.replace(/^[-•*·\d.\s]+/, "").trim().slice(0, 64);
}

export function pickSuggestionBatch(
  category: NameCategoryId,
  page: number,
  count = SUGGESTIONS_PER_PAGE,
): string[] {
  const pool =
    AGENT_NAME_CATEGORIES.find((item) => item.id === category)?.names ??
    AGENT_NAME_CATEGORIES[0]!.names;
  if (pool.length <= count) return [...pool];
  const offset = (page * count) % pool.length;
  const result: string[] = [];
  for (let i = 0; i < count; i += 1) {
    result.push(pool[(offset + i) % pool.length]!);
  }
  return result;
}

export function AgentNameSuggestionCard({
  currentName,
  onSelectName,
  onOpenNamingTool,
}: {
  currentName: string;
  onSelectName: (name: string) => void;
  onOpenNamingTool: () => void;
}) {
  const [category, setCategory] = useState<NameCategoryId>("featured");
  const [page, setPage] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const suggestions = useMemo(
    () => pickSuggestionBatch(category, page),
    [category, page],
  );

  const handleShuffle = () => {
    setPage((prev) => prev + 1);
    setSpinning(true);
    window.setTimeout(() => setSpinning(false), 320);
  };

  return (
    <div
      data-slot="agent-name-suggestions"
      onMouseDown={(event) => {
        // Keep the name textbox focused when clicking inside the suggestion card
        // so the panel does not flash closed before the click handler fires.
        event.preventDefault();
      }}
      className={cn(
        "mt-2 overflow-hidden rounded-xl border border-surface-border bg-surface-raised shadow-[var(--floating-shadow)]",
        "animate-in fade-in-0 zoom-in-[0.99] duration-150",
      )}
    >
      <div className="px-3.5 pt-3 pb-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-1">
            <span className="mr-1 text-caption font-medium text-muted-foreground">
              Agent 名称
            </span>
            {AGENT_NAME_CATEGORIES.map((cat) => {
              const active = cat.id === category;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id);
                    setPage(0);
                  }}
                  className={cn(
                    "cursor-pointer rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            aria-label="换一批名称"
            title="换一批"
            onClick={handleShuffle}
            className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RefreshCw
              className={cn(
                "size-3.5 transition-transform duration-300",
                spinning && "rotate-180",
              )}
            />
          </button>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => {
            const selected = currentName.trim() === suggestion;
            return (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSelectName(suggestion)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-label font-medium transition-all duration-150",
                  selected
                    ? "border-foreground bg-foreground text-background shadow-xs"
                    : "border-surface-border bg-muted/45 text-foreground hover:border-foreground/30 hover:bg-muted",
                )}
              >
                {selected ? <Check className="size-3" /> : null}
                <span>{suggestion}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-surface-border bg-muted/25 px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-1.5 text-caption text-muted-foreground">
          <span>试试</span>
          <button
            type="button"
            onClick={onOpenNamingTool}
            className="inline-flex cursor-pointer items-center gap-1 font-medium text-foreground underline decoration-foreground/35 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            <span>Thinking 取名工具</span>
          </button>
          <span className="rounded-full border border-surface-border bg-surface-raised px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
            内置选名
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenNamingTool}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-surface-border bg-surface-raised px-2.5 py-1 text-caption font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Sparkles className="size-3" />
          <span>打开选名</span>
        </button>
      </div>
    </div>
  );
}

export function AgentNamingToolModal({
  open,
  onOpenChange,
  initialName,
  onApplyName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onApplyName: (name: string) => void;
}) {
  const [reloadKey, setReloadKey] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [pickedName, setPickedName] = useState(initialName);
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setPickedName(initialName);
    setFeedback(null);
  }, [open, initialName]);

  // Listen for any postMessage payload if quming.hifox.com emits a chosen name.
  useEffect(() => {
    if (!open) return;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://quming.hifox.com") return;
      const data = event.data;
      const candidate =
        typeof data === "string"
          ? data
          : data && typeof data === "object" && typeof (data as { name?: unknown }).name === "string"
            ? (data as { name: string }).name
            : "";
      const cleaned = parseCopiedAgentName(candidate);
      if (cleaned) {
        setPickedName(cleaned);
        setFeedback(`已捕获名字「${cleaned}」`);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open]);

  const readFromClipboard = useCallback(async (applyImmediately: boolean) => {
    try {
      if (!navigator.clipboard?.readText) {
        setFeedback("当前环境不支持自动读取剪贴板，请直接按 ⌘V 粘贴到左侧输入框");
        inputRef.current?.focus();
        return;
      }
      const text = await navigator.clipboard.readText();
      const cleaned = parseCopiedAgentName(text);
      if (!cleaned) {
        setFeedback("请先在上方取名工具里点击任意角色名字（点击会自动复制），再点这里填入");
        return;
      }
      setPickedName(cleaned);
      if (applyImmediately) {
        onApplyName(cleaned);
        onOpenChange(false);
      } else {
        setFeedback(`已读取「${cleaned}」，点右侧即可确认填入`);
      }
    } catch {
      setFeedback("未能读取剪贴板，请直接在左侧输入框按 ⌘V 粘贴刚复制的名字");
      inputRef.current?.focus();
    }
  }, [onApplyName, onOpenChange]);

  const handleConfirm = async () => {
    const trimmed = pickedName.trim();
    if (trimmed) {
      onApplyName(trimmed);
      onOpenChange(false);
      return;
    }
    await readFromClipboard(true);
  };

  const handleOpenExternal = () => {
    const desktopOpen = (
      window as unknown as {
        desktopAPI?: { openExternal?: (url: string) => Promise<unknown> };
      }
    ).desktopAPI?.openExternal;
    if (desktopOpen) {
      void desktopOpen(HIFOX_NAMING_TOOL_URL);
      return;
    }
    window.open(HIFOX_NAMING_TOOL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[min(86vh,780px)] w-[min(94vw,1120px)] max-w-[min(94vw,1120px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(94vw,1120px)]"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-surface-border bg-surface-raised px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-surface-border bg-muted/60 text-foreground">
              <Sparkles className="size-3.5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="truncate text-body font-semibold">
                  Thinking 取名工具
                </DialogTitle>
                <span className="hidden items-center gap-1 rounded-full border border-surface-border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground sm:inline-flex">
                  <Globe className="size-3" />
                  quming.hifox.com
                </span>
              </div>
              <p className="truncate text-caption text-muted-foreground">
                在页面中点击任意角色名会自动复制，再点击下方「一键填入刚复制的名字」即可带回
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setLoaded(false);
                setReloadKey((k) => k + 1);
              }}
              aria-label="刷新取名工具"
            >
              <RefreshCw className="size-3.5" />
              <span className="hidden sm:inline">刷新</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleOpenExternal}
              aria-label="在浏览器中打开"
            >
              <ExternalLink className="size-3.5" />
              <span className="hidden sm:inline">浏览器打开</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              关闭
            </Button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-muted/20">
          {!loaded ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-surface-raised/85 text-caption text-muted-foreground backdrop-blur-xs">
              <RefreshCw className="size-4 animate-spin" />
              <span>正在加载内置取名工具（quming.hifox.com）…</span>
            </div>
          ) : null}
          <iframe
            key={reloadKey}
            src={HIFOX_NAMING_TOOL_URL}
            title="Thinking 取名工具"
            allow="clipboard-write; clipboard-read"
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0 bg-white"
          />
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-surface-border bg-surface-raised px-4 py-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <Input
              ref={inputRef}
              aria-label="选中的智能体名称"
              value={pickedName}
              onChange={(event) => {
                setPickedName(event.target.value);
                setFeedback(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void handleConfirm();
                }
              }}
              placeholder="点击上方角色名复制后，点右侧「读取刚复制的名字」或按 ⌘V 粘贴…"
            />
            {feedback ? (
              <p className="mt-1 text-caption text-muted-foreground">
                {feedback}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void readFromClipboard(false)}
            >
              读取刚复制的名字
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => void handleConfirm()}
            >
              <Check className="size-3.5" />
              <span>{pickedName.trim() ? `填入「${pickedName.trim()}」` : "读取并填入"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
