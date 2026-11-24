export const WORKSTACK_BACKGROUND = "#212038";
export const WORKSTACK_ACCENT = "#bcb0ff";
export const WORKSTACK_FOREGROUND = "#fff4de";
export const WORKSTACK_BRANCHES = "M48 51C38 47 33 40 30 31M48 51C48 39 54 29 63 23M48 51C61 49 69 49 78 54M48 51C58 59 61 67 63 77M48 51C39 58 32 63 23 65";
export const WORKSTACK_NODES = "M30 25a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM63 17a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM78 48a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM63 71a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM23 59a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM48 42a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z";

export function workstackIconSvg(size = 100) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}"><rect width="100" height="100" rx="22.5" fill="${WORKSTACK_BACKGROUND}"/><path d="${WORKSTACK_BRANCHES}" fill="none" stroke="${WORKSTACK_ACCENT}" stroke-width="5" stroke-linecap="round"/><path d="${WORKSTACK_NODES}" fill="${WORKSTACK_FOREGROUND}"/></svg>`;
}
