import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('design system ethos documents token-first maintenance rules', async () => {
  const ethos = await readFile(new URL('../ethos.md', import.meta.url), 'utf8');

  assert.match(ethos, /Build from foundations first/);
  assert.match(ethos, /Dark mode is not an afterthought/);
  assert.match(ethos, /Data visualization needs semantic tokens/);
  assert.match(ethos, /Icons live in the icon foundation/);
  assert.match(ethos, /components\/atoms\/icons\.js/);
  assert.match(ethos, /Logos live in the brand foundation/);
  assert.match(ethos, /components\/brand/);
  assert.match(ethos, /Forms are foundation primitives/);
  assert.match(ethos, /field rows, and field groups/);
  assert.match(ethos, /Dropdowns are foundation primitives/);
  assert.match(ethos, /DropdownMenu/);
  assert.match(ethos, /Compose repeated UI from foundation-backed data/);
  assert.match(ethos, /named data map or component contract/);
  assert.match(ethos, /App surfaces choose documented container variants/);
  assert.match(ethos, /full` container for dense workspaces/);
  assert.match(ethos, /narrow` container for settings or forms/);
  assert.match(ethos, /Do not fix previews with selector overrides/);
  assert.match(ethos, /Test every meaningful change/);
});
