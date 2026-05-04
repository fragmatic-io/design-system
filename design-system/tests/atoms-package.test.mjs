import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';
import assert from 'node:assert/strict';

const execFileAsync = promisify(execFile);

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
  await execFileAsync(process.execPath, ['--check', new URL('../components/atoms/index.js', import.meta.url).pathname]);

  for (const atomName of atomNames) {
    assert.match(entry, new RegExp(`export function ${atomName}\\b`));
  }
  assert.match(entry, /export const customSpinner/);
  assert.match(entry, /export const typingLoader/);
  assert.match(entry, /const rootRef = React\.useRef\(null\)/);
  assert.match(entry, /document\.addEventListener\('pointerdown', closeOnOutsidePointerDown\)/);
  assert.match(entry, /window\.addEventListener\('resize', updatePopoverAlignment\)/);
  assert.match(entry, /'data-compare': isCompare \? 'true' : undefined/);
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

test('legacy atom folder entrypoints re-export canonical atoms', async () => {
  const atomsDir = new URL('../components/atoms/', import.meta.url);
  const entries = await readdir(atomsDir, { recursive: true, withFileTypes: true });
  const jsxFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.jsx'))
    .map((entry) => new URL(`../components/atoms/${entry.parentPath.replace(`${atomsDir.pathname}`, '')}/${entry.name}`, import.meta.url));

  assert.ok(jsxFiles.length > 0);

  for (const fileUrl of jsxFiles) {
    const source = await readFile(fileUrl, 'utf8');
    assert.match(source, /export \{ [^}]+ \} from '\.\.\/index\.js';/);
    assert.doesNotMatch(source, /next\/image|next\/link|antd|@ant-design\/icons|@\/components|LoadingOutlined|PropTypes|className="flex|bg-\[/);
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
  assert.match(css, /\.frgm-search kbd\s*{[\s\S]*?font:\s*var\(--frgm-control-font-size-sm\)\/var\(--frgm-control-line\) var\(--font-mono\)/);
  assert.match(css, /\.frgm-field-group\s*{[\s\S]*?gap:\s*var\(--frgm-inline-gap-md\)/);
  assert.match(css, /\.frgm-field-group-body\s*{[\s\S]*?margin-top:\s*var\(--frgm-inline-gap-xs\)/);
  assert.match(css, /\.frgm-dropdown\[open\]\s*{[\s\S]*?z-index:\s*var\(--frgm-layer-dropdown\)/);
  assert.match(css, /\.frgm-dropdown-panel\s*{[\s\S]*?z-index:\s*var\(--frgm-layer-dropdown\)/);
  assert.match(css, /\.frgm-search:focus-within\s*{[\s\S]*?outline:\s*0/);
  assert.doesNotMatch(css, /\.frgm-dropdown-trigger:hover,\s*\.frgm-dropdown\[open\] \.frgm-dropdown-trigger/);
  assert.doesNotMatch(css, /\.frgm-dropdown\[open\] \.frgm-dropdown-trigger\[data-variant='domain'\] \.frgm-dropdown-caption/);
  assert.match(css, /\.frgm-date-range-control/);
  assert.match(css, /\.frgm-date-range-popover/);
  assert.match(css, /\.frgm-date-range-shortcuts/);
  assert.match(css, /\.frgm-date-range-compare-toggle/);
  assert.match(css, /\.frgm-date-range-field-head/);
  assert.match(css, /\.frgm-date-range-field-row/);
  assert.match(css, /\.frgm-date-range-field-label/);
  assert.match(css, /\.frgm-date-range-month-nav/);
  assert.match(css, /\.frgm-date-range-period-button/);
  assert.match(css, /\.frgm-date-range-month-section/);
  assert.match(css, /\.frgm-date-range-footer/);
  assert.doesNotMatch(css, /\.frgm-date-range-vs/);
  assert.doesNotMatch(css, /frgm-date-range-presets/);
  assert.match(css, /var\(--frgm-date-range-h\)/);
  assert.match(css, /var\(--frgm-date-range-border\)/);
  assert.match(css, /var\(--frgm-date-range-shadow\)/);
  assert.match(css, /var\(--frgm-date-range-popover-width\)/);
  assert.match(css, /var\(--frgm-date-range-popover-border\)/);
  assert.match(css, /var\(--frgm-date-range-shortcuts-width\)/);
  assert.match(css, /var\(--frgm-date-range-field-chip-active-border\)/);
  assert.match(css, /var\(--frgm-date-range-field-chip-hover-bg\)/);
  assert.match(css, /var\(--frgm-date-range-option-active-bg\)/);
  assert.match(css, /var\(--frgm-date-range-calendar-day-hover-bg\)/);
  assert.match(css, /var\(--frgm-effect-transition\)/);
  assert.match(css, /var\(--frgm-date-range-selection-fill\)/);
  assert.match(css, /\.frgm-date-range-control\[data-open='true'\]\s*{[\s\S]*?border-color:\s*var\(--frgm-date-range-border-active\)/);
  assert.doesNotMatch(css, /\.frgm-date-range-control\[data-open='true'\]\s+\.frgm-date-range-preset-trigger,\s*\.frgm-date-range-control\[data-open='true'\]\s+\.frgm-date-range-display\s*{[\s\S]*?background:\s*var\(--frgm-date-range-trigger-hover-bg\)/);
  assert.match(css, /\.frgm-date-range-control\[data-selected='true'\]\s+\.frgm-date-range-display/);
  assert.match(css, /\.frgm-date-range-control\[data-align='end'\]\s+\.frgm-date-range-popover/);
  assert.match(tokens, /--frgm-date-range-h:\s*3\.1429rem/);
  assert.match(tokens, /--space-4:\s*1\.1429rem/);
  assert.match(tokens, /--frgm-date-range-pad-y:\s*0\.5714rem/);
  assert.match(tokens, /--frgm-date-range-pad-x:\s*var\(--space-3\)/);
  assert.match(tokens, /--frgm-date-range-border:\s*transparent/);
  assert.match(tokens, /--frgm-date-range-border-active:\s*transparent/);
  assert.match(tokens, /--frgm-date-range-shadow:\s*none/);
  assert.match(tokens, /--frgm-layer-sticky:\s*900/);
  assert.match(tokens, /--frgm-layer-popover:\s*1000/);
  assert.match(tokens, /--frgm-layer-shell-overlay:\s*1050/);
  assert.match(tokens, /--frgm-layer-dropdown:\s*1100/);
  assert.match(tokens, /--frgm-date-range-font-size:\s*var\(--frgm-control-font-size-sm\)/);
  assert.match(tokens, /--frgm-date-range-calendar-font-size:\s*var\(--frgm-control-font-size-sm\)/);
  assert.match(tokens, /--frgm-date-range-popover-width:\s*50rem/);
  assert.match(tokens, /--frgm-date-range-popover-border:\s*var\(--border-subtle\)/);
  assert.match(tokens, /--frgm-date-range-panel-pad:\s*var\(--space-4\)/);
  assert.match(tokens, /--frgm-date-range-field-chip-active-shadow:/);
  assert.match(tokens, /--frgm-date-range-option-active-bg:\s*var\(--gray-100\)/);
  assert.match(tokens, /--frgm-date-range-calendar-nav-hover-bg:/);
  assert.match(tokens, /--frgm-date-range-calendar-day-hover-bg:/);
  assert.match(tokens, /--frgm-effect-transition:/);
  assert.match(tokens, /--border-strong:/);
  assert.match(tokens, /--shadow-soft:/);
  assert.match(tokens, /--motion-fast:/);
  assert.match(tokens, /--accent:/);
  assert.match(tokens, /--frgm-date-range-edge-fill:\s*rgb\(26, 26, 26\)/);
  assert.match(css, /\.frgm-secondary-topbar/);
  assert.match(css, /\.frgm-secondary-topbar-breadcrumb/);
  assert.match(css, /\.frgm-secondary-topbar-controls/);
  assert.match(css, /@media \(max-width:\s*52rem\)\s*{[\s\S]*?\.frgm-secondary-topbar\s*{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /@media \(max-width:\s*52rem\)\s*{[\s\S]*?\.frgm-date-range-control\s*{[\s\S]*?min-width:\s*0/);
  assert.match(css, /@media \(max-width:\s*52rem\)\s*{[\s\S]*?\.frgm-date-range-primary > span:last-child/);
  assert.match(css, /@media \(max-width:\s*52rem\)\s*{[\s\S]*?\.frgm-secondary-topbar-controls,\s*\.frgm-secondary-topbar-actions\s*{[\s\S]*?overflow-x:\s*auto/);
  assert.match(css, /@media \(max-width:\s*56rem\)\s*{[\s\S]*?\.frgm-date-range-popover\s*{[\s\S]*?grid-template-rows:\s*auto minmax\(0,\s*1fr\)/);
  assert.match(css, /@media \(max-width:\s*56rem\)\s*{[\s\S]*?\.frgm-date-range-popover\s*{[\s\S]*?z-index:\s*calc\(var\(--frgm-layer-dropdown\) \+ 1\)/);
  assert.match(css, /@media \(max-width:\s*56rem\)\s*{[\s\S]*?\.frgm-date-range-popover\s*{[\s\S]*?width:\s*100vw/);
  assert.match(css, /@media \(max-width:\s*56rem\)\s*{[\s\S]*?\.frgm-date-range-shortcut-list\s*{[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /@media \(max-width:\s*56rem\)\s*{[\s\S]*?\.frgm-date-range-control\[data-compare='true'\] \.frgm-date-range-shortcut-list\[data-compare='true'\]/);
  assert.match(css, /@media \(max-width:\s*56rem\)\s*{[\s\S]*?\.frgm-date-range-month\s*{[\s\S]*?overflow-y:\s*auto/);
  assert.doesNotMatch(css, /frgm-secondary-topbar-toggle/);
  assert.doesNotMatch(css, /data-state='collapsed'/);
  assert.doesNotMatch(css, /#[0-9a-fA-F]{3,8}/);
});

test('foundation CSS variables used by atoms and app shell are defined', async () => {
  const sources = await Promise.all([
    readFile(new URL('../tokens/tokens.css', import.meta.url), 'utf8'),
    readFile(new URL('../components/atoms/atoms.css', import.meta.url), 'utf8'),
    readFile(new URL('../patterns/app-shell/app-shell.css', import.meta.url), 'utf8'),
  ]);
  const [tokens, atomsCss, appShellCss] = sources;
  const definitions = new Set([...tokens.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]));

  for (const css of [atomsCss, appShellCss]) {
    for (const match of css.matchAll(/var\((--[\w-]+)(\s*,)?/g)) {
      if (match[2]) {
        continue;
      }
      assert.ok(definitions.has(match[1]) || css.includes(`${match[1]}:`), `${match[1]} is used but not defined`);
    }
  }
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
  assert.match(preview, /data-ds-search-demo/);
  assert.doesNotMatch(preview, /<label class="frgm-search">/);
  assert.match(preview, /Dropdown controls/);
  assert.match(preview, /Date range control/);
  assert.match(preview, /data-ds-date-range-demo="start"/);
  assert.match(preview, /data-ds-date-range-demo="end"/);
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
  assert.match(contract, /`--space-\*`/);
  assert.match(contract, /## Dropdown Foundation/);
  assert.match(contract, /Domain switchers, profile menus, settings menus, and overflow menus/);
  assert.match(contract, /## Secondary Topbar Foundation/);
  assert.match(contract, /Dashboard-style page context bars use `SecondaryTopbar`/);
  assert.match(contract, /preserves the existing page breadcrumb/);
  assert.match(contract, /--frgm-date-range-h/);
  assert.match(contract, /--frgm-date-range-popover-\*/);
  assert.match(contract, /Date range borders have three defined types/);
  assert.match(contract, /Date field chips have normal, hover, and active definitions/);
  assert.match(contract, /align` API \(`auto`, `start`, or `end`\)/);
  assert.match(contract, /--frgm-layer-sticky/);
  assert.match(contract, /--frgm-layer-shell-overlay/);
  assert.match(contract, /focus-within` preserves the neutral border/);
  assert.match(contract, /react-date-range/);
  assert.doesNotMatch(contract, /centered `vs` separator/);
  assert.match(contract, /previous, current, and next month sections/);
  assert.match(contract, /Effects/);
  assert.match(contract, /compare toggle/);
  assert.match(contract, /dashboard 44px two-part date trigger/);
  assert.match(contract, /Audit Result/);
});
