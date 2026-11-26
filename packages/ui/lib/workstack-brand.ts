export type ThinkingIconVariant = "light" | "dark";

export const WORKSTACK_BACKGROUND = "#0E1019";
export const WORKSTACK_ACCENT = "#818CF8";
export const WORKSTACK_FOREGROUND = "#F8FAFC";
export const WORKSTACK_BRANCHES =
  "M27 33C35 23 49 19 63 23M73 67C65 77 51 81 37 77";
export const WORKSTACK_NODES =
  "M50 22C51.8 36.8 63.2 48.2 78 50C63.2 51.8 51.8 63.2 50 78C48.2 63.2 36.8 51.8 22 50C36.8 48.2 48.2 36.8 50 22Z";

/**
 * Generates the Thinking flagship app icon SVG ("Luminous Synapse Prism")
 * in either Light (Porcelain Titanium + Sapphire Prism) or Dark (Obsidian Titanium + Platinum Indigo Prism).
 */
export function thinkingIconSvg(
  size = 100,
  variant: ThinkingIconVariant = "dark",
  options: { shape?: "square" | "circle"; idPrefix?: string } = {},
): string {
  const rx = options.shape === "circle" ? 50 : 22.5;
  const p = options.idPrefix ?? `tk-${variant}`;
  const isLight = variant === "light";

  if (isLight) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <defs>
    <linearGradient id="${p}-bg" x1="14%" y1="6%" x2="86%" y2="96%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="52%" stop-color="#F4F6FB"/>
      <stop offset="100%" stop-color="#E5E9F5"/>
    </linearGradient>
    <radialGradient id="${p}-aura" cx="50%" cy="46%" r="48%">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.16"/>
      <stop offset="55%" stop-color="#3B82F6" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-rim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="#D5DCEE" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#BCC6DF" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="${p}-arc-a" x1="18%" y1="18%" x2="82%" y2="48%">
      <stop offset="0%" stop-color="#1E2547"/>
      <stop offset="55%" stop-color="#3730A3"/>
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="${p}-arc-b" x1="82%" y1="82%" x2="18%" y2="52%">
      <stop offset="0%" stop-color="#1E2547"/>
      <stop offset="55%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="${p}-star" x1="25%" y1="18%" x2="78%" y2="85%">
      <stop offset="0%" stop-color="#1D2652"/>
      <stop offset="45%" stop-color="#4338CA"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="${p}-facet" x1="50%" y1="20%" x2="50%" y2="80%">
      <stop offset="0%" stop-color="#EEF2FF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#818CF8" stop-opacity="0.15"/>
    </linearGradient>
    <filter id="${p}-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2.2" stdDeviation="2.4" flood-color="#312E81" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="${rx}" fill="url(#${p}-bg)" stroke="url(#${p}-rim)" stroke-width="1.5"/>
  <rect x="2" y="2" width="96" height="96" rx="${Math.max(rx - 1.5, 0)}" fill="url(#${p}-aura)"/>
  <!-- Subtle architectural precision dial rings -->
  <circle cx="50" cy="50" r="35.5" fill="none" stroke="#CBD5E1" stroke-opacity="0.55" stroke-width="0.9"/>
  <!-- Dual asymmetric golden-ratio synapse arcs -->
  <path d="M23.5 38.5 A 29 29 0 0 1 68.5 27.5" fill="none" stroke="url(#${p}-arc-a)" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M76.5 61.5 A 29 29 0 0 1 31.5 72.5" fill="none" stroke="url(#${p}-arc-b)" stroke-width="3.6" stroke-linecap="round"/>
  <!-- Twin orbital insight nodes -->
  <circle cx="71.2" cy="29.4" r="3.4" fill="#4338CA"/>
  <circle cx="71.2" cy="29.4" r="1.4" fill="#E0E7FF"/>
  <circle cx="28.8" cy="70.6" r="3.4" fill="#2563EB"/>
  <circle cx="28.8" cy="70.6" r="1.4" fill="#E0F2FE"/>
  <!-- Sculpted central Thinking 4-point prism spark -->
  <g filter="url(#${p}-shadow)">
    <path d="M50 25.5 C51.6 39.2 60.8 48.4 74.5 50 C60.8 51.6 51.6 60.8 50 74.5 C48.4 60.8 39.2 51.6 25.5 50 C39.2 48.4 48.4 39.2 50 25.5 Z" fill="url(#${p}-star)"/>
    <!-- Top-left specular prism facet -->
    <path d="M50 28 C50.8 39.8 56.8 47.2 50 50 C43.2 47.2 49.2 39.8 50 28 Z" fill="url(#${p}-facet)" opacity="0.62"/>
    <path d="M28 50 C39.8 49.2 47.2 43.2 50 50 C47.2 56.8 39.8 50.8 28 50 Z" fill="url(#${p}-facet)" opacity="0.34"/>
    <!-- Luminous crystalline core -->
    <circle cx="50" cy="50" r="4.2" fill="#FFFFFF"/>
    <circle cx="50" cy="50" r="2" fill="#4338CA"/>
  </g>
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <defs>
    <linearGradient id="${p}-bg" x1="16%" y1="4%" x2="84%" y2="96%">
      <stop offset="0%" stop-color="#1B1E2E"/>
      <stop offset="50%" stop-color="#0F111B"/>
      <stop offset="100%" stop-color="#07080E"/>
    </linearGradient>
    <radialGradient id="${p}-aura" cx="50%" cy="46%" r="50%">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.34"/>
      <stop offset="48%" stop-color="#4F46E5" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#07080E" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-rim" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.28"/>
      <stop offset="38%" stop-color="#818CF8" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.06"/>
    </linearGradient>
    <linearGradient id="${p}-arc-a" x1="18%" y1="18%" x2="82%" y2="48%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="55%" stop-color="#A5B4FC"/>
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.28"/>
    </linearGradient>
    <linearGradient id="${p}-arc-b" x1="82%" y1="82%" x2="18%" y2="52%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="55%" stop-color="#7DD3FC"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.28"/>
    </linearGradient>
    <linearGradient id="${p}-star" x1="22%" y1="18%" x2="80%" y2="84%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="48%" stop-color="#C7D2FE"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
    <filter id="${p}-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.6" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="0.75" y="0.75" width="98.5" height="98.5" rx="${rx}" fill="url(#${p}-bg)" stroke="url(#${p}-rim)" stroke-width="1.5"/>
  <rect x="2" y="2" width="96" height="96" rx="${Math.max(rx - 1.5, 0)}" fill="url(#${p}-aura)"/>
  <!-- Subtle precision titanium ring -->
  <circle cx="50" cy="50" r="35.5" fill="none" stroke="#94A3B8" stroke-opacity="0.16" stroke-width="0.9"/>
  <!-- Dual luminous synapse arcs -->
  <path d="M23.5 38.5 A 29 29 0 0 1 68.5 27.5" fill="none" stroke="url(#${p}-arc-a)" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M76.5 61.5 A 29 29 0 0 1 31.5 72.5" fill="none" stroke="url(#${p}-arc-b)" stroke-width="3.6" stroke-linecap="round"/>
  <!-- Twin orbital insight nodes -->
  <circle cx="71.2" cy="29.4" r="3.4" fill="#C7D2FE"/>
  <circle cx="71.2" cy="29.4" r="1.5" fill="#FFFFFF"/>
  <circle cx="28.8" cy="70.6" r="3.4" fill="#7DD3FC"/>
  <circle cx="28.8" cy="70.6" r="1.5" fill="#FFFFFF"/>
  <!-- Glowing sculpted Thinking 4-point prism spark -->
  <g filter="url(#${p}-glow)">
    <path d="M50 25.5 C51.6 39.2 60.8 48.4 74.5 50 C60.8 51.6 51.6 60.8 50 74.5 C48.4 60.8 39.2 51.6 25.5 50 C39.2 48.4 48.4 39.2 50 25.5 Z" fill="url(#${p}-star)"/>
  </g>
  <!-- Crisp jewel core -->
  <circle cx="50" cy="50" r="4.2" fill="#1E2340" stroke="#A5B4FC" stroke-opacity="0.45" stroke-width="0.9"/>
  <circle cx="50" cy="50" r="2.1" fill="#FFFFFF"/>
</svg>`;
}

export function workstackIconSvg(size = 100, variant: ThinkingIconVariant = "dark") {
  return thinkingIconSvg(size, variant);
}
