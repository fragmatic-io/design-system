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
  'Field',
  'TextInput',
  'SelectField',
  'TextareaField',
  'FieldGroup',
  'FieldRow',
  'CheckboxField',
  'RadioField',
  'ToggleField',
  'DropdownMenu',
  'DateRangeControl',
  'SecondaryTopbar',
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
  assert.match(entry, /const rootRef = React\.useRef\(null\)/);
  assert.match(entry, /document\.addEventListener\('pointerdown', closeOnOutsidePointerDown\)/);
  assert.match(entry, /root\.open = false/);
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
  const tokens = await readFile(new URL('../tokens/tokens.css', import.meta.url), 'utf8');

  assert.match(css, /var\(--primary\)/);
  assert.match(css, /var\(--card-bg\)/);
  assert.match(css, /var\(--frgm-control-border\)/);
  assert.match(css, /var\(--frgm-control-h-md\)/);
  assert.match(css, /\.frgm-field/);
  assert.match(css, /\.frgm-input/);
  assert.match(css, /\.frgm-select/);
  assert.match(css, /\.frgm-textarea/);
  assert.match(css, /\.frgm-choice/);
  assert.match(css, /\.frgm-toggle-field/);
  assert.match(css, /\.frgm-dropdown/);
  assert.match(css, /\.frgm-dropdown-trigger/);
  assert.match(css, /\.frgm-dropdown-panel/);
  assert.match(css, /\.frgm-search svg\s*{[\s\S]*?width:\s*var\(--frgm-icon-size-md\)/);
  assert.match(css, /\.frgm-field-group\s*{[\s\S]*?gap:\s*var\(--frgm-inline-gap-md\)/);
  assert.match(css, /\.frgm-field-group-body\s*{[\s\S]*?margin-top:\s*var\(--frgm-inline-gap-xs\)/);
  assert.match(css, /\.frgm-dropdown\[open\]\s*{[\s\S]*?z-index:\s*var\(--frgm-layer-popover\)/);
  assert.match(css, /\.frgm-dropdown-panel\s*{[\s\S]*?z-index:\s*var\(--frgm-layer-popover\)/);
  assert.match(css, /\.frgm-date-range-control/);
  assert.match(css, /\.frgm-date-range-popover/);
  assert.match(css, /\.frgm-date-range-shortcuts/);
  assert.match(css, /\.frgm-date-range-compare-toggle/);
  assert.match(css, /\.frgm-date-range-month-nav/);
  assert.match(css, /\.frgm-date-range-footer/);
  assert.doesNotMatch(css, /frgm-date-range-presets/);
  assert.match(css, /var\(--frgm-date-range-h\)/);
  assert.match(css, /var\(--frgm-date-range-border\)/);
  assert.match(css, /var\(--frgm-date-range-shadow\)/);
  assert.match(tokens, /--frgm-date-range-h:\s*3\.1429rem/);
  assert.match(tokens, /--frgm-date-range-pad-y:\s*0\.5714rem/);
  assert.match(tokens, /--frgm-date-range-pad-x:\s*0\.7143rem/);
  assert.match(css, /\.frgm-secondary-topbar/);
  assert.match(css, /\.frgm-secondary-topbar-breadcrumb/);
  assert.match(css, /\.frgm-secondary-topbar-controls/);
  assert.doesNotMatch(css, /frgm-secondary-topbar-toggle/);
  assert.doesNotMatch(css, /data-state='collapsed'/);
  assert.doesNotMatch(css, /#[0-9a-fA-F]{3,8}/);
});

test('preview form examples use foundation form primitives', async () => {
  const preview = await readFile(new URL('../previews/fragmatic-design-system.html', import.meta.url), 'utf8');

  assert.match(preview, /Field · FieldGroup · text\/select\/textarea\/search\/choice\/toggle/);
  assert.match(preview, /class="frgm-field-row"/);
  assert.match(preview, /class="frgm-input"/);
  assert.match(preview, /class="frgm-select"/);
  assert.match(preview, /class="frgm-textarea"/);
  assert.match(preview, /class="frgm-choice"/);
  assert.match(preview, /class="frgm-toggle-field"/);
  assert.match(preview, /class="frgm-field-group"/);
  assert.match(preview, /Dropdown and date controls/);
  assert.match(preview, /data-ds-date-range-demo/);
  assert.match(preview, /DropdownMenu/);
  assert.match(preview, /class="frgm-dropdown"/);
  assert.match(preview, /class="frgm-dropdown-trigger" data-variant="domain"/);
  assert.match(preview, /SecondaryTopbar/);
  assert.match(preview, /data-ds-secondary-topbar-demo/);
  assert.doesNotMatch(preview, /<span class="ref"><b>\.input-box<\/b>/);
  assert.doesNotMatch(preview, /class="field"/);
  assert.doesNotMatch(preview, /class="search"/);
  assert.doesNotMatch(preview, /\.field input/);
});

test('every exported atom is documented in the foundation contract', async () => {
  const contract = await readFile(new URL('../foundations/component-contracts.md', import.meta.url), 'utf8');

  for (const atomName of atomNames) {
    assert.ok(contract.includes(`| \`${atomName}\``), `${atomName} is missing from the foundation contract`);
  }
  assert.match(contract, /Component Foundation Contracts/);
  assert.match(contract, /## Brand Logo Foundation/);
  assert.match(contract, /components\/brand` is the source of truth/);
  assert.match(contract, /40px` with `8px 10px` padding/);
  assert.match(contract, /## Icon Foundation/);
  assert.match(contract, /components\/atoms\/icons\.js` is the source of truth/);
  assert.match(contract, /## Dropdown Foundation/);
  assert.match(contract, /Domain switchers, profile menus, settings menus, and overflow menus/);
  assert.match(contract, /## Secondary Topbar Foundation/);
  assert.match(contract, /Dashboard-style page context bars use `SecondaryTopbar`/);
  assert.match(contract, /preserves the existing page breadcrumb/);
  assert.match(contract, /--frgm-date-range-h/);
  assert.match(contract, /react-date-range/);
  assert.match(contract, /compare toggle/);
  assert.match(contract, /dashboard 44px two-part date trigger/);
  assert.match(contract, /Audit Result/);
});
