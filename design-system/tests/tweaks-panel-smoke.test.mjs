import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('design system loads the tweak scripts', async () => {
  const html = await readFile(new URL('../previews/fragmatic-design-system.html', import.meta.url), 'utf8');

  assert.match(html, /src="\.\.\/tools\/tweaks-panel\.jsx\?v=dark-contrast"/);
  assert.match(html, /src="\.\.\/tools\/tweaks\.jsx\?v=dark-contrast"/);
});

test('tweaks panel has a standalone browser launcher', async () => {
  const panel = await readFile(new URL('../tools/tweaks-panel.jsx', import.meta.url), 'utf8');

  assert.match(panel, /\.twk-launch/);
  assert.match(panel, /className="twk-launch"/);
  assert.match(panel, /onClick=\{\(\) => setOpen\(true\)\}/);
});

test('canvas surface is the default tweak surface', async () => {
  const tweaks = await readFile(new URL('../tools/tweaks.jsx', import.meta.url), 'utf8');

  assert.match(tweaks, /"surface":\s*"canvas"/);
  assert.match(tweaks, /canvas:\s*\{[\s\S]*?pageBg:\s*"#f6f3ec"/);
  assert.match(tweaks, /canvas:\s*\{[\s\S]*?cardBg:\s*"#fdfaf3"/);
  assert.match(tweaks, /applyTweaks\(TWEAK_DEFAULTS\)/);
});

test('design system has token-driven sidebar navigation', async () => {
  const html = await readFile(new URL('../previews/fragmatic-design-system.html', import.meta.url), 'utf8');

  assert.match(html, /<aside class="ds-sidebar"/);
  assert.match(html, /href="#components"/);
  assert.match(html, /background: var\(--emerald-50\)/);
  assert.match(html, /<section class="section" id="patterns">/);
});
