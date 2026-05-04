import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const atomNames = [
  'Button',
  'Badge',
  'Breadcrumb',
  'LinkButton',
  'Pill',
  'ProfileTag',
  'ProfitLose',
  'SegmentStatus',
  'ProgressBar',
  'SearchInput',
  'SwitchButton',
  'Loader',
  'TypingLoader',
  'MetaPill',
];

test('package exports hardened atom entrypoints', async () => {
  const pkg = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));

  assert.equal(pkg.exports['./atoms'], './design-system/components/atoms/index.js');
  assert.equal(pkg.exports['./atoms.css'], './design-system/components/atoms/atoms.css');
});

test('hardened atoms export the public atom surface', async () => {
  const entry = await readFile(new URL('../components/atoms/index.js', import.meta.url), 'utf8');

  for (const atomName of atomNames) {
    assert.match(entry, new RegExp(`export function ${atomName}\\b`));
  }
  assert.match(entry, /export const customSpinner/);
  assert.match(entry, /export const typingLoader/);
});

test('hardened atoms do not depend on dashboard-local modules', async () => {
  const entry = await readFile(new URL('../components/atoms/index.js', import.meta.url), 'utf8');
  const icons = await readFile(new URL('../components/atoms/icons.js', import.meta.url), 'utf8');

  for (const source of [entry, icons]) {
    assert.doesNotMatch(source, /@\/components\/Atoms/);
    assert.doesNotMatch(source, /\.\.\/Icons\/constants/);
    assert.doesNotMatch(source, /next\/image|next\/link|antd|@ant-design\/icons/);
  }
});

test('atom styles use design tokens', async () => {
  const css = await readFile(new URL('../components/atoms/atoms.css', import.meta.url), 'utf8');

  assert.match(css, /var\(--primary\)/);
  assert.match(css, /var\(--card-bg\)/);
  assert.match(css, /var\(--border-subtle\)/);
});
