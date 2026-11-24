export const WORKSTACK_BACKGROUND = "#173b37";
export const WORKSTACK_ACCENT = "#9ee2cb";
export const WORKSTACK_FOREGROUND = "#f0f8f4";
export const WORKSTACK_BARS = "M24 53h12v25H24zM44 42h12v36H44z";
export const WORKSTACK_TALL_BAR = "M64 28h12v50H64z";

export function workstackIconSvg(size = 100) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}"><rect width="100" height="100" rx="22.5" fill="${WORKSTACK_BACKGROUND}"/><path d="${WORKSTACK_BARS}" fill="${WORKSTACK_ACCENT}"/><path d="${WORKSTACK_TALL_BAR}" fill="${WORKSTACK_FOREGROUND}"/></svg>`;
}
