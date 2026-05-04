import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('design system ethos documents token-first maintenance rules', async () => {
  const ethos = await readFile(new URL('../ethos.md', import.meta.url), 'utf8');

  assert.match(ethos, /Build from foundations first/);
  assert.match(ethos, /Dark mode is not an afterthought/);
  assert.match(ethos, /Data visualization needs semantic tokens/);
  assert.match(ethos, /Do not fix previews with selector overrides/);
  assert.match(ethos, /Test every meaningful change/);
});
