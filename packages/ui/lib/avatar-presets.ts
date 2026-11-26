export const THINKING_BRAND_AVATAR = "brand:thinking";
export const AGENT_PRESET_PREFIX = "preset:agent:";
export const MYTHOLOGY_PRESET_PREFIX = "preset:myth:";

export type AgentAvatarSeriesId = "porcelain" | "mecha" | "core" | "role" | "biomorphic";
export type MythologyAvatarSeriesId = "beasts" | "celestial" | "realms";

export interface AgentAvatarSeriesMeta {
  id: AgentAvatarSeriesId;
  label: string;
}

export interface MythologyAvatarSeriesMeta {
  id: MythologyAvatarSeriesId;
  label: string;
}

export interface AgentAvatarPreset {
  id: string;
  value: string;
  label: string;
  series: AgentAvatarSeriesId;
}

export interface MythologyAvatarPreset {
  id: string;
  value: string;
  label: string;
  slugBase: string;
  series: MythologyAvatarSeriesId;
}

export const AGENT_AVATAR_SERIES: readonly AgentAvatarSeriesMeta[] = [
  { id: "porcelain", label: "瓷白光幕" },
  { id: "mecha", label: "磨砂机甲" },
  { id: "core", label: "浮游智核" },
  { id: "role", label: "岗位分工" },
  { id: "biomorphic", label: "仿生萌机" },
] as const;

export const MYTHOLOGY_AVATAR_SERIES: readonly MythologyAvatarSeriesMeta[] = [
  { id: "beasts", label: "四象瑞兽" },
  { id: "celestial", label: "星宿神明" },
  { id: "realms", label: "仙山神器" },
] as const;

interface AgentPal {
  bg1: string;
  bg2: string;
  body1: string;
  body2: string;
  accent: string;
  led: string;
}

const AGENT_PAL: readonly AgentPal[] = [
  { bg1: "#EBF8F4", bg2: "#C7ECE1", body1: "#FFFFFF", body2: "#E6F2EE", accent: "#3BA68C", led: "#6EE7C8" },
  { bg1: "#EDF5FF", bg2: "#CBE1FF", body1: "#FFFFFF", body2: "#E6EEF9", accent: "#4280E0", led: "#7CC4FF" },
  { bg1: "#FFF3EE", bg2: "#FFD9CA", body1: "#FFFFFF", body2: "#F8EAE4", accent: "#E07458", led: "#FFB49A" },
  { bg1: "#F4F0FF", bg2: "#DDD3FF", body1: "#FFFFFF", body2: "#ECE8F9", accent: "#7A62D6", led: "#C4B5FD" },
  { bg1: "#FFF9EA", bg2: "#FCE7B6", body1: "#FFFFFF", body2: "#F6EFE0", accent: "#C9922E", led: "#FCD36A" },
  { bg1: "#EEF8EE", bg2: "#CDEBCB", body1: "#FFFFFF", body2: "#E8F2E8", accent: "#4A9956", led: "#86E598" },
  { bg1: "#FEF0F5", bg2: "#FAD1E1", body1: "#FFFFFF", body2: "#F7E9EF", accent: "#D4618D", led: "#F9A8C9" },
  { bg1: "#EBF8FA", bg2: "#C2EBF2", body1: "#FFFFFF", body2: "#E6F2F5", accent: "#3092A8", led: "#6CE0F5" },
  { bg1: "#F4F5F7", bg2: "#DCE0E8", body1: "#FFFFFF", body2: "#E9ECF2", accent: "#566074", led: "#A5B4FC" },
  { bg1: "#EEF2FF", bg2: "#D2DCFF", body1: "#FFFFFF", body2: "#E7ECFA", accent: "#4F66D1", led: "#93B4FF" },
];

type CeramicShape = "oval" | "squircle" | "capsule" | "dome" | "wide";
type CeramicTop = "none" | "antenna" | "twin" | "halo" | "leaf" | "crown" | "fin" | "orbit";
type CeramicEars = "none" | "pods" | "headphones" | "cat" | "rabbit" | "lop" | "bear" | "wings";
type LedExpr =
  | "happy"
  | "calm"
  | "wink"
  | "pill"
  | "spark"
  | "smile"
  | "focus"
  | "curious"
  | "dots"
  | "code"
  | "wave"
  | "bars"
  | "chain"
  | "trend"
  | "shield"
  | "matrix"
  | "heart";

interface CeramicBotConfig {
  shape?: CeramicShape;
  top?: CeramicTop;
  ears?: CeramicEars;
  expr?: LedExpr;
  tinted?: boolean;
}

type CoreKind =
  | "eyeOrb"
  | "ringCore"
  | "t16Bot"
  | "cubeBot"
  | "twinLens"
  | "prismCore"
  | "ufoBot"
  | "diamondCore"
  | "haloOrb"
  | "pillCore"
  | "hexCore"
  | "orbitDual"
  | "radarCore"
  | "shieldCore"
  | "satelliteCore"
  | "apertureCore"
  | "matrixCore"
  | "beaconCore"
  | "hourglassCore"
  | "neuralCore";

function ledFace(expr: LedExpr, led: string, cy = 47): string {
  switch (expr) {
    case "happy":
      return `<path d="M31 ${cy + 1}q4-5 8 0M51 ${cy + 1}q4-5 8 0" fill="none" stroke="${led}" stroke-width="2.6" stroke-linecap="round"/>`;
    case "calm":
      return `<circle cx="35.5" cy="${cy}" r="3.1" fill="${led}"/><circle cx="54.5" cy="${cy}" r="3.1" fill="${led}"/>`;
    case "wink":
      return `<circle cx="35.5" cy="${cy}" r="3.1" fill="${led}"/><path d="M51 ${cy + 1}q3.8-4.5 7.6 0" fill="none" stroke="${led}" stroke-width="2.5" stroke-linecap="round"/>`;
    case "pill":
      return `<rect x="32.5" y="${cy - 4}" width="5" height="8" rx="2.5" fill="${led}"/><rect x="52.5" y="${cy - 4}" width="5" height="8" rx="2.5" fill="${led}"/>`;
    case "spark":
      return `<path d="M35.5 ${cy - 4.5}c.5 3 1.5 4 4.5 4.5-3 .5-4 1.5-4.5 4.5-.5-3-1.5-4-4.5-4.5 3-.5 4-1.5 4.5-4.5Z" fill="${led}"/><path d="M54.5 ${cy - 4.5}c.5 3 1.5 4 4.5 4.5-3 .5-4 1.5-4.5 4.5-.5-3-1.5-4-4.5-4.5 3-.5 4-1.5 4.5-4.5Z" fill="${led}"/>`;
    case "smile":
      return `<circle cx="35.5" cy="${cy - 1.2}" r="2.6" fill="${led}"/><circle cx="54.5" cy="${cy - 1.2}" r="2.6" fill="${led}"/><path d="M41.5 ${cy + 3.8}q3.5 3 7 0" fill="none" stroke="${led}" stroke-width="2" stroke-linecap="round" opacity="0.85"/>`;
    case "focus":
      return `<rect x="31" y="${cy - 1.4}" width="9" height="2.8" rx="1.4" fill="${led}"/><rect x="50" y="${cy - 1.4}" width="9" height="2.8" rx="1.4" fill="${led}"/>`;
    case "curious":
      return `<circle cx="35" cy="${cy}" r="3.8" fill="${led}"/><circle cx="55" cy="${cy}" r="2.4" fill="${led}"/>`;
    case "dots":
      return `<circle cx="35" cy="${cy}" r="2.3" fill="${led}" opacity="0.45"/><circle cx="45" cy="${cy}" r="2.7" fill="${led}" opacity="0.75"/><circle cx="55" cy="${cy}" r="3.1" fill="${led}"/>`;
    case "code":
      return `<path d="M37 ${cy - 3.5}l-4 3.5 4 3.5M53 ${cy - 3.5}l4 3.5-4 3.5M47 ${cy - 4.5}l-4 9" fill="none" stroke="${led}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "wave":
      return `<path d="M29 ${cy}c3-5 5-5 8 0s5 5 8 0 5-5 8 0 5 5 8 0" fill="none" stroke="${led}" stroke-width="2.4" stroke-linecap="round"/>`;
    case "bars":
      return `<rect x="32" y="${cy - 2}" width="3.5" height="6" rx="1.7" fill="${led}" opacity="0.55"/><rect x="39" y="${cy - 5}" width="3.5" height="9" rx="1.7" fill="${led}" opacity="0.8"/><rect x="46" y="${cy - 3}" width="3.5" height="7" rx="1.7" fill="${led}"/><rect x="53" y="${cy - 6}" width="3.5" height="10" rx="1.7" fill="${led}"/>`;
    case "chain":
      return `<rect x="33" y="${cy - 5}" width="11" height="2.8" rx="1.4" fill="${led}" opacity="0.42"/><rect x="39" y="${cy - 1.4}" width="11" height="2.8" rx="1.4" fill="${led}" opacity="0.75"/><rect x="45" y="${cy + 2.2}" width="11" height="2.8" rx="1.4" fill="${led}"/>`;
    case "trend":
      return `<polyline points="31,${cy + 4} 38,${cy - 1} 44,${cy + 2} 53,${cy - 5} 58,${cy - 5}" fill="none" stroke="${led}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="58" cy="${cy - 5}" r="2.2" fill="${led}"/>`;
    case "shield":
      return `<path d="M45 ${cy - 6.5}l9 3v5.2c0 4.5-3.8 7.6-9 9.3-5.2-1.7-9-4.8-9-9.3v-5.2l9-3Z" fill="none" stroke="${led}" stroke-width="2.1" stroke-linejoin="round"/><path d="M41.5 ${cy + 0.5}l2.5 2.5 5-5" fill="none" stroke="${led}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "matrix":
      return `<circle cx="36" cy="${cy - 3.5}" r="1.9" fill="${led}" opacity="0.55"/><circle cx="45" cy="${cy - 3.5}" r="1.9" fill="${led}"/><circle cx="54" cy="${cy - 3.5}" r="1.9" fill="${led}" opacity="0.55"/><circle cx="36" cy="${cy + 3.5}" r="1.9" fill="${led}"/><circle cx="45" cy="${cy + 3.5}" r="1.9" fill="${led}" opacity="0.75"/><circle cx="54" cy="${cy + 3.5}" r="1.9" fill="${led}"/>`;
    case "heart":
      return `<circle cx="35.5" cy="${cy - 1}" r="2.8" fill="${led}"/><circle cx="54.5" cy="${cy - 1}" r="2.8" fill="${led}"/><ellipse cx="31" cy="${cy + 3.5}" rx="2.8" ry="1.3" fill="#FDA4AF" opacity="0.7"/><ellipse cx="59" cy="${cy + 3.5}" rx="2.8" ry="1.3" fill="#FDA4AF" opacity="0.7"/>`;
  }
}

function wrapAgentSvg(pal: AgentPal, inner: string, extraDefs = ""): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
    <defs>
      <linearGradient id="bg" x1="12%" y1="6%" x2="88%" y2="94%">
        <stop offset="0%" stop-color="${pal.bg1}"/>
        <stop offset="100%" stop-color="${pal.bg2}"/>
      </linearGradient>
      <linearGradient id="bd" x1="20%" y1="8%" x2="80%" y2="95%">
        <stop offset="0%" stop-color="${pal.body1}"/>
        <stop offset="100%" stop-color="${pal.body2}"/>
      </linearGradient>
      <linearGradient id="vs" x1="15%" y1="0%" x2="85%" y2="100%">
        <stop offset="0%" stop-color="#272D3D"/>
        <stop offset="55%" stop-color="#171B26"/>
        <stop offset="100%" stop-color="#10131C"/>
      </linearGradient>
      <linearGradient id="sh" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.34"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
      </linearGradient>
      <filter id="ds" x="-20%" y="-20%" width="140%" height="145%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="3" flood-color="${pal.accent}" flood-opacity="0.22"/>
      </filter>
      <clipPath id="cp"><circle cx="45" cy="45" r="44.5"/></clipPath>
      ${extraDefs}
    </defs>
    <rect width="90" height="90" fill="url(#bg)"/>
    <g clip-path="url(#cp)" filter="url(#ds)">${inner}</g>
  </svg>`;
}

function drawCeramicBotSvg(pal: AgentPal, cfg: CeramicBotConfig): string {
  const { shape = "oval", top = "none", ears = "none", expr = "happy", tinted = false } = cfg;
  const fillBody = tinted ? "url(#tbd)" : "url(#bd)";
  const extraDefs = tinted
    ? `<linearGradient id="tbd" x1="15%" y1="8%" x2="85%" y2="94%"><stop offset="0%" stop-color="${pal.bg1}"/><stop offset="100%" stop-color="${pal.accent}"/></linearGradient>`
    : "";

  const topPart =
    top === "antenna"
      ? `<line x1="45" y1="24" x2="45" y2="14" stroke="${pal.accent}" stroke-width="2.8" stroke-linecap="round"/><circle cx="45" cy="13" r="3.8" fill="${pal.accent}"/><circle cx="44" cy="12" r="1.2" fill="#FFFFFF" opacity="0.8"/>`
      : top === "twin"
        ? `<line x1="36" y1="25" x2="32" y2="15" stroke="${pal.accent}" stroke-width="2.4" stroke-linecap="round"/><circle cx="31.5" cy="14" r="3" fill="${pal.accent}"/><line x1="54" y1="25" x2="58" y2="15" stroke="${pal.accent}" stroke-width="2.4" stroke-linecap="round"/><circle cx="58.5" cy="14" r="3" fill="${pal.accent}"/>`
        : top === "halo"
          ? `<ellipse cx="45" cy="16" rx="15" ry="4" fill="none" stroke="${pal.accent}" stroke-width="2.6" opacity="0.85"/>`
          : top === "leaf"
            ? `<path d="M45 24V16" stroke="${pal.accent}" stroke-width="2.4" stroke-linecap="round"/><path d="M45 18c-8-1-10-8-7-11 6 0 9 4 7 11Z" fill="${pal.accent}"/><path d="M45 17c7-1 9-6 7-9-5 0-8 3-7 9Z" fill="${pal.led}"/>`
            : top === "crown"
              ? `<path d="M35 23l2.5-9.5 7.5 4.8L52.5 13.5 55 23Z" fill="${pal.accent}" stroke="#FFFFFF" stroke-width="1"/>`
              : top === "fin"
                ? `<path d="M45 11c5 3 8 8 8 14H37c0-6 3-11 8-14Z" fill="${pal.accent}" opacity="0.85"/>`
                : top === "orbit"
                  ? `<ellipse cx="45" cy="19" rx="18" ry="5" transform="rotate(-12 45 19)" fill="none" stroke="${pal.accent}" stroke-width="2" opacity="0.65"/><circle cx="61" cy="16" r="2.6" fill="${pal.accent}"/>`
                  : "";

  const earPart =
    ears === "pods"
      ? `<rect x="13" y="38" width="7" height="17" rx="3.5" fill="${pal.accent}" opacity="0.85"/><rect x="70" y="38" width="7" height="17" rx="3.5" fill="${pal.accent}" opacity="0.85"/>`
      : ears === "headphones"
        ? `<path d="M18 45a27 27 0 0 1 54 0" fill="none" stroke="${pal.accent}" stroke-width="3.4"/><rect x="13" y="39" width="7.5" height="16" rx="3.7" fill="${pal.accent}"/><rect x="69.5" y="39" width="7.5" height="16" rx="3.7" fill="${pal.accent}"/>`
        : ears === "cat"
          ? `<path d="M22 36L20 18l15 9Z" fill="${fillBody}" stroke="${pal.accent}" stroke-opacity="0.25" stroke-width="1.2"/><path d="M68 36L70 18 55 27Z" fill="${fillBody}" stroke="${pal.accent}" stroke-opacity="0.25" stroke-width="1.2"/><path d="M24 31l-1-8 8 5Z" fill="${pal.accent}" opacity="0.45"/><path d="M66 31l1-8-8 5Z" fill="${pal.accent}" opacity="0.45"/>`
          : ears === "rabbit"
            ? `<ellipse cx="34" cy="16" rx="5.5" ry="13" fill="${fillBody}"/><ellipse cx="34" cy="17" rx="2.6" ry="8" fill="${pal.accent}" opacity="0.35"/><ellipse cx="56" cy="16" rx="5.5" ry="13" fill="${fillBody}"/><ellipse cx="56" cy="17" rx="2.6" ry="8" fill="${pal.accent}" opacity="0.35"/>`
            : ears === "lop"
              ? `<ellipse cx="16" cy="49" rx="5.5" ry="13" transform="rotate(14 16 49)" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1"/><ellipse cx="16" cy="50" rx="2.6" ry="8" transform="rotate(14 16 50)" fill="${pal.accent}" opacity="0.32"/><ellipse cx="74" cy="49" rx="5.5" ry="13" transform="rotate(-14 74 49)" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1"/><ellipse cx="74" cy="50" rx="2.6" ry="8" transform="rotate(-14 74 50)" fill="${pal.accent}" opacity="0.32"/>`
              : ears === "bear"
                ? `<circle cx="24" cy="26" r="8" fill="${fillBody}"/><circle cx="24" cy="26" r="4" fill="${pal.accent}" opacity="0.35"/><circle cx="66" cy="26" r="8" fill="${fillBody}"/><circle cx="66" cy="26" r="4" fill="${pal.accent}" opacity="0.35"/>`
                : ears === "wings"
                  ? `<path d="M19 46c-8-4-10-12-5-16 4 4 8 6 10 9Z" fill="#FFFFFF" opacity="0.9"/><path d="M71 46c8-4 10-12 5-16-4 4-8 6-10 9Z" fill="#FFFFFF" opacity="0.9"/>`
                  : "";

  const body =
    shape === "oval"
      ? `<ellipse cx="45" cy="48" rx="27" ry="24" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1.4"/>`
      : shape === "squircle"
        ? `<rect x="19" y="24" width="52" height="46" rx="18" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1.4"/>`
        : shape === "capsule"
          ? `<rect x="21" y="22" width="48" height="50" rx="24" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1.4"/>`
          : shape === "dome"
            ? `<path d="M20 55V44a25 25 0 0 1 50 0v11a14 14 0 0 1-14 14H34a14 14 0 0 1-14-14Z" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1.4"/>`
            : `<rect x="18" y="26" width="54" height="42" rx="15" fill="${fillBody}" stroke="#FFFFFF" stroke-width="1.4"/>`;

  const visor = `<rect x="24.5" y="34.5" width="41" height="25" rx="12.5" fill="url(#vs)"/><path d="M31 37.5h28a6 6 0 0 1 5 3.5c-11 2-27 2-38 0a6 6 0 0 1 5-3.5Z" fill="url(#sh)"/>`;
  return wrapAgentSvg(pal, `${topPart}${earPart}${body}${visor}${ledFace(expr, pal.led, 47.5)}`, extraDefs);
}

function drawAICoreSvg(pal: AgentPal, kind: CoreKind): string {
  let core = "";
  switch (kind) {
    case "eyeOrb":
      core = `<circle cx="45" cy="45" r="26" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><circle cx="45" cy="45" r="16" fill="url(#vs)"/><circle cx="45" cy="45" r="8" fill="none" stroke="${pal.led}" stroke-width="2.6"/><circle cx="45" cy="45" r="3.4" fill="${pal.led}"/><circle cx="39" cy="39" r="2.2" fill="#FFFFFF" opacity="0.7"/>`;
      break;
    case "ringCore":
      core = `<ellipse cx="45" cy="45" rx="31" ry="12" transform="rotate(-24 45 45)" fill="none" stroke="${pal.accent}" stroke-width="2.6" opacity="0.6"/><circle cx="45" cy="45" r="20" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="29" y="37" width="32" height="16" rx="8" fill="url(#vs)"/><g transform="translate(45,45) scale(0.84) translate(-45,-45)">${ledFace("happy", pal.led, 45.5)}</g><circle cx="68" cy="34" r="3.6" fill="${pal.accent}"/>`;
      break;
    case "t16Bot":
      core = `<rect x="20" y="20" width="50" height="50" rx="18" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="26" y="29" width="38" height="32" rx="12" fill="url(#vs)"/><rect x="33" y="36" width="14" height="4.2" rx="2.1" fill="${pal.led}" opacity="0.38"/><rect x="38" y="43" width="14" height="4.2" rx="2.1" fill="${pal.led}" opacity="0.72"/><rect x="43" y="50" width="14" height="4.2" rx="2.1" fill="${pal.led}"/>`;
      break;
    case "cubeBot":
      core = `<rect x="22" y="22" width="46" height="46" rx="12" transform="rotate(8 45 45)" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="28" y="33" width="34" height="22" rx="8" transform="rotate(8 45 45)" fill="url(#vs)"/><g transform="rotate(8 45 45)">${ledFace("pill", pal.led, 44.5)}</g>`;
      break;
    case "twinLens":
      core = `<rect x="17" y="30" width="56" height="32" rx="16" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><circle cx="34" cy="46" r="10.5" fill="url(#vs)"/><circle cx="34" cy="46" r="4.8" fill="${pal.led}"/><circle cx="56" cy="46" r="10.5" fill="url(#vs)"/><circle cx="56" cy="46" r="4.8" fill="${pal.led}"/>`;
      break;
    case "prismCore":
      core = `<polygon points="45,16 70,62 20,62" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.6" stroke-linejoin="round"/><circle cx="45" cy="46" r="11" fill="url(#vs)"/><circle cx="45" cy="46" r="4.5" fill="${pal.led}"/>`;
      break;
    case "ufoBot":
      core = `<path d="M27 46a18 18 0 0 1 36 0Z" fill="url(#vs)"/><g transform="translate(45,39) scale(0.84) translate(-45,-39)">${ledFace("calm", pal.led, 39)}</g><ellipse cx="45" cy="49" rx="29" ry="10.5" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.4"/><circle cx="31" cy="50" r="2.4" fill="${pal.accent}"/><circle cx="45" cy="52" r="2.4" fill="${pal.accent}"/><circle cx="59" cy="50" r="2.4" fill="${pal.accent}"/>`;
      break;
    case "diamondCore":
      core = `<rect x="24" y="24" width="42" height="42" rx="12" transform="rotate(45 45 45)" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><circle cx="45" cy="45" r="15.5" fill="url(#vs)"/><g transform="translate(45,45) scale(0.82) translate(-45,-45)">${ledFace("spark", pal.led, 45)}</g>`;
      break;
    case "haloOrb":
      core = `<circle cx="45" cy="45" r="29" fill="none" stroke="${pal.accent}" stroke-opacity="0.32" stroke-width="2.2" stroke-dasharray="4 4"/><circle cx="45" cy="45" r="21" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="29" y="37" width="32" height="16" rx="8" fill="url(#vs)"/><g transform="translate(45,45) scale(0.86) translate(-45,-45)">${ledFace("dots", pal.led, 45)}</g>`;
      break;
    case "pillCore":
      core = `<rect x="24" y="18" width="42" height="54" rx="21" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="30" y="28" width="30" height="24" rx="12" fill="url(#vs)"/><g transform="translate(45,40) scale(0.84) translate(-45,-40)">${ledFace("wave", pal.led, 40)}</g><circle cx="45" cy="61" r="3" fill="${pal.accent}" opacity="0.7"/>`;
      break;
    case "hexCore":
      core = `<polygon points="45,17 69,31 69,59 45,73 21,59 21,31" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.6" stroke-linejoin="round"/><polygon points="45,27 60,36 60,54 45,63 30,54 30,36" fill="url(#vs)" stroke-linejoin="round"/><circle cx="45" cy="39" r="2.6" fill="${pal.led}"/><circle cx="38" cy="49" r="2.6" fill="${pal.led}" opacity="0.75"/><circle cx="52" cy="49" r="2.6" fill="${pal.led}" opacity="0.75"/><path d="M45 39L38 49L52 49Z" fill="none" stroke="${pal.led}" stroke-width="1.5" opacity="0.55"/>`;
      break;
    case "orbitDual":
      core = `<path d="M29 53C33 34 57 34 61 53" fill="none" stroke="${pal.accent}" stroke-width="2.2" stroke-dasharray="3 3" opacity="0.55"/><circle cx="32" cy="49" r="15" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.4"/><circle cx="32" cy="49" r="8.5" fill="url(#vs)"/><circle cx="32" cy="49" r="3.4" fill="${pal.led}"/><circle cx="58" cy="42" r="13" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.4"/><circle cx="58" cy="42" r="7.2" fill="url(#vs)"/><circle cx="58" cy="42" r="2.9" fill="${pal.led}"/>`;
      break;
    case "radarCore":
      core = `<circle cx="45" cy="45" r="26" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><circle cx="45" cy="45" r="17.5" fill="url(#vs)"/><circle cx="45" cy="45" r="11" fill="none" stroke="${pal.led}" stroke-width="1.4" opacity="0.35"/><path d="M45 45L55 36" stroke="${pal.led}" stroke-width="2.4" stroke-linecap="round"/><circle cx="45" cy="45" r="2.6" fill="${pal.led}"/><circle cx="55" cy="36" r="2.2" fill="${pal.led}"/>`;
      break;
    case "shieldCore":
      core = `<path d="M45 17l24 8v19c0 14.5-10 23.5-24 28-14-4.5-24-13.5-24-28V25l24-8Z" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round"/><rect x="29" y="34" width="32" height="19" rx="9.5" fill="url(#vs)"/><g transform="translate(45,43.5) scale(0.84) translate(-45,-43.5)">${ledFace("shield", pal.led, 43.5)}</g>`;
      break;
    case "satelliteCore":
      core = `<rect x="11" y="37" width="14" height="16" rx="4" fill="${pal.accent}" opacity="0.8"/><rect x="65" y="37" width="14" height="16" rx="4" fill="${pal.accent}" opacity="0.8"/><line x1="25" y1="45" x2="65" y2="45" stroke="${pal.accent}" stroke-width="3"/><circle cx="45" cy="45" r="19" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="31" y="38" width="28" height="14" rx="7" fill="url(#vs)"/><g transform="translate(45,45) scale(0.82) translate(-45,-45)">${ledFace("smile", pal.led, 45.5)}</g>`;
      break;
    case "apertureCore":
      core = `<circle cx="45" cy="45" r="26" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><circle cx="45" cy="45" r="16.5" fill="url(#vs)"/><polygon points="45,33 55.4,39 55.4,51 45,57 34.6,51 34.6,39" fill="none" stroke="${pal.led}" stroke-width="2" opacity="0.85"/><circle cx="45" cy="45" r="4.2" fill="${pal.led}"/>`;
      break;
    case "matrixCore":
      core = `<rect x="20" y="20" width="50" height="50" rx="16" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="27" y="27" width="36" height="36" rx="10" fill="url(#vs)"/><circle cx="36" cy="36" r="2.3" fill="${pal.led}" opacity="0.45"/><circle cx="45" cy="36" r="2.3" fill="${pal.led}"/><circle cx="54" cy="36" r="2.3" fill="${pal.led}" opacity="0.45"/><circle cx="36" cy="45" r="2.3" fill="${pal.led}"/><circle cx="45" cy="45" r="2.6" fill="${pal.led}"/><circle cx="54" cy="45" r="2.3" fill="${pal.led}"/><circle cx="36" cy="54" r="2.3" fill="${pal.led}" opacity="0.45"/><circle cx="45" cy="54" r="2.3" fill="${pal.led}" opacity="0.75"/><circle cx="54" cy="54" r="2.3" fill="${pal.led}"/>`;
      break;
    case "beaconCore":
      core = `<path d="M31 24a18 18 0 0 1 28 0" fill="none" stroke="${pal.accent}" stroke-width="2.2" stroke-linecap="round" opacity="0.5"/><path d="M36 29a11 11 0 0 1 18 0" fill="none" stroke="${pal.accent}" stroke-width="2.2" stroke-linecap="round" opacity="0.8"/><rect x="23" y="34" width="44" height="34" rx="17" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="29" y="42" width="32" height="18" rx="9" fill="url(#vs)"/><g transform="translate(45,51) scale(0.84) translate(-45,-51)">${ledFace("wink", pal.led, 51)}</g>`;
      break;
    case "hourglassCore":
      core = `<path d="M27 22h36a6 6 0 0 1 4 10L53 45l14 13a6 6 0 0 1-4 10H27a6 6 0 0 1-4-10l14-13-14-13a6 6 0 0 1 4-10Z" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5" stroke-linejoin="round"/><circle cx="45" cy="33" r="6.5" fill="url(#vs)"/><circle cx="45" cy="33" r="2.6" fill="${pal.led}"/><circle cx="45" cy="57" r="6.5" fill="url(#vs)"/><circle cx="45" cy="57" r="2.6" fill="${pal.led}" opacity="0.7"/>`;
      break;
    case "neuralCore":
      core = `<circle cx="45" cy="45" r="25" fill="url(#bd)" stroke="#FFFFFF" stroke-width="1.5"/><rect x="27" y="33" width="36" height="24" rx="12" fill="url(#vs)"/><g transform="translate(45,45) scale(0.88) translate(-45,-45)">${ledFace("trend", pal.led, 45)}</g>`;
      break;
  }
  return wrapAgentSvg(pal, core);
}

type AgentSpec =
  | { kind: "bot"; label: string; series: AgentAvatarSeriesId; pal: number; cfg: CeramicBotConfig }
  | { kind: "core"; label: string; series: AgentAvatarSeriesId; pal: number; core: CoreKind };

const AGENT_SPECS: readonly AgentSpec[] = [
  // Series 1: Porcelain Visor Agents (#G001 - #G020)
  { kind: "bot", label: "晴空伊娃", series: "porcelain", pal: 1, cfg: { shape: "oval", top: "none", ears: "none", expr: "happy" } },
  { kind: "bot", label: "薄荷小智", series: "porcelain", pal: 0, cfg: { shape: "squircle", top: "antenna", ears: "pods", expr: "smile" } },
  { kind: "bot", label: "白桃星灵", series: "porcelain", pal: 2, cfg: { shape: "oval", top: "halo", ears: "none", expr: "spark" } },
  { kind: "bot", label: "芋泥胶囊", series: "porcelain", pal: 3, cfg: { shape: "capsule", top: "twin", ears: "none", expr: "pill" } },
  { kind: "bot", label: "奶油微笑", series: "porcelain", pal: 4, cfg: { shape: "dome", top: "antenna", ears: "pods", expr: "heart" } },
  { kind: "bot", label: "新芽伙伴", series: "porcelain", pal: 5, cfg: { shape: "oval", top: "leaf", ears: "none", expr: "happy" } },
  { kind: "bot", label: "樱花眨眼", series: "porcelain", pal: 6, cfg: { shape: "squircle", top: "none", ears: "pods", expr: "wink" } },
  { kind: "bot", label: "冰川光环", series: "porcelain", pal: 7, cfg: { shape: "oval", top: "orbit", ears: "none", expr: "calm" } },
  { kind: "bot", label: "银霜专注", series: "porcelain", pal: 8, cfg: { shape: "wide", top: "none", ears: "pods", expr: "focus" } },
  { kind: "bot", label: "晴靛思绪", series: "porcelain", pal: 9, cfg: { shape: "squircle", top: "antenna", ears: "none", expr: "dots" } },
  { kind: "bot", label: "云端耳机", series: "porcelain", pal: 1, cfg: { shape: "oval", top: "none", ears: "headphones", expr: "smile" } },
  { kind: "bot", label: "青岚双翼", series: "porcelain", pal: 0, cfg: { shape: "capsule", top: "halo", ears: "wings", expr: "happy" } },
  { kind: "bot", label: "蜜桃双线", series: "porcelain", pal: 2, cfg: { shape: "wide", top: "twin", ears: "pods", expr: "curious" } },
  { kind: "bot", label: "星紫王冠", series: "porcelain", pal: 3, cfg: { shape: "dome", top: "crown", ears: "none", expr: "spark" } },
  { kind: "bot", label: "晨光耳麦", series: "porcelain", pal: 4, cfg: { shape: "squircle", top: "none", ears: "headphones", expr: "wink" } },
  { kind: "bot", label: "翠竹圆屏", series: "porcelain", pal: 5, cfg: { shape: "oval", top: "fin", ears: "pods", expr: "pill" } },
  { kind: "bot", label: "粉樱双天线", series: "porcelain", pal: 6, cfg: { shape: "capsule", top: "twin", ears: "none", expr: "heart" } },
  { kind: "bot", label: "极光漫游", series: "porcelain", pal: 7, cfg: { shape: "dome", top: "orbit", ears: "pods", expr: "happy" } },
  { kind: "bot", label: "月白冷静", series: "porcelain", pal: 8, cfg: { shape: "squircle", top: "halo", ears: "none", expr: "calm" } },
  { kind: "bot", label: "蓝调波纹", series: "porcelain", pal: 9, cfg: { shape: "wide", top: "antenna", ears: "headphones", expr: "wave" } },

  // Series 2: Frosted Pastel Mecha Bots (#G021 - #G040)
  { kind: "bot", label: "薄荷机甲", series: "mecha", pal: 0, cfg: { shape: "squircle", top: "antenna", ears: "pods", expr: "happy", tinted: true } },
  { kind: "bot", label: "海盐机甲", series: "mecha", pal: 1, cfg: { shape: "wide", top: "twin", ears: "pods", expr: "pill", tinted: true } },
  { kind: "bot", label: "白桃机甲", series: "mecha", pal: 2, cfg: { shape: "oval", top: "halo", ears: "none", expr: "smile", tinted: true } },
  { kind: "bot", label: "芋紫机甲", series: "mecha", pal: 3, cfg: { shape: "capsule", top: "orbit", ears: "none", expr: "spark", tinted: true } },
  { kind: "bot", label: "奶油机甲", series: "mecha", pal: 4, cfg: { shape: "dome", top: "antenna", ears: "headphones", expr: "wink", tinted: true } },
  { kind: "bot", label: "嫩芽机甲", series: "mecha", pal: 5, cfg: { shape: "squircle", top: "leaf", ears: "pods", expr: "happy", tinted: true } },
  { kind: "bot", label: "樱粉机甲", series: "mecha", pal: 6, cfg: { shape: "oval", top: "crown", ears: "none", expr: "heart", tinted: true } },
  { kind: "bot", label: "冰青机甲", series: "mecha", pal: 7, cfg: { shape: "wide", top: "fin", ears: "pods", expr: "focus", tinted: true } },
  { kind: "bot", label: "银灰机甲", series: "mecha", pal: 8, cfg: { shape: "squircle", top: "twin", ears: "headphones", expr: "calm", tinted: true } },
  { kind: "bot", label: "靛蓝机甲", series: "mecha", pal: 9, cfg: { shape: "capsule", top: "antenna", ears: "none", expr: "dots", tinted: true } },
  { kind: "bot", label: "薄荷翼灵", series: "mecha", pal: 0, cfg: { shape: "oval", top: "none", ears: "wings", expr: "spark", tinted: true } },
  { kind: "bot", label: "海盐耳麦", series: "mecha", pal: 1, cfg: { shape: "dome", top: "none", ears: "headphones", expr: "wave", tinted: true } },
  { kind: "bot", label: "白桃好奇", series: "mecha", pal: 2, cfg: { shape: "squircle", top: "twin", ears: "none", expr: "curious", tinted: true } },
  { kind: "bot", label: "芋紫光轮", series: "mecha", pal: 3, cfg: { shape: "oval", top: "halo", ears: "pods", expr: "happy", tinted: true } },
  { kind: "bot", label: "奶油音律", series: "mecha", pal: 4, cfg: { shape: "wide", top: "antenna", ears: "pods", expr: "bars", tinted: true } },
  { kind: "bot", label: "青提极客", series: "mecha", pal: 5, cfg: { shape: "squircle", top: "none", ears: "pods", expr: "code", tinted: true } },
  { kind: "bot", label: "樱花思链", series: "mecha", pal: 6, cfg: { shape: "dome", top: "orbit", ears: "none", expr: "chain", tinted: true } },
  { kind: "bot", label: "冰川星眼", series: "mecha", pal: 7, cfg: { shape: "capsule", top: "fin", ears: "wings", expr: "spark", tinted: true } },
  { kind: "bot", label: "雾银大师", series: "mecha", pal: 8, cfg: { shape: "oval", top: "crown", ears: "pods", expr: "pill", tinted: true } },
  { kind: "bot", label: "晴空微笑", series: "mecha", pal: 9, cfg: { shape: "squircle", top: "leaf", ears: "none", expr: "smile", tinted: true } },

  // Series 3: Futuristic Floating AI Cores (#G041 - #G060)
  { kind: "core", label: "洞察之瞳", series: "core", pal: 0, core: "eyeOrb" },
  { kind: "core", label: "星环浮游", series: "core", pal: 3, core: "ringCore" },
  { kind: "core", label: "思维阶梯芯", series: "core", pal: 6, core: "t16Bot" },
  { kind: "core", label: "魔方算力", series: "core", pal: 9, core: "cubeBot" },
  { kind: "core", label: "双镜视界", series: "core", pal: 2, core: "twinLens" },
  { kind: "core", label: "光棱智核", series: "core", pal: 5, core: "prismCore" },
  { kind: "core", label: "浮游飞碟", series: "core", pal: 8, core: "ufoBot" },
  { kind: "core", label: "晶菱智脑", series: "core", pal: 1, core: "diamondCore" },
  { kind: "core", label: "脉冲光环", series: "core", pal: 4, core: "haloOrb" },
  { kind: "core", label: "声波胶囊", series: "core", pal: 7, core: "pillCore" },
  { kind: "core", label: "六棱算力核", series: "core", pal: 1, core: "hexCore" },
  { kind: "core", label: "双星协同核", series: "core", pal: 7, core: "orbitDual" },
  { kind: "core", label: "雷达探测核", series: "core", pal: 0, core: "radarCore" },
  { kind: "core", label: "守护盾智核", series: "core", pal: 5, core: "shieldCore" },
  { kind: "core", label: "中继卫星核", series: "core", pal: 9, core: "satelliteCore" },
  { kind: "core", label: "光圈视界核", series: "core", pal: 3, core: "apertureCore" },
  { kind: "core", label: "点阵智脑核", series: "core", pal: 6, core: "matrixCore" },
  { kind: "core", label: "领航信标核", series: "core", pal: 2, core: "beaconCore" },
  { kind: "core", label: "思绪沙漏核", series: "core", pal: 4, core: "hourglassCore" },
  { kind: "core", label: "趋势脉动核", series: "core", pal: 8, core: "neuralCore" },

  // Series 4: Role-Specialized AI Teammate Bots (#G061 - #G080)
  { kind: "bot", label: "架构师 Bot", series: "role", pal: 1, cfg: { shape: "squircle", top: "antenna", ears: "pods", expr: "code" } },
  { kind: "bot", label: "研究员 Bot", series: "role", pal: 7, cfg: { shape: "oval", top: "orbit", ears: "none", expr: "curious" } },
  { kind: "bot", label: "设计师 Bot", series: "role", pal: 6, cfg: { shape: "squircle", top: "leaf", ears: "pods", expr: "spark" } },
  { kind: "bot", label: "产品经理 Bot", series: "role", pal: 9, cfg: { shape: "oval", top: "halo", ears: "none", expr: "chain" } },
  { kind: "bot", label: "代码极客 Bot", series: "role", pal: 0, cfg: { shape: "squircle", top: "twin", ears: "headphones", expr: "code" } },
  { kind: "bot", label: "语音助手 Bot", series: "role", pal: 3, cfg: { shape: "oval", top: "none", ears: "headphones", expr: "wave" } },
  { kind: "bot", label: "数据分析 Bot", series: "role", pal: 4, cfg: { shape: "squircle", top: "antenna", ears: "pods", expr: "bars" } },
  { kind: "bot", label: "内容创作 Bot", series: "role", pal: 2, cfg: { shape: "oval", top: "leaf", ears: "wings", expr: "smile" } },
  { kind: "bot", label: "运维哨兵 Bot", series: "role", pal: 8, cfg: { shape: "squircle", top: "twin", ears: "pods", expr: "focus" } },
  { kind: "bot", label: "安全卫士 Bot", series: "role", pal: 5, cfg: { shape: "oval", top: "crown", ears: "pods", expr: "shield" } },
  { kind: "bot", label: "思考中枢 Bot", series: "role", pal: 9, cfg: { shape: "squircle", top: "halo", ears: "none", expr: "dots" } },
  { kind: "bot", label: "全栈搭档 Bot", series: "role", pal: 1, cfg: { shape: "oval", top: "antenna", ears: "headphones", expr: "pill" } },
  { kind: "bot", label: "测试质检 Bot", series: "role", pal: 0, cfg: { shape: "squircle", top: "fin", ears: "pods", expr: "wink" } },
  { kind: "bot", label: "创意总监 Bot", series: "role", pal: 6, cfg: { shape: "oval", top: "orbit", ears: "wings", expr: "heart" } },
  { kind: "bot", label: "财务精算 Bot", series: "role", pal: 7, cfg: { shape: "squircle", top: "none", ears: "pods", expr: "trend" } },
  { kind: "bot", label: "知识管家 Bot", series: "role", pal: 5, cfg: { shape: "oval", top: "halo", ears: "none", expr: "matrix" } },
  { kind: "bot", label: "前端像素 Bot", series: "role", pal: 3, cfg: { shape: "squircle", top: "twin", ears: "none", expr: "happy" } },
  { kind: "bot", label: "翻译专家 Bot", series: "role", pal: 2, cfg: { shape: "oval", top: "orbit", ears: "pods", expr: "wave" } },
  { kind: "bot", label: "营销增长 Bot", series: "role", pal: 4, cfg: { shape: "squircle", top: "crown", ears: "none", expr: "spark" } },
  { kind: "bot", label: "总控指挥 Bot", series: "role", pal: 8, cfg: { shape: "oval", top: "crown", ears: "pods", expr: "chain" } },

  // Series 5: Biomorphic Cyber-Cute Porcelain Bots (#G081 - #G100)
  { kind: "bot", label: "机械蓝猫", series: "biomorphic", pal: 1, cfg: { shape: "oval", ears: "cat", top: "none", expr: "happy" } },
  { kind: "bot", label: "机械白兔", series: "biomorphic", pal: 6, cfg: { shape: "oval", ears: "rabbit", top: "none", expr: "heart" } },
  { kind: "bot", label: "机械白熊", series: "biomorphic", pal: 8, cfg: { shape: "squircle", ears: "bear", top: "none", expr: "smile" } },
  { kind: "bot", label: "机械小狐", series: "biomorphic", pal: 2, cfg: { shape: "oval", ears: "cat", top: "none", expr: "wink", tinted: true } },
  { kind: "bot", label: "薄荷猫耳", series: "biomorphic", pal: 0, cfg: { shape: "squircle", ears: "cat", top: "antenna", expr: "spark" } },
  { kind: "bot", label: "星紫兔耳", series: "biomorphic", pal: 3, cfg: { shape: "capsule", ears: "rabbit", top: "none", expr: "happy", tinted: true } },
  { kind: "bot", label: "奶油熊耳", series: "biomorphic", pal: 4, cfg: { shape: "oval", ears: "bear", top: "halo", expr: "calm", tinted: true } },
  { kind: "bot", label: "青芽天使", series: "biomorphic", pal: 5, cfg: { shape: "oval", ears: "wings", top: "halo", expr: "smile" } },
  { kind: "bot", label: "樱花飞翼", series: "biomorphic", pal: 6, cfg: { shape: "capsule", ears: "wings", top: "leaf", expr: "heart", tinted: true } },
  { kind: "bot", label: "冰蓝猫耳", series: "biomorphic", pal: 7, cfg: { shape: "wide", ears: "cat", top: "none", expr: "pill" } },
  { kind: "bot", label: "晴空垂耳", series: "biomorphic", pal: 9, cfg: { shape: "oval", ears: "lop", top: "halo", expr: "curious" } },
  { kind: "bot", label: "银霜机熊", series: "biomorphic", pal: 8, cfg: { shape: "squircle", ears: "bear", top: "twin", expr: "focus" } },
  { kind: "bot", label: "薄荷精灵", series: "biomorphic", pal: 0, cfg: { shape: "oval", ears: "wings", top: "leaf", expr: "happy", tinted: true } },
  { kind: "bot", label: "白桃柴机", series: "biomorphic", pal: 2, cfg: { shape: "squircle", ears: "cat", top: "fin", expr: "smile" } },
  { kind: "bot", label: "芋泥萌熊", series: "biomorphic", pal: 3, cfg: { shape: "oval", ears: "bear", top: "crown", expr: "spark" } },
  { kind: "bot", label: "奶油兔灵", series: "biomorphic", pal: 4, cfg: { shape: "oval", ears: "rabbit", top: "none", expr: "wink", tinted: true } },
  { kind: "bot", label: "森系翼灵", series: "biomorphic", pal: 5, cfg: { shape: "capsule", ears: "wings", top: "antenna", expr: "dots" } },
  { kind: "bot", label: "冰川小猫", series: "biomorphic", pal: 7, cfg: { shape: "oval", ears: "cat", top: "none", expr: "happy", tinted: true } },
  { kind: "bot", label: "粉樱小熊", series: "biomorphic", pal: 6, cfg: { shape: "squircle", ears: "bear", top: "none", expr: "heart" } },
  { kind: "bot", label: "星河天马", series: "biomorphic", pal: 9, cfg: { shape: "oval", ears: "wings", top: "crown", expr: "spark", tinted: true } },
];

interface MythPal {
  bg1: string;
  bg2: string;
  ring: string;
  fg: string;
  sub: string;
  tint: string;
  glow: string;
}

const MP: Record<string, MythPal> = {
  celadon: { bg1: "#EDF7F3", bg2: "#C4E2D7", ring: "#7DB5A0", fg: "#164A3F", sub: "#3D8573", tint: "rgba(22,74,63,0.13)", glow: "#FFFFFF" },
  inkJade: { bg1: "#232B3A", bg2: "#101520", ring: "#6B82A6", fg: "#EEDBB2", sub: "#8FB8DE", tint: "rgba(238,219,178,0.15)", glow: "#EEDBB2" },
  moonWhite: { bg1: "#F8FAFD", bg2: "#DBE3F0", ring: "#9BAEC9", fg: "#1F314A", sub: "#52709B", tint: "rgba(31,49,74,0.11)", glow: "#FFFFFF" },
  cinnabar: { bg1: "#FDF2EE", bg2: "#F5CFC4", ring: "#D4816C", fg: "#8E291E", sub: "#C8523E", tint: "rgba(142,41,30,0.13)", glow: "#FFF8F5" },
  goldAmber: { bg1: "#FEF8EC", bg2: "#F6DFB0", ring: "#C89B45", fg: "#6B4610", sub: "#B88122", tint: "rgba(107,70,16,0.13)", glow: "#FFFDF7" },
  indigo: { bg1: "#EEF3FC", bg2: "#C7D6F0", ring: "#7894C9", fg: "#1A305D", sub: "#476AA8", tint: "rgba(26,48,93,0.13)", glow: "#FFFFFF" },
  lotus: { bg1: "#F7F1FB", bg2: "#DECFEF", ring: "#A488C4", fg: "#46286B", sub: "#7C5AA8", tint: "rgba(70,40,107,0.13)", glow: "#FFFFFF" },
  turquoise: { bg1: "#EBF8F9", bg2: "#BEE4EA", ring: "#68B0BC", fg: "#144C59", sub: "#368696", tint: "rgba(20,76,89,0.13)", glow: "#FFFFFF" },
  obsidian: { bg1: "#262B35", bg2: "#14171F", ring: "#7A8499", fg: "#F3F6FA", sub: "#A3B1C9", tint: "rgba(243,246,250,0.14)", glow: "#E2E8F0" },
  bamboo: { bg1: "#EFF8F0", bg2: "#C9E5CB", ring: "#7CB380", fg: "#1B4D25", sub: "#448750", tint: "rgba(27,77,37,0.13)", glow: "#FFFFFF" },
  peachMist: { bg1: "#FEF3F6", bg2: "#F6D0DC", ring: "#CF8AA1", fg: "#7A2543", sub: "#BA5779", tint: "rgba(122,37,67,0.13)", glow: "#FFFFFF" },
  bronze: { bg1: "#232D2A", bg2: "#131A18", ring: "#6B9184", fg: "#DCECE0", sub: "#7BB8A4", tint: "rgba(220,236,224,0.14)", glow: "#B8E0D2" },
};

function wrapMythSvg(pal: MythPal, motif: string, dark: boolean): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
    <defs>
      <radialGradient id="g" cx="30%" cy="20%" r="80%">
        <stop offset="0%" stop-color="${pal.bg1}"/>
        <stop offset="100%" stop-color="${pal.bg2}"/>
      </radialGradient>
      <linearGradient id="s" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.glow}" stop-opacity="${dark ? "0.18" : "0.65"}"/>
        <stop offset="55%" stop-color="${pal.glow}" stop-opacity="0"/>
      </linearGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="${dark ? "#000000" : pal.fg}" flood-opacity="${dark ? "0.4" : "0.14"}"/>
      </filter>
    </defs>
    <rect width="90" height="90" fill="url(#g)"/>
    <rect width="90" height="90" fill="url(#s)"/>
    <circle cx="45" cy="45" r="39" fill="none" stroke="${pal.ring}" stroke-width="1" stroke-opacity="${dark ? "0.35" : "0.42"}"/>
    <circle cx="45" cy="45" r="35.5" fill="none" stroke="${pal.ring}" stroke-width="0.7" stroke-opacity="${dark ? "0.22" : "0.28"}" stroke-dasharray="2.2 2.8"/>
    <g filter="url(#sh)" stroke-linecap="round" stroke-linejoin="round">${motif}</g>
  </svg>`;
}

interface MythSpec {
  label: string;
  slugBase: string;
  series: MythologyAvatarSeriesId;
  pal: MythPal;
  dark: boolean;
  draw: (p: MythPal) => string;
}

const MYTH_SPECS: readonly MythSpec[] = [
  // Series 1: 四象瑞兽 (#M01 - #M20)
  { label: "白泽", slugBase: "baize", series: "beasts", pal: MP.moonWhite!, dark: false, draw: (p) => `<path d="M27 34c-2-10 4-15 10-12 2 5 4 8 8 8s6-3 8-8c6-3 12 2 10 12" fill="none" stroke="${p.fg}" stroke-width="2.2"/><path d="M25 46c5-8 12-12 20-12s15 4 20 12c-5 8-12 12-20 12s-15-4-20-12Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="46" r="6.5" fill="${p.fg}"/><circle cx="45" cy="46" r="2.4" fill="${p.bg1}"/><path d="M35 64c4 3 16 3 20 0" fill="none" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "玄武", slugBase: "xuanwu", series: "beasts", pal: MP.inkJade!, dark: true, draw: (p) => `<polygon points="45,20 64,31 64,53 45,64 26,53 26,31" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><polygon points="45,29 56,35 56,49 45,55 34,49 34,35" fill="none" stroke="${p.sub}" stroke-width="1.8"/><path d="M23 59c9 9 35 9 44 0" fill="none" stroke="${p.fg}" stroke-width="2.2"/><path d="M45 20v9M64 31l-8 4M64 53l-8-4M45 64v-9M26 53l8-4M26 31l8 4" stroke="${p.sub}" stroke-width="1.4" opacity="0.85"/><circle cx="45" cy="42" r="3.4" fill="${p.fg}"/>` },
  { label: "青龙", slugBase: "qinglong", series: "beasts", pal: MP.celadon!, dark: false, draw: (p) => `<path d="M59 27a21 21 0 1 0 3 27c-5 4-13 3-16-2-3-5 1-11 7-11 4 0 6 3 5 6" fill="none" stroke="${p.fg}" stroke-width="2.6"/><path d="M29 36c3-7 10-11 18-10 7 1 11 5 12 9-4-2-9-2-13 1-5 3-7 9-5 15-7-2-14-7-12-15Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="1.8"/><circle cx="52" cy="45" r="4" fill="${p.fg}"/><circle cx="52" cy="45" r="1.5" fill="${p.bg1}"/><path d="M57 25l5-4M51 23l2-5" stroke="${p.sub}" stroke-width="1.9"/>` },
  { label: "朱雀", slugBase: "zhuque", series: "beasts", pal: MP.cinnabar!, dark: false, draw: (p) => `<path d="M45 22c4 6 4 12 0 18-4-6-4-12 0-18Z" fill="${p.fg}"/><path d="M45 41c-8-11-20-12-25-2 7 3 14 4 19 10-6 2-12 5-15 11 9 1 16-3 21-10 5 7 12 11 21 10-3-6-9-9-15-11 5-6 12-7 19-10-5-10-17-9-25 2Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2"/><path d="M45 48v20M40 64l5-6 5 6" fill="none" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "白虎", slugBase: "baihu", series: "beasts", pal: MP.obsidian!, dark: true, draw: (p) => `<path d="M25 28l6 11v17l14 11 14-11V39l6-11-13 5H38Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M38 39h14M45 33v13M34 48l6 2M56 48l-6 2" stroke="${p.fg}" stroke-width="2.1"/><path d="M39 58h12" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "麒麟", slugBase: "qilin", series: "beasts", pal: MP.goldAmber!, dark: false, draw: (p) => `<path d="M45 19l5 15c6 2 12 8 12 16 0 7-6 12-17 12S28 57 28 50c0-8 6-14 12-16Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M45 19l3 14h-6Z" fill="${p.fg}"/><path d="M24 62c5-4 10-4 14 0 4-4 10-4 14 0 4-4 9-4 14 0" fill="none" stroke="${p.sub}" stroke-width="2.2"/><path d="M38 46l7 6 7-6" fill="none" stroke="${p.fg}" stroke-width="2"/>` },
  { label: "鲲鹏", slugBase: "kunpeng", series: "beasts", pal: MP.indigo!, dark: false, draw: (p) => `<path d="M19 42c10-15 20-16 26-3 6-13 16-12 26 3-10-2-18 3-26 14-8-11-16-16-26-14Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M24 61c6-4 14-4 21 0 7-4 15-4 21 0" fill="none" stroke="${p.sub}" stroke-width="2.1"/><circle cx="45" cy="27" r="2.8" fill="${p.fg}"/>` },
  { label: "应龙", slugBase: "yinglong", series: "beasts", pal: MP.turquoise!, dark: false, draw: (p) => `<path d="M45 45c-9-13-19-16-25-9 3 9 11 14 19 15M45 45c9-13 19-16 25-9-3 9-11 14-19 15" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><polygon points="45,23 55,45 45,67 35,45" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="45" r="4.2" fill="${p.fg}"/>` },
  { label: "凤凰", slugBase: "fenghuang", series: "beasts", pal: MP.peachMist!, dark: false, draw: (p) => `<path d="M45 19c5 8 5 16 0 24-5-8-5-16 0-24Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2"/><path d="M45 43c-12-12-23-8-24 4 9 2 17 2 24 9 7-7 15-7 24-9-1-12-12-16-24-4Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M45 56v12M38 65l7-5 7 5" fill="none" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "青鸾", slugBase: "qingluan", series: "beasts", pal: MP.bamboo!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.6" stroke-dasharray="22 8"/><path d="M29 55c5-17 18-25 31-26-4 15-13 24-31 26Z" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2.2"/><path d="M29 55l20-16M41 55l11-4" stroke="${p.sub}" stroke-width="1.9"/>` },
  { label: "重明", slugBase: "chongming", series: "beasts", pal: MP.goldAmber!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="19" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="38.5" cy="45" r="5" fill="${p.fg}"/><circle cx="51.5" cy="45" r="5" fill="${p.fg}"/><circle cx="38.5" cy="45" r="1.8" fill="${p.bg1}"/><circle cx="51.5" cy="45" r="1.8" fill="${p.bg1}"/><path d="M45 19v5M45 66v5M19 45h5M66 45h5" stroke="${p.sub}" stroke-width="2.2"/>` },
  { label: "九尾", slugBase: "jiuwei", series: "beasts", pal: MP.lotus!, dark: false, draw: (p) => `<path d="M45 60c-17-2-24-15-20-28 9 4 15 13 20 28Z" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.9"/><path d="M45 60c17-2 24-15 20-28-9 4-15 13-20 28Z" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.9"/><path d="M45 60c-9-13-9-28 0-39 9 11 9 26 0 39Z" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2.3"/><circle cx="45" cy="63" r="3" fill="${p.fg}"/>` },
  { label: "白鹿", slugBase: "bailu", series: "beasts", pal: MP.celadon!, dark: false, draw: (p) => `<path d="M45 64V42M45 42c-9-4-14-12-14-21M45 42c9-4 14-12 14-21" fill="none" stroke="${p.fg}" stroke-width="2.3"/><path d="M34 32l-7-3M37 26l-5-6M56 32l7-3M53 26l5-6" stroke="${p.fg}" stroke-width="2"/><polygon points="45,42 52,51 45,60 38,51" fill="${p.tint}" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "玄鹤", slugBase: "xuanhe", series: "beasts", pal: MP.inkJade!, dark: true, draw: (p) => `<circle cx="45" cy="37" r="16" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.6"/><path d="M22 50c9-10 18-9 23 0 5-9 14-10 23 0" fill="none" stroke="${p.fg}" stroke-width="2.5"/><path d="M31 59c7-4 21-4 28 0" fill="none" stroke="${p.sub}" stroke-width="2"/><circle cx="45" cy="31" r="3.2" fill="${p.fg}"/>` },
  { label: "金乌", slugBase: "jinwu", series: "beasts", pal: MP.cinnabar!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="16.5" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M34 45c4-7 11-7 11-2 0-5 7-5 11 2-5 1-8 4-11 9-3-5-6-8-11-9Z" fill="${p.fg}"/><path d="M45 19v5M45 66v5M19 45h5M66 45h5M27 27l3.5 3.5M59.5 59.5l3.5 3.5M63 27l-3.5 3.5M30.5 59.5L27 63" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "玉兔", slugBase: "yutu", series: "beasts", pal: MP.moonWhite!, dark: false, draw: (p) => `<path d="M55 23a22 22 0 1 0 0 44 17 17 0 1 1 0-44Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><ellipse cx="48" cy="33" rx="2.4" ry="7" transform="rotate(-12 48 33)" fill="${p.fg}"/><ellipse cx="55" cy="34" rx="2.4" ry="7" transform="rotate(14 55 34)" fill="${p.fg}"/><circle cx="51" cy="47" r="7.5" fill="${p.fg}"/><circle cx="53.5" cy="45.5" r="1.5" fill="${p.bg1}"/>` },
  { label: "烛龙", slugBase: "zhulong", series: "beasts", pal: MP.bronze!, dark: true, draw: (p) => `<circle cx="45" cy="45" r="21" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M45 24a21 21 0 0 1 0 42 10.5 10.5 0 0 1 0-21 10.5 10.5 0 0 0 0-21Z" fill="${p.fg}" opacity="0.24"/><path d="M30 45c5-6.5 25-6.5 30 0-5 6.5-25 6.5-30 0Z" fill="${p.bg2}" stroke="${p.fg}" stroke-width="2.1"/><circle cx="45" cy="45" r="3.8" fill="${p.fg}"/>` },
  { label: "獬豸", slugBase: "xiezhi", series: "beasts", pal: MP.indigo!, dark: false, draw: (p) => `<polygon points="45,19 50,35 40,35" fill="${p.fg}"/><path d="M26 42h38M31 42l-5 15h10ZM59 42l-5 15h10Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2"/><path d="M45 35v29M35 64h20" stroke="${p.sub}" stroke-width="2.2"/>` },
  { label: "勾陈", slugBase: "gouchen", series: "beasts", pal: MP.goldAmber!, dark: false, draw: (p) => `<rect x="29" y="29" width="32" height="32" rx="4" transform="rotate(45 45 45)" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><rect x="34" y="34" width="22" height="22" rx="3" fill="${p.bg1}" stroke="${p.sub}" stroke-width="1.9"/><circle cx="45" cy="45" r="4.5" fill="${p.fg}"/>` },
  { label: "螣蛇", slugBase: "tengshe", series: "beasts", pal: MP.turquoise!, dark: false, draw: (p) => `<path d="M33 65c-8-10 12-16 12-23s-14-12-6-20c4-4 12-4 16 0" fill="none" stroke="${p.fg}" stroke-width="2.5"/><path d="M57 65c8-10-12-16-12-23s14-12 6-20c-4-4-12-4-16 0" fill="none" stroke="${p.sub}" stroke-width="2.2"/><polygon points="45,25 49,31 45,37 41,31" fill="${p.fg}"/>` },

  // Series 2: 星宿神明 (#M21 - #M40)
  { label: "紫微", slugBase: "ziwei", series: "celestial", pal: MP.lotus!, dark: false, draw: (p) => `<path d="M45 18l5 19 19 5-19 5-5 19-5-19-19-5 19-5Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="42" r="4.2" fill="${p.fg}"/><circle cx="28" cy="27" r="2.2" fill="${p.sub}"/><circle cx="62" cy="27" r="2.2" fill="${p.sub}"/><circle cx="62" cy="59" r="2.2" fill="${p.sub}"/>` },
  { label: "羲和", slugBase: "xihe", series: "celestial", pal: MP.goldAmber!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="13" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.3"/><circle cx="45" cy="45" r="22.5" fill="none" stroke="${p.sub}" stroke-width="1.7" stroke-dasharray="4 5"/><circle cx="45" cy="45" r="4.8" fill="${p.fg}"/><path d="M45 22v9M45 59v9M22 45h9M59 45h9" stroke="${p.fg}" stroke-width="2"/>` },
  { label: "望舒", slugBase: "wangshu", series: "celestial", pal: MP.inkJade!, dark: true, draw: (p) => `<path d="M53 23a22 22 0 1 0 0 44 17 17 0 1 1 0-44Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.3"/><path d="M55 36l2.2 5.5 5.5 2.2-5.5 2.2-2.2 5.5-2.2-5.5-5.5-2.2 5.5-2.2Z" fill="${p.fg}"/>` },
  { label: "太一", slugBase: "taiyi", series: "celestial", pal: MP.obsidian!, dark: true, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M45 23a11 11 0 0 1 0 22 11 11 0 0 0 0 22" fill="none" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="34" r="3.4" fill="${p.fg}"/><circle cx="45" cy="56" r="3.2" fill="none" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "北斗", slugBase: "beidou", series: "celestial", pal: MP.indigo!, dark: false, draw: (p) => `<polyline points="23,53 33,47 41,49 48,43 52,31 64,33 61,46 48,43" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.9"/><circle cx="23" cy="53" r="2.8" fill="${p.fg}"/><circle cx="33" cy="47" r="2.6" fill="${p.fg}"/><circle cx="41" cy="49" r="2.6" fill="${p.fg}"/><circle cx="48" cy="43" r="2.8" fill="${p.fg}"/><circle cx="52" cy="31" r="2.8" fill="${p.fg}"/><circle cx="64" cy="33" r="3.2" fill="${p.fg}"/><circle cx="61" cy="46" r="2.6" fill="${p.fg}"/>` },
  { label: "天枢", slugBase: "tianshu", series: "celestial", pal: MP.moonWhite!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="21" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.7"/><polygon points="45,21 50,40 69,45 50,50 45,69 40,50 21,45 40,40" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2"/><circle cx="45" cy="45" r="3.6" fill="${p.fg}"/>` },
  { label: "玉衡", slugBase: "yuheng", series: "celestial", pal: MP.celadon!, dark: false, draw: (p) => `<ellipse cx="45" cy="45" rx="25" ry="10.5" transform="rotate(-30 45 45)" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><ellipse cx="45" cy="45" rx="25" ry="10.5" transform="rotate(30 45 45)" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.9"/><circle cx="45" cy="45" r="4.8" fill="${p.fg}"/>` },
  { label: "瑶光", slugBase: "yaoguang", series: "celestial", pal: MP.peachMist!, dark: false, draw: (p) => `<path d="M45 19v52M19 45h52M27 27l36 36M63 27L27 63" stroke="${p.sub}" stroke-width="1.5" opacity="0.65"/><polygon points="45,26 51.5,38.5 64,45 51.5,51.5 45,64 38.5,51.5 26,45 38.5,38.5" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="45" r="3.4" fill="${p.fg}"/>` },
  { label: "伏羲", slugBase: "fuxi", series: "celestial", pal: MP.bronze!, dark: true, draw: (p) => `<polygon points="45,20 63,27 70,45 63,63 45,70 27,63 20,45 27,27" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M35 38h20M35 45h8M47 45h8M35 52h20" stroke="${p.fg}" stroke-width="2.6"/>` },
  { label: "女娲", slugBase: "nuwa", series: "celestial", pal: MP.peachMist!, dark: false, draw: (p) => `<path d="M45 20l19 11v21L45 68 26 52V31Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M45 20v48M26 31l38 21M64 31L26 52" stroke="${p.sub}" stroke-width="1.5" opacity="0.7"/><circle cx="45" cy="44" r="4.2" fill="${p.fg}"/>` },
  { label: "句芒", slugBase: "goumang", series: "celestial", pal: MP.bamboo!, dark: false, draw: (p) => `<path d="M45 66V31" stroke="${p.fg}" stroke-width="2.4"/><path d="M45 48c-14-1-19-10-15-19 11 0 17 7 15 19Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M45 42c13-2 18-10 14-19-10 1-15 7-14 19Z" fill="${p.tint}" stroke="${p.sub}" stroke-width="2.1"/><circle cx="45" cy="24" r="3" fill="${p.fg}"/>` },
  { label: "祝融", slugBase: "zhurong", series: "celestial", pal: MP.cinnabar!, dark: false, draw: (p) => `<path d="M45 19c12 12 18 21 18 31a18 18 0 0 1-36 0c0-10 6-19 18-31Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.3"/><path d="M45 36c6 6 9 11 9 16a9 9 0 0 1-18 0c0-5 3-10 9-16Z" fill="${p.bg1}" stroke="${p.sub}" stroke-width="2"/><circle cx="45" cy="53" r="2.8" fill="${p.fg}"/>` },
  { label: "玄冥", slugBase: "xuanming", series: "celestial", pal: MP.indigo!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="21" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.4" opacity="0.7"/><path d="M24 37c6-5 10-5 15 0s10 5 15 0 9-5 12 0" fill="none" stroke="${p.sub}" stroke-width="2.1"/><path d="M22 46c6-5 11-5 16 0s11 5 16 0 10-5 14 0" fill="none" stroke="${p.fg}" stroke-width="2.5"/><path d="M26 55c5-4 10-4 14 0s9 4 14 0 8-4 10 0" fill="none" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "蓐收", slugBase: "rushou", series: "celestial", pal: MP.goldAmber!, dark: false, draw: (p) => `<path d="M35 22v46" stroke="${p.fg}" stroke-width="2.5"/><path d="M35 27c16 0 26 7 26 18s-10 18-26 18c9-5 13-11 13-18s-4-13-13-18Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="53" cy="45" r="3" fill="${p.sub}"/>` },
  { label: "后土", slugBase: "houtu", series: "celestial", pal: MP.bronze!, dark: true, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.9"/><rect x="31" y="31" width="28" height="28" rx="3" fill="${p.bg2}" stroke="${p.fg}" stroke-width="2.3"/><path d="M37 45h16M45 37v16" stroke="${p.fg}" stroke-width="2.1"/>` },
  { label: "少昊", slugBase: "shaohao", series: "celestial", pal: MP.moonWhite!, dark: false, draw: (p) => `<polygon points="45,21 66,58 24,58" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M33 58l12-20 12 20" fill="${p.bg1}" stroke="${p.sub}" stroke-width="2"/><circle cx="45" cy="52" r="3.6" fill="${p.fg}"/>` },
  { label: "风伯", slugBase: "fengbo", series: "celestial", pal: MP.turquoise!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="20" fill="${p.tint}" opacity="0.65"/><path d="M23 39h30a7 7 0 1 0-7-7" fill="none" stroke="${p.fg}" stroke-width="2.4"/><path d="M20 48h42a6 6 0 1 1-6 6" fill="none" stroke="${p.sub}" stroke-width="2.3"/><path d="M27 57h18" stroke="${p.fg}" stroke-width="2.2"/>` },
  { label: "雨师", slugBase: "yushi", series: "celestial", pal: MP.celadon!, dark: false, draw: (p) => `<path d="M24 46c0-6 5-10 11-10 2-6 8-10 14-9 6 1 10 5 10 10 5 1 8 4 8 9 0 5-4 8-10 8H33c-5 0-9-3-9-8Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M33 46c3-4 9-4 12 0M47 46c2-3 7-3 9 0" fill="none" stroke="${p.sub}" stroke-width="1.8"/><path d="M35 60l-2 6M45 60l-2 7M55 60l-2 6" stroke="${p.fg}" stroke-width="2.3"/>` },
  { label: "雷公", slugBase: "leigong", series: "celestial", pal: MP.inkJade!, dark: true, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.7" stroke-dasharray="10 6"/><polygon points="49,21 32,47 45,47 40,69 59,41 46,41" fill="${p.fg}" stroke="${p.fg}" stroke-width="1.5"/>` },
  { label: "织女", slugBase: "zhinv", series: "celestial", pal: MP.lotus!, dark: false, draw: (p) => `<path d="M22 45c11-12 35-12 46 0-11 12-35 12-46 0Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M31 31l28 28M59 31L31 59" stroke="${p.sub}" stroke-width="1.7"/><circle cx="45" cy="45" r="4" fill="${p.fg}"/>` },

  // Series 3: 仙山神器 (#M41 - #M60)
  { label: "昆仑", slugBase: "kunlun", series: "realms", pal: MP.moonWhite!, dark: false, draw: (p) => `<path d="M19 60l15-24 10 14 12-23 15 33Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M34 36l4 6M56 27l-4 8M24 66h42" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "蓬莱", slugBase: "penglai", series: "realms", pal: MP.celadon!, dark: false, draw: (p) => `<path d="M23 52c8-19 36-19 44 0Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M35 46l10-18 10 18" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2"/><path d="M22 60c8-4 15 4 23 0s15 4 23 0" fill="none" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "瀛洲", slugBase: "yingzhou", series: "realms", pal: MP.turquoise!, dark: false, draw: (p) => `<circle cx="45" cy="33" r="8" fill="${p.tint}" stroke="${p.sub}" stroke-width="2"/><path d="M21 52c9-11 18-11 24 0 6-11 15-11 24 0Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M25 61c7-4 13 3 20 0s13 3 20 0" fill="none" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "扶桑", slugBase: "fusang", series: "realms", pal: MP.cinnabar!, dark: false, draw: (p) => `<circle cx="45" cy="36" r="14" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.8"/><path d="M45 66V34M45 53c-9-1-15-6-17-12M45 48c9-1 15-6 17-12M45 41c-6-2-10-5-11-9M45 41c6-2 10-5 11-9M31 66h28" fill="none" stroke="${p.fg}" stroke-width="2.2"/>` },
  { label: "建木", slugBase: "jianmu", series: "realms", pal: MP.bamboo!, dark: false, draw: (p) => `<polygon points="45,20 59,64 31,64" fill="${p.tint}"/><path d="M45 21v46M31 34h28M26 46h38M33 58h24" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="21" r="3.4" fill="${p.fg}"/><circle cx="31" cy="34" r="2.2" fill="${p.sub}"/><circle cx="59" cy="34" r="2.2" fill="${p.sub}"/>` },
  { label: "瑶池", slugBase: "yaochi", series: "realms", pal: MP.peachMist!, dark: false, draw: (p) => `<path d="M45 22c6 9 6 20 0 29-6-9-6-20 0-29Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M45 51c-11-4-18-11-17-21 9 2 15 10 17 21Z" fill="${p.tint}" stroke="${p.sub}" stroke-width="2"/><path d="M45 51c11-4 18-11 17-21-9 2-15 10-17 21Z" fill="${p.tint}" stroke="${p.sub}" stroke-width="2"/><path d="M25 60c8 4 32 4 40 0" fill="none" stroke="${p.fg}" stroke-width="2.1"/>` },
  { label: "归墟", slugBase: "guixu", series: "realms", pal: MP.inkJade!, dark: true, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.6" stroke-dasharray="16 6"/><circle cx="45" cy="45" r="15" fill="none" stroke="${p.fg}" stroke-width="2" stroke-dasharray="18 5" transform="rotate(40 45 45)"/><circle cx="45" cy="45" r="8.5" fill="none" stroke="${p.fg}" stroke-width="2.2" stroke-dasharray="14 4" transform="rotate(110 45 45)"/><circle cx="45" cy="45" r="3.4" fill="${p.fg}"/>` },
  { label: "青丘", slugBase: "qingqiu", series: "realms", pal: MP.lotus!, dark: false, draw: (p) => `<circle cx="57" cy="30" r="6.5" fill="${p.tint}" stroke="${p.sub}" stroke-width="2"/><path d="M20 59c8-20 21-22 29-4 6-12 15-11 21 4Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/>` },
  { label: "不周", slugBase: "buzhou", series: "realms", pal: MP.obsidian!, dark: true, draw: (p) => `<path d="M35 22h20v46H35Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M27 22h36M27 68h36M35 37l20-5M35 53l20-5" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "凌霄", slugBase: "lingxiao", series: "realms", pal: MP.indigo!, dark: false, draw: (p) => `<path d="M20 40c8-2 17-7 25-15 8 8 17 13 25 15H20Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M26 52c7-1 14-5 19-10 5 5 12 9 19 10H26Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2"/><path d="M34 52v11M56 52v11M26 63h38" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "玄圃", slugBase: "xuanpu", series: "realms", pal: MP.celadon!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="21" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.3"/><circle cx="45" cy="45" r="9.5" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2.2"/><path d="M45 24v11.5M45 54.5V66M24 45h11.5M54.5 45H66" stroke="${p.sub}" stroke-width="1.9"/>` },
  { label: "南溟", slugBase: "nanming", series: "realms", pal: MP.indigo!, dark: false, draw: (p) => `<path d="M21 50c6-13 18-17 29-11 6 3 9 10 3 14-5 4-11 1-10-5" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.4"/><path d="M21 61c9-5 18 4 27 0s14 3 20-1" fill="none" stroke="${p.sub}" stroke-width="2.2"/>` },
  { label: "太虚", slugBase: "taixu", series: "realms", pal: MP.inkJade!, dark: true, draw: (p) => `<ellipse cx="45" cy="45" rx="24" ry="11" fill="${p.tint}" stroke="${p.sub}" stroke-width="1.9"/><ellipse cx="45" cy="45" rx="11" ry="24" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="45" r="4.2" fill="${p.fg}"/>` },
  { label: "轩辕", slugBase: "xuanyuan", series: "realms", pal: MP.goldAmber!, dark: false, draw: (p) => `<path d="M45 18l5.5 11v27h-11V29Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M32 56h26M45 56v12M40 68h10M45 26v26" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "东皇", slugBase: "donghuang", series: "realms", pal: MP.bronze!, dark: true, draw: (p) => `<path d="M31 58V40a14 14 0 0 1 28 0v18Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.3"/><path d="M27 58h36M45 21v5M38 44h14M38 51h14M45 58v8" stroke="${p.sub}" stroke-width="2"/>` },
  { label: "乾坤", slugBase: "qiankun", series: "realms", pal: MP.moonWhite!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><polygon points="45,27 61,45 45,63 29,45" fill="${p.bg1}" stroke="${p.sub}" stroke-width="1.9"/><circle cx="45" cy="45" r="5" fill="${p.fg}"/><circle cx="45" cy="45" r="1.8" fill="${p.bg1}"/>` },
  { label: "昊天", slugBase: "haotian", series: "realms", pal: MP.goldAmber!, dark: false, draw: (p) => `<path d="M45 19l14 14H31ZM34 33h22l4 14H30ZM30 47h30l5 16H25Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.1"/><path d="M45 19v44" stroke="${p.sub}" stroke-width="1.6" opacity="0.75"/>` },
  { label: "神农", slugBase: "shennong", series: "realms", pal: MP.bamboo!, dark: false, draw: (p) => `<path d="M29 34h32v10c0 9-7 15-16 15s-16-6-16-15Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.3"/><path d="M27 34v-6a3 3 0 0 1 6 0v6M57 34v-6a3 3 0 0 1 6 0v6" fill="none" stroke="${p.fg}" stroke-width="2.1"/><path d="M35 42h20M35 58l-3 9M55 58l3 9M45 59v8" stroke="${p.sub}" stroke-width="2.1"/>` },
  { label: "瑶琴", slugBase: "yaoqin", series: "realms", pal: MP.lotus!, dark: false, draw: (p) => `<path d="M34 22h22l-2.5 46h-17Z" fill="${p.tint}" stroke="${p.fg}" stroke-width="2.2"/><path d="M41 26v38M45 26v38M49 26v38" stroke="${p.sub}" stroke-width="1.6"/><path d="M32 34h26" stroke="${p.fg}" stroke-width="2.1"/>` },
  { label: "玉璧", slugBase: "yubi", series: "realms", pal: MP.celadon!, dark: false, draw: (p) => `<circle cx="45" cy="45" r="22" fill="${p.tint}" stroke="${p.fg}" stroke-width="3"/><circle cx="45" cy="45" r="9.5" fill="${p.bg1}" stroke="${p.fg}" stroke-width="2.2"/><circle cx="45" cy="45" r="15.5" fill="none" stroke="${p.sub}" stroke-width="1.3" stroke-dasharray="3 3"/>` },
];

export const AGENT_AVATAR_PRESETS: readonly AgentAvatarPreset[] = AGENT_SPECS.map((spec, idx) => {
  const id = `G${String(idx + 1).padStart(3, "0")}`;
  return {
    id,
    value: `${AGENT_PRESET_PREFIX}${id}`,
    label: spec.label,
    series: spec.series,
  };
});

export const MYTHOLOGY_AVATAR_PRESETS: readonly MythologyAvatarPreset[] = MYTH_SPECS.map((spec, idx) => {
  const id = `M${String(idx + 1).padStart(2, "0")}`;
  return {
    id,
    value: `${MYTHOLOGY_PRESET_PREFIX}${id}`,
    label: spec.label,
    slugBase: spec.slugBase,
    series: spec.series,
  };
});

const agentByValue = new Map<string, { preset: AgentAvatarPreset; spec: AgentSpec }>();
AGENT_AVATAR_PRESETS.forEach((preset, i) => {
  agentByValue.set(preset.value, { preset, spec: AGENT_SPECS[i]! });
});

const mythByValue = new Map<string, { preset: MythologyAvatarPreset; spec: MythSpec }>();
const mythBySlug = new Map<string, MythologyAvatarPreset>();
MYTHOLOGY_AVATAR_PRESETS.forEach((preset, i) => {
  mythByValue.set(preset.value, { preset, spec: MYTH_SPECS[i]! });
  mythBySlug.set(preset.slugBase, preset);
});

const dataUriCache = new Map<string, string>();

function encodeSvgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

export type ParsedPresetAvatar =
  | { kind: "brand"; value: string; label: string }
  | { kind: "agent"; preset: AgentAvatarPreset }
  | { kind: "myth"; preset: MythologyAvatarPreset };

export function isBrandThinkingAvatar(value?: string | null): boolean {
  return value?.trim() === THINKING_BRAND_AVATAR;
}

export function parsePresetAvatar(value?: string | null): ParsedPresetAvatar | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed === THINKING_BRAND_AVATAR) {
    return { kind: "brand", value: THINKING_BRAND_AVATAR, label: "Thinking" };
  }
  const agent = agentByValue.get(trimmed);
  if (agent) return { kind: "agent", preset: agent.preset };
  const myth = mythByValue.get(trimmed);
  if (myth) return { kind: "myth", preset: myth.preset };
  return null;
}

export function getPresetAvatarDataUri(value?: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const cached = dataUriCache.get(trimmed);
  if (cached) return cached;

  const agent = agentByValue.get(trimmed);
  if (agent) {
    const pal = AGENT_PAL[agent.spec.pal]!;
    const svg =
      agent.spec.kind === "bot"
        ? drawCeramicBotSvg(pal, agent.spec.cfg)
        : drawAICoreSvg(pal, agent.spec.core);
    const uri = encodeSvgDataUri(svg);
    dataUriCache.set(trimmed, uri);
    return uri;
  }

  const myth = mythByValue.get(trimmed);
  if (myth) {
    const svg = wrapMythSvg(myth.spec.pal, myth.spec.draw(myth.spec.pal), myth.spec.dark);
    const uri = encodeSvgDataUri(svg);
    dataUriCache.set(trimmed, uri);
    return uri;
  }

  return null;
}

export function findMythologyPresetBySlug(slugBase: string): MythologyAvatarPreset {
  const direct = mythBySlug.get(slugBase);
  if (direct) return direct;
  // Deterministic thematic hash into our 60 mythology emblems
  let hash = 0;
  for (let i = 0; i < slugBase.length; i += 1) {
    hash = (hash * 31 + slugBase.charCodeAt(i)) >>> 0;
  }
  return MYTHOLOGY_AVATAR_PRESETS[hash % MYTHOLOGY_AVATAR_PRESETS.length]!;
}

export function pickRandomAgentPreset(excludeValue?: string | null): AgentAvatarPreset {
  const pool = excludeValue
    ? AGENT_AVATAR_PRESETS.filter((item) => item.value !== excludeValue)
    : AGENT_AVATAR_PRESETS;
  return pool[Math.floor(Math.random() * pool.length)] ?? AGENT_AVATAR_PRESETS[0]!;
}

export function pickRandomMythologyPreset(excludeValue?: string | null): MythologyAvatarPreset {
  const pool = excludeValue
    ? MYTHOLOGY_AVATAR_PRESETS.filter((item) => item.value !== excludeValue)
    : MYTHOLOGY_AVATAR_PRESETS;
  return pool[Math.floor(Math.random() * pool.length)] ?? MYTHOLOGY_AVATAR_PRESETS[0]!;
}
