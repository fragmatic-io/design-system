import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const hexToRgb = (hex) => {
  const value = hex.replace('#', '');
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
};

const channel = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const lighter = Math.max(luminance(a), luminance(b));
  const darker = Math.min(luminance(a), luminance(b));
  return (lighter + 0.05) / (darker + 0.05);
};

const getDarkToken = (css, token) => {
  const darkBlock = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
  const match = darkBlock.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`));
  return match?.[1];
};

test('dark mode semantic text tokens meet readable contrast', async () => {
  const css = await readFile(new URL('../tokens/tokens.css', import.meta.url), 'utf8');
  const pageBg = getDarkToken(css, '--page-bg');
  const cardBg = getDarkToken(css, '--card-bg');
  const title = getDarkToken(css, '--gray-900');
  const body = getDarkToken(css, '--gray-700');
  const meta = getDarkToken(css, '--gray-600');
  const caption = getDarkToken(css, '--gray-500');
  const active = getDarkToken(css, '--emerald-800');

  assert.ok(contrast(title, pageBg) >= 12, 'title should strongly contrast on dark page');
  assert.ok(contrast(body, cardBg) >= 8, 'body text should contrast on dark cards');
  assert.ok(contrast(meta, cardBg) >= 6, 'metadata should remain readable on dark cards');
  assert.ok(contrast(caption, cardBg) >= 4.5, 'caption text should meet AA on dark cards');
  assert.ok(contrast(active, cardBg) >= 6, 'active emerald text should be readable on dark cards');
});

test('tweaks panel has theme-aware dark styles', async () => {
  const panel = await readFile(new URL('../tools/tweaks-panel.jsx', import.meta.url), 'utf8');
  const tweaks = await readFile(new URL('../tools/tweaks.jsx', import.meta.url), 'utf8');

  assert.match(panel, /:root\[data-theme="dark"\] \.twk-panel/);
  assert.match(panel, /var\(--text-title/);
  assert.match(tweaks, /t\.dark \? 'var\(--text-caption\)'/);
  assert.match(tweaks, /r\.setProperty\("--emerald-800", temp\[300\]\)/);
  assert.match(tweaks, /alpha\(temp\[500\], 0\.14\)/);
});
