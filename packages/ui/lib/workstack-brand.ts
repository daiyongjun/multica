export type ThinkingIconVariant = "light" | "dark";

export const WORKSTACK_BACKGROUND = "#12141A";
export const WORKSTACK_ACCENT = "#A8B0C2";
export const WORKSTACK_FOREGROUND = "#F8FAFC";
export const WORKSTACK_BRANCHES = "M22 32h38M31 50h38M40 68h38";
export const WORKSTACK_NODES =
  "M29 25h24a7 7 0 0 1 0 14H29a7 7 0 0 1 0-14ZM38 43h24a7 7 0 0 1 0 14H38a7 7 0 0 1 0-14ZM47 61h24a7 7 0 0 1 0 14H47a7 7 0 0 1 0-14Z";

/**
 * Generates the flagship Thinking app icon SVG ("#T16 Chain of Thought")
 * in either Light (Porcelain + Stepped Obsidian Capsules) or Dark (Obsidian Titanium + Stepped Ivory Capsules).
 */
export function thinkingIconSvg(
  size = 100,
  variant: ThinkingIconVariant = "dark",
  options: { shape?: "square" | "circle"; idPrefix?: string } = {},
): string {
  const rx = options.shape === "circle" ? 50 : 22.5;
  const p = options.idPrefix ?? `tk16-${variant}`;
  const isLight = variant === "light";

  if (isLight) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <defs>
    <linearGradient id="${p}-bg" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="58%" stop-color="#F6F7FA"/>
      <stop offset="100%" stop-color="#EAECEF"/>
    </linearGradient>
    <linearGradient id="${p}-rim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="50%" stop-color="#DCDFE8" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#C6CBD7" stop-opacity="0.92"/>
    </linearGradient>
    <radialGradient id="${p}-sheen" cx="50%" cy="10%" r="68%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-s1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C2C7D2"/>
      <stop offset="100%" stop-color="#AAB1C0"/>
    </linearGradient>
    <linearGradient id="${p}-s2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#707787"/>
      <stop offset="100%" stop-color="#535A6A"/>
    </linearGradient>
    <linearGradient id="${p}-s3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#222531"/>
      <stop offset="100%" stop-color="#0E1016"/>
    </linearGradient>
    <filter id="${p}-ds" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2.2" stdDeviation="2" flood-color="#0F172A" flood-opacity="0.16"/>
    </filter>
  </defs>
  <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="${rx}" fill="url(#${p}-bg)" stroke="url(#${p}-rim)" stroke-width="1.4"/>
  <rect x="1.5" y="1.5" width="97" height="97" rx="${Math.max(rx - 1, 0)}" fill="url(#${p}-sheen)"/>
  <g filter="url(#${p}-ds)">
    <rect x="22" y="25" width="38" height="14" rx="7" fill="url(#${p}-s1)"/>
    <rect x="31" y="43" width="38" height="14" rx="7" fill="url(#${p}-s2)"/>
    <rect x="40" y="61" width="38" height="14" rx="7" fill="url(#${p}-s3)"/>
    <circle cx="71" cy="68" r="3.5" fill="#FFFFFF"/>
  </g>
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <defs>
    <linearGradient id="${p}-bg" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#1E2028"/>
      <stop offset="52%" stop-color="#13151B"/>
      <stop offset="100%" stop-color="#0A0B0F"/>
    </linearGradient>
    <linearGradient id="${p}-rim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.24"/>
      <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.03"/>
    </linearGradient>
    <radialGradient id="${p}-sheen" cx="50%" cy="12%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-s1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5E6474"/>
      <stop offset="100%" stop-color="#454A58"/>
    </linearGradient>
    <linearGradient id="${p}-s2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B5BCCB"/>
      <stop offset="100%" stop-color="#9299AA"/>
    </linearGradient>
    <linearGradient id="${p}-s3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E4E8F1"/>
    </linearGradient>
    <filter id="${p}-ds" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.2" flood-color="#000000" flood-opacity="0.58"/>
    </filter>
  </defs>
  <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="${rx}" fill="url(#${p}-bg)" stroke="url(#${p}-rim)" stroke-width="1.4"/>
  <rect x="1.5" y="1.5" width="97" height="97" rx="${Math.max(rx - 1, 0)}" fill="url(#${p}-sheen)"/>
  <g filter="url(#${p}-ds)">
    <rect x="22" y="25" width="38" height="14" rx="7" fill="url(#${p}-s1)"/>
    <rect x="31" y="43" width="38" height="14" rx="7" fill="url(#${p}-s2)"/>
    <rect x="40" y="61" width="38" height="14" rx="7" fill="url(#${p}-s3)"/>
    <circle cx="71" cy="68" r="3.5" fill="#111319"/>
  </g>
</svg>`;
}

export function workstackIconSvg(size = 100, variant: ThinkingIconVariant = "dark") {
  return thinkingIconSvg(size, variant);
}
