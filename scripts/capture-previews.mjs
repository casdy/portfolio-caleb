/**
 * Puppeteer screenshot script for project preview images.
 * 
 * Usage:  node scripts/capture-previews.mjs
 * 
 * Saves screenshots to public/previews/ as PNG files.
 * These are served as static assets by Vite and used
 * in the project modal's Preview tab.
 */

import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, '..', 'public', 'previews');

/** Sites to screenshot. Key = filename (without extension), Value = URL */
const SITES = {
  'wedaforecast':           'https://wedaforecast.vercel.app',
  'geopol':                 'https://geopol.caleblabs.pro',
  'planr':                  'https://planr.caleblabs.pro',
  'password-generator-eng': 'https://password-generator-eng.vercel.app/',
};

const VIEWPORT = { width: 1280, height: 800, deviceScaleFactor: 2 };
const WAIT_AFTER_LOAD_MS = 3000; // Wait for JS rendering / animations

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log('🚀  Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const [name, url] of Object.entries(SITES)) {
    const outPath = resolve(OUTPUT_DIR, `${name}.png`);
    console.log(`📸  Capturing ${name} → ${url}`);

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Extra wait for client-side rendering / animations
      await new Promise(r => setTimeout(r, WAIT_AFTER_LOAD_MS));
      await page.screenshot({ path: outPath, type: 'png', fullPage: false });
      console.log(`   ✅  Saved ${outPath}`);
    } catch (err) {
      console.error(`   ❌  Failed to capture ${name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🎉  Done! Screenshots saved to public/previews/');
}

main().catch(console.error);
