import { chromium } from "@playwright/test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { workstackIconSvg } from "../../packages/ui/lib/workstack-brand.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const temporary = await mkdtemp(join(tmpdir(), "workstack-icons-"));
const browser = await chromium.launch({ channel: process.env.BRAND_BROWSER_CHANNEL || "chrome" });
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  async function png(relative, size, margin = 0) {
    const path = join(root, relative);
    await mkdir(dirname(path), { recursive: true });
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(`<style>*{margin:0}body{background:transparent;padding:${margin}px}svg{display:block}</style>${workstackIconSvg(size - margin * 2)}`);
    await page.screenshot({ path, omitBackground: true });
  }
  await writeFile(join(root, "apps/web/public/workstack.svg"), workstackIconSvg() + "\n");
  for (const size of [16, 24, 32, 48, 64, 128, 256, 512, 1024]) {
    await png(`apps/desktop/build/icons/${size}x${size}.png`, size, Math.round(size * 0.1));
  }
  for (const path of ["apps/desktop/build/icon.png", "apps/desktop/resources/icon.png"]) await png(path, 1024, 100);
  for (const [name, size] of [["icon-192", 192], ["icon-512", 512], ["apple-touch-icon", 180], ["icon-maskable-512", 512]]) {
    await png(`apps/web/public/icons/${name}.png`, size);
  }
  if (process.platform === "darwin") {
    const iconset = join(temporary, "workstack.iconset");
    await mkdir(iconset);
    for (const size of [16, 32, 128, 256, 512]) {
      for (const scale of [1, 2]) {
        execFileSync("sips", ["-z", String(size * scale), String(size * scale), join(root, "apps/desktop/build/icon.png"), "--out", join(iconset, `icon_${size}x${size}${scale === 2 ? "@2x" : ""}.png`)], { stdio: "ignore" });
      }
    }
    execFileSync("iconutil", ["-c", "icns", iconset, "-o", join(root, "apps/desktop/build/icon.icns")]);
  }
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const images = await Promise.all(sizes.map(size => readFile(join(root, `apps/desktop/build/icons/${size}x${size}.png`))));
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
  console.log("Generated Workstack desktop and web icons.");
} finally {
  await browser.close();
  await rm(temporary, { recursive: true, force: true });
}
