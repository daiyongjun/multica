import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { thinkingIconSvg } from "../../packages/ui/lib/workstack-brand.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const browser = await chromium.launch({ channel: process.env.BRAND_BROWSER_CHANNEL || "chrome" });

async function buildIcns(sizePngPaths) {
  const icnsEntries = await Promise.all(
    sizePngPaths.map(async ([type, path]) => {
      const image = await readFile(path);
      const header = Buffer.alloc(8);
      header.write(type);
      header.writeUInt32BE(image.length + header.length, 4);
      return Buffer.concat([header, image]);
    }),
  );
  const icnsHeader = Buffer.alloc(8);
  icnsHeader.write("icns");
  icnsHeader.writeUInt32BE(8 + icnsEntries.reduce((length, entry) => length + entry.length, 0), 4);
  return Buffer.concat([icnsHeader, ...icnsEntries]);
}

try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  async function png(relative, size, variant = "dark", margin = 0) {
    const path = join(root, relative);
    await mkdir(dirname(path), { recursive: true });
    await page.setViewportSize({ width: size, height: size });
    const shadow =
      variant === "light"
        ? "filter:drop-shadow(0 12px 22px rgba(30,37,71,0.18))"
        : "filter:drop-shadow(0 14px 24px rgba(0,0,0,0.42))";
    await page.setContent(
      `<style>*{margin:0}body{background:transparent;padding:${margin}px}svg{display:block;${margin > 0 ? shadow : ""}}</style>${thinkingIconSvg(size - margin * 2, variant)}`,
    );
    await page.screenshot({ path, omitBackground: true });
  }

  // Export vector brand marks (light & dark)
  await writeFile(join(root, "apps/web/public/workstack.svg"), thinkingIconSvg(100, "dark") + "\n");
  await writeFile(join(root, "apps/web/public/thinking-dark.svg"), thinkingIconSvg(100, "dark") + "\n");
  await writeFile(join(root, "apps/web/public/thinking-light.svg"), thinkingIconSvg(100, "light") + "\n");

  // Render full hicolor set (dark flagship default + light variant for icns)
  for (const size of [16, 24, 32, 48, 64, 128, 256, 512, 1024]) {
    const margin = Math.round(size * 0.1);
    await png(`apps/desktop/build/icons/${size}x${size}.png`, size, "dark", margin);
    if ([32, 64, 128, 256, 512, 1024].includes(size)) {
      await png(`apps/desktop/build/icons-light/${size}x${size}.png`, size, "light", margin);
    }
  }

  // High-res macOS Dock & build icons (both Light & Dark bundled into resources/)
  await png("apps/desktop/build/icon.png", 1024, "dark", 100);
  await png("apps/desktop/build/icon-dark.png", 1024, "dark", 100);
  await png("apps/desktop/build/icon-light.png", 1024, "light", 100);
  await png("apps/desktop/resources/icon.png", 1024, "dark", 100);
  await png("apps/desktop/resources/icon-dark.png", 1024, "dark", 100);
  await png("apps/desktop/resources/icon-light.png", 1024, "light", 100);

  // Web PWA icons
  for (const [name, size] of [
    ["icon-192", 192],
    ["icon-512", 512],
    ["apple-touch-icon", 180],
    ["icon-maskable-512", 512],
  ]) {
    await png(`apps/web/public/icons/${name}.png`, size, "dark");
  }

  const icnsMap = [
    ["icp5", 32],
    ["icp6", 64],
    ["ic07", 128],
    ["ic08", 256],
    ["ic09", 512],
    ["ic10", 1024],
  ];

  // Build dark flagship icon.icns + icon-dark.icns + icon-light.icns
  const darkIcns = await buildIcns(
    icnsMap.map(([type, size]) => [type, join(root, `apps/desktop/build/icons/${size}x${size}.png`)]),
  );
  const lightIcns = await buildIcns(
    icnsMap.map(([type, size]) => [type, join(root, `apps/desktop/build/icons-light/${size}x${size}.png`)]),
  );
  await writeFile(join(root, "apps/desktop/build/icon.icns"), darkIcns);
  await writeFile(join(root, "apps/desktop/build/icon-dark.icns"), darkIcns);
  await writeFile(join(root, "apps/desktop/build/icon-light.icns"), lightIcns);

  // Build Windows icon.ico
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const images = await Promise.all(sizes.map((size) => readFile(join(root, `apps/desktop/build/icons/${size}x${size}.png`))));
  const directory = Buffer.alloc(6 + sizes.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(sizes.length, 4);
  let offset = directory.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    directory[entry] = directory[entry + 1] = sizes[index] % 256;
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(image.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  await writeFile(join(root, "apps/desktop/build/icon.ico"), Buffer.concat([directory, ...images]));
  console.log("Generated Thinking Light + Dark desktop and web icons.");
} finally {
  await browser.close();
}
