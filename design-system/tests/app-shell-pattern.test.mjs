import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

test('app shell is packaged as a modular pattern', async () => {
  const pkg = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const index = await readFile(new URL('../index.js', import.meta.url), 'utf8');

  assert.equal(pkg.exports['./patterns/app-shell.css'], './design-system/patterns/app-shell/app-shell.css');
  assert.match(readme, /patterns\/app-shell\.css/);
  assert.match(readme, /## App Shell Containers/);
  assert.match(readme, /`full`: dashboards, tables, charts, canvases/);
  assert.match(readme, /`narrow`: settings, forms/);
  assert.match(readme, /Context navigation should switch between page containers from a component\/data map/);
  assert.match(index, /appShell: '@fragmatic\/design-system\/patterns\/app-shell\.css'/);
});

test('app shell preview uses product concepts from the dashboard reference', async () => {
  const preview = await readFile(new URL('../previews/fragmatic-design-system.html', import.meta.url), 'utf8');
  const previewModule = await readFile(new URL('../previews/app-shell-preview.mjs', import.meta.url), 'utf8');

  assert.match(preview, /class="frgm-app-shell"/);
  assert.match(preview, /href="\.\.\/components\/atoms\/atoms\.css"/);
  assert.match(preview, /href="\.\.\/components\/brand\/brand\.css"/);
  assert.match(preview, /href="\.\.\/patterns\/app-shell\/app-shell\.css"/);
  assert.match(preview, /src="\.\/app-shell-preview\.mjs"/);
  assert.match(preview, /data-ds-dropdown-slot="domain"/);
  assert.match(preview, /data-ds-dropdown-slot="profile"/);
  assert.doesNotMatch(preview, /Production domain/);
  assert.doesNotMatch(preview, /data-ds-dropdown-slot="settings"/);
  assert.doesNotMatch(preview, /class="frgm-app-domain-switcher"/);
  assert.doesNotMatch(preview, /class="frgm-app-sidebar-foot"/);
  assert.match(preview, /class="frgm-app-topbar-brand"/);
  assert.match(preview, /class="frgm-app-secondary-topbar" data-ds-secondary-topbar/);
  assert.doesNotMatch(preview, /class="frgm-app-breadcrumb"/);
  assert.doesNotMatch(preview, /class="frgm-app-topbar-context"/);
  assert.doesNotMatch(preview, /New experience/);
  assert.match(preview, /data-ds-brand-slot="topbarMark"/);
  assert.match(preview, /data-ds-shell-nav/);
  assert.match(preview, /data-ds-shell-context-nav/);
  assert.doesNotMatch(preview, /<button class="frgm-app-context-item"/);
  assert.match(preview, /class="frgm-app-main-container" data-width="full" data-shell-page="analytics"/);
  assert.match(preview, /class="frgm-app-main-container" data-width="narrow" data-shell-page="settings"/);
  assert.match(preview, /Full width analytics container/);
  assert.match(preview, /Narrow centered settings container/);
  assert.match(preview, /Narrow centered settings container" hidden/);
  assert.match(preview, /Project settings/);
  assert.match(preview, /class="frgm-app-context-nav"/);
  assert.match(preview, /class="frgm-app-context-panel"/);
  assert.match(preview, /data-context-card/);
  assert.match(preview, /data-context-open/);
  assert.match(preview, /data-context-close/);
  assert.match(preview, /data-context-overlay/);
  assert.match(preview, /data-context-panel-target="notifications"/);
  assert.match(preview, /data-context-panel-content="notifications"/);
  assert.match(preview, /aria-hidden="true"/);
  assert.match(preview, /aria-controls="frgm-recommendation-context"/);
  assert.match(preview, /id="logos"/);
  assert.match(preview, /class="logo-foundation-grid"/);
  assert.match(preview, /id="icons"/);
  assert.match(preview, /class="icon-foundation-grid"/);
  assert.match(preview, /data-ds-brand-slot="sidebarTile"/);
  assert.match(preview, /data-ds-brand-slot="wordmark"/);
  assert.doesNotMatch(preview, /data-ds-brand-slot="appShellLogo"/);
  assert.doesNotMatch(preview, /class="frgm-app-inspector"/);
  assert.doesNotMatch(preview, /<svg viewBox="0 0 1000 720"/);
  assert.doesNotMatch(preview, /<span class="mark">F<\/span>/);
  assert.doesNotMatch(preview, /src="\.\.\/assets\/brand\/fragmatic-mark\.svg"/);

  const appNav = preview.match(/<nav class="frgm-app-nav">[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.doesNotMatch(appNav, /frgm-app-nav-item/);
  assert.doesNotMatch(appNav, /<button class="frgm-app-nav-item"[\s\S]*?<svg/);

  assert.match(previewModule, /const shellNavSections = \[/);
  assert.match(previewModule, /const shellContextItems = \[/);
  assert.match(previewModule, /const secondaryTopbarByPage = \{/);
  assert.match(previewModule, /import \{ DropdownMenu, SecondaryTopbar \} from '\.\.\/components\/atoms\/index\.js'/);
  assert.match(previewModule, /import \{ BrandLogoButton, FragmaticMark, FragmaticSidebarTile \} from '\.\.\/components\/brand\/index\.js'/);
  assert.match(previewModule, /const dropdownSlotRenderers = \{/);
  assert.match(previewModule, /domain: \(\) => React\.createElement\(DropdownMenu/);
  assert.match(previewModule, /profile: \(\) => React\.createElement\(DropdownMenu/);
  assert.match(previewModule, /variant: 'domain'/);
  assert.match(previewModule, /variant: 'avatar'/);
  assert.match(previewModule, /label: 'acme\.io'/);
  assert.match(previewModule, /caption: 'Acme'/);
  assert.match(previewModule, /label: 'Logout', danger: true/);
  assert.match(previewModule, /label: 'Profile Settings'/);
  assert.doesNotMatch(previewModule, /settings: \(\) => React\.createElement\(DropdownMenu/);
  assert.doesNotMatch(previewModule, /Workspace members/);
  assert.match(previewModule, /const brandSlotRenderers = \{/);
  assert.match(previewModule, /topbarMark: \(\) => React\.createElement\(FragmaticSidebarTile/);
  assert.match(previewModule, /document\.querySelectorAll\('\[data-ds-brand-slot\]'\)\.forEach\(renderBrandSlot\)/);
  assert.match(previewModule, /document\.querySelectorAll\('\[data-ds-dropdown-slot\]'\)\.forEach\(renderDropdownSlot\)/);
  assert.match(previewModule, /const initializeDropdownDismissal = \(\) =>/);
  assert.match(previewModule, /document\.querySelectorAll\('details\.frgm-dropdown\[open\]'\)/);
  assert.match(previewModule, /dropdown\.open = false/);
  assert.match(previewModule, /initializeDropdownDismissal\(\)/);
  assert.match(previewModule, /label: 'Operate'/);
  assert.match(previewModule, /label: 'Analytics', icon: 'analytics', count: '8', active: true/);
  assert.match(previewModule, /label: 'Segments', icon: 'segments', count: '24'/);
  assert.match(previewModule, /label: 'Journeys', icon: 'journey', count: '6'/);
  assert.match(previewModule, /label: 'Goals', icon: 'goal', count: '3'/);
  assert.match(previewModule, /label: 'Content', icon: 'content', count: '11'/);
  assert.match(previewModule, /label: 'Experiences', icon: 'experience', count: '9'/);
  assert.match(previewModule, /label: 'AI Marketer', icon: 'aiChip', count: '12'/);
  assert.match(previewModule, /label: 'Profiles', icon: 'profiles', count: '2k'/);
  assert.match(previewModule, /label: 'Configuration', icon: 'gear'/);
  assert.match(previewModule, /label: 'Overview', count: 'live', page: 'analytics', active: true/);
  assert.match(previewModule, /label: 'Settings', count: 'form', page: 'settings'/);
  assert.match(previewModule, /breadcrumbPath: \[\{ label: 'Analytics' \}, \{ label: 'Overview' \}\]/);
  assert.match(previewModule, /datePreset: 'Last 90 Days'/);
  assert.match(previewModule, /dateRange: '4 Feb-4 May 2026'/);
  assert.match(previewModule, /breadcrumbPath: \[\{ label: 'Settings' \}, \{ label: 'Project Settings' \}\]/);
  assert.match(previewModule, /querySelector\('\[data-ds-shell-nav\]'\)/);
  assert.match(previewModule, /querySelector\('\[data-ds-shell-context-nav\]'\)/);
  assert.match(previewModule, /querySelector\('\[data-ds-secondary-topbar\]'\)/);
  assert.match(previewModule, /React\.createElement\(SecondaryTopbar/);
  assert.match(previewModule, /className: 'frgm-app-secondary-topbar-surface'/);
  assert.match(previewModule, /Recommendation context/);
  assert.match(previewModule, /document\.addEventListener\('click'/);
  assert.match(previewModule, /closest\('\[data-context-open\]'\)/);
  assert.doesNotMatch(previewModule, /data-secondary-topbar-state/);
  assert.match(previewModule, /querySelectorAll\('\[data-shell-page\]'\)/);
  assert.match(previewModule, /const setShellPage = \(activeItem\) =>/);
  assert.match(previewModule, /page\.hidden = page\.dataset\.shellPage !== activeItem\.page/);
  assert.match(previewModule, /data-shell-context-item/);
  assert.match(previewModule, /onClick: \(\) => setShellPage\(item\)/);
  assert.match(previewModule, /aria-current/);
  assert.match(previewModule, /const setContextPanelOpen = \(isOpen, target = 'recommendation'\) =>/);
  assert.match(previewModule, /const setContextPanelContent = \(target = 'recommendation'\) =>/);
  assert.match(previewModule, /notifications:\s*{\s*title: 'Notifications'/);
  assert.match(previewModule, /classList\.toggle\('is-open', isOpen\)/);
  assert.match(previewModule, /setAttribute\('aria-hidden', String\(!isOpen\)\)/);
  assert.match(previewModule, /setAttribute\('aria-expanded', String\(isOpen\)\)/);
  assert.match(previewModule, /event\.key === 'Escape'/);
});

test('app shell stylesheet stays token-driven', async () => {
  const css = await readFile(new URL('../patterns/app-shell/app-shell.css', import.meta.url), 'utf8');

  assert.match(css, /var\(--page-bg\)/);
  assert.match(css, /var\(--card-bg\)/);
  assert.match(css, /var\(--border-subtle\)/);
  assert.match(css, /var\(--frgm-control-h-md\)/);
  assert.doesNotMatch(css, /\.frgm-app-secondary-topbar[\s\S]*?frgm-date-range/);
  assert.match(css, /var\(--chart-primary\)/);
  assert.match(css, /box-shadow:\s*var\(--shadow-pop\)/);
  assert.match(css, /grid-template-rows:\s*auto auto minmax\(0,\s*1fr\)/);
  assert.match(css, /\.frgm-app-topbar\s*{[\s\S]*?grid-column:\s*1 \/ -1/);
  assert.match(css, /\.frgm-app-topbar\s*{[\s\S]*?grid-template-columns:\s*max-content minmax\(14rem,\s*1fr\) minmax\(0,\s*max-content\)/);
  assert.match(css, /\.frgm-app-secondary-topbar\s*{[\s\S]*?grid-row:\s*2/);
  assert.match(css, /\.frgm-app-secondary-topbar\s*{[\s\S]*?min-height:\s*3rem/);
  assert.match(css, /\.frgm-app-sidebar\s*{[\s\S]*?grid-row:\s*2 \/ 4/);
  assert.match(css, /\.frgm-app-main\s*{[\s\S]*?grid-row:\s*3/);
  assert.match(css, /\.frgm-app-content\s*{[\s\S]*?background:\s*var\(--page-bg\)/);
  assert.doesNotMatch(css, /\.frgm-app-content\s*{[\s\S]*?linear-gradient/);
  assert.match(css, /\.frgm-app-main-container\s*{[\s\S]*?width:\s*100%/);
  assert.match(css, /\.frgm-app-main-container\[data-width='full'\]\s*{[\s\S]*?max-width:\s*none/);
  assert.match(css, /\.frgm-app-main-container\[data-width='narrow'\]\s*{[\s\S]*?width:\s*min\(100%,\s*49\.1429rem\)/);
  assert.match(css, /\.frgm-app-main-container\[data-width='narrow'\]\s*{[\s\S]*?margin-inline:\s*auto/);
  assert.match(css, /\.frgm-app-settings-card/);
  assert.doesNotMatch(css, /frgm-app-topbar-context/);
  assert.match(css, /\.frgm-app-actions\s*{[\s\S]*?flex-wrap:\s*wrap/);
  assert.match(css, /\.frgm-app-topbar-logo\s*{[\s\S]*?width:\s*2\.8571rem/);
  assert.match(css, /\.frgm-app-topbar-logo svg\s*{[\s\S]*?height:\s*2\.8571rem/);
  assert.match(css, /\.frgm-app-topbar-brand > \[data-ds-dropdown-slot\]/);
  assert.match(css, /\.frgm-app-actions > \[data-ds-dropdown-slot\]/);
  assert.match(css, /\.frgm-app-topbar-brand \.frgm-dropdown-trigger\[data-variant='domain'\]\s*{[\s\S]*?width:\s*min\(14rem,\s*24vw\)/);
  assert.doesNotMatch(css, /frgm-app-domain-switcher/);
  assert.doesNotMatch(css, /frgm-app-domain-org/);
  assert.doesNotMatch(css, /frgm-app-sidebar-foot/);
  assert.doesNotMatch(css, /frgm-app-user/);
  assert.match(css, /--frgm-app-sidebar-collapsed:\s*4\.5714rem/);
  assert.match(css, /--frgm-app-menu-item-height:\s*2\.2857rem/);
  assert.match(css, /--frgm-app-nav-item-collapsed-width:\s*3\.4286rem/);
  assert.match(css, /\.frgm-app-nav-item\s*{[\s\S]*?height:\s*var\(--frgm-app-menu-item-height\)/);
  assert.match(css, /\.frgm-app-context-item\s*{[\s\S]*?height:\s*var\(--frgm-app-menu-item-height\)/);
  assert.match(css, /\.frgm-app-nav-kicker\s*{[\s\S]*?min-height:\s*2\.5714rem/);
  assert.match(css, /:has\(\.frgm-app-sidebar:hover\)/);
  assert.match(css, /\.frgm-app-sidebar:hover,\s*\.frgm-app-sidebar:focus-within\s*{\s*width:\s*var\(--frgm-app-sidebar-expanded\)/);
  assert.match(css, /\.frgm-app-nav-kicker::before\s*{[\s\S]*?background:\s*var\(--border-subtle\)/);
  assert.match(css, /\.frgm-app-shell:not\(:has\(\.frgm-app-sidebar:hover\)\):not\(:has\(\.frgm-app-sidebar:focus-within\)\) \.frgm-app-nav\s*{[\s\S]*?gap:\s*0;/);
  assert.match(css, /\.frgm-app-shell:not\(:has\(\.frgm-app-sidebar:hover\)\):not\(:has\(\.frgm-app-sidebar:focus-within\)\) \.frgm-app-nav\s*{[\s\S]*?padding-inline:\s*0\.5714rem/);
  assert.doesNotMatch(css, /\.frgm-app-shell:not\(:has\(\.frgm-app-sidebar:hover\)\):not\(:has\(\.frgm-app-sidebar:focus-within\)\) \.frgm-app-nav-kicker\s*{\s*display:\s*none/);
  assert.match(css, /\.frgm-app-nav-item > span:not\(\.frgm-app-nav-icon\)\s*{\s*display:\s*none;/);
  assert.doesNotMatch(css, /not\(:has\(\.frgm-app-sidebar:hover\)\):not\(:has\(\.frgm-app-sidebar:focus-within\)\) \.frgm-app-domain-switcher/);
  assert.doesNotMatch(css, /not\(:has\(\.frgm-app-sidebar:hover\)\):not\(:has\(\.frgm-app-sidebar:focus-within\)\) \.frgm-app-nav-item\s*{[\s\S]*?min-height:\s*3\.4286rem/);
  assert.match(css, /\.frgm-app-nav-icon/);
  assert.match(css, /\.frgm-app-context-overlay\.is-open\s*{[\s\S]*?pointer-events:\s*auto/);
  assert.match(css, /\.frgm-app-context-scrim\s*{[\s\S]*?opacity:\s*0/);
  assert.match(css, /\.frgm-app-context-overlay\.is-open \.frgm-app-context-scrim\s*{[\s\S]*?opacity:\s*1/);
  assert.match(css, /\.frgm-app-context-panel\s*{[\s\S]*?transform:\s*translateX\(100%\)/);
  assert.match(css, /\.frgm-app-context-overlay\.is-open \.frgm-app-context-panel\s*{[\s\S]*?transform:\s*translateX\(0\)/);
  assert.doesNotMatch(css, /grid-template-columns:\s*var\(--frgm-app-sidebar-expanded\)/);
  assert.doesNotMatch(css, /#[0-9a-fA-F]{3,8}/);
  assert.doesNotMatch(css, /font-display/);
  assert.doesNotMatch(css, /frgm-app-inspector/);
});

test('app shell container variants are formalized in the foundation contract', async () => {
  const contract = await readFile(new URL('../foundations/component-contracts.md', import.meta.url), 'utf8');
  const ethos = await readFile(new URL('../ethos.md', import.meta.url), 'utf8');

  assert.match(contract, /## App Shell Container Foundation/);
  assert.match(contract, /\.frgm-app-main-container\[data-width='full' \| 'narrow'\]/);
  assert.match(contract, /Use `full` for data-heavy dashboards, tables, charts, canvases/);
  assert.match(contract, /Use `narrow` for settings, forms/);
  assert.match(contract, /Only one app-shell page container should be visible/);
  assert.match(contract, /drive labels, counts, active state, target page, and container width from a component\/data map/);
  assert.match(contract, /Dashboard-style page context bars use `SecondaryTopbar`/);
  assert.match(contract, /preserves the existing page breadcrumb/);
  assert.match(ethos, /App surfaces choose documented container variants/);
  assert.match(ethos, /Do not stack multiple shell page variants in one preview state/);
  assert.match(ethos, /Secondary topbars are components/);
});

test('brand assets and logo button are packaged', async () => {
  const pkg = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));
  const brand = await readFile(new URL('../components/brand/index.js', import.meta.url), 'utf8');
  const brandCss = await readFile(new URL('../components/brand/brand.css', import.meta.url), 'utf8');
  const tile = await readFile(new URL('../assets/brand/fragmatic-sidebar-tile.svg', import.meta.url), 'utf8');
  const mark = await readFile(new URL('../assets/brand/fragmatic-mark.svg', import.meta.url), 'utf8');
  const wordmark = await readFile(new URL('../assets/brand/fragmatic-wordmark.svg', import.meta.url), 'utf8');

  assert.equal(pkg.exports['./brand'], './design-system/components/brand/index.js');
  assert.equal(pkg.exports['./brand.css'], './design-system/components/brand/brand.css');
  assert.equal(pkg.exports['./assets/brand/fragmatic-mark.svg'], './design-system/assets/brand/fragmatic-mark.svg');
  assert.equal(pkg.exports['./assets/brand/fragmatic-sidebar-tile.svg'], './design-system/assets/brand/fragmatic-sidebar-tile.svg');
  assert.match(brand, /export function FragmaticMark/);
  assert.match(brand, /export function FragmaticSidebarTile/);
  assert.match(brand, /export function BrandLogoButton/);
  assert.match(brand, /brandLogoItems/);
  assert.match(brandCss, /\.frgm-brand-button/);
  assert.match(brandCss, /\.frgm-brand-mark img/);
  assert.match(brandCss, /width:\s*2\.8571rem/);
  assert.match(brandCss, /height:\s*2\.8571rem/);
  assert.match(brandCss, /padding:\s*0\.5714rem 0\.7143rem/);
  assert.match(mark, /viewBox="0 0 34 39"/);
  assert.match(tile, /viewBox="0 0 40 40"/);
  assert.match(tile, /rx="10"/);
  assert.match(wordmark, /viewBox="0 0 170 39"/);
});

test('dashboard-derived shell icons are available from the design system', async () => {
  const icons = await readFile(new URL('../components/atoms/icons.js', import.meta.url), 'utf8');
  const previewModule = await readFile(new URL('../previews/app-shell-preview.mjs', import.meta.url), 'utf8');

  for (const icon of [
    'dashboard',
    'onboarding',
    'experience',
    'segments',
    'pie',
    'profiles',
    'goal',
    'aiChip',
    'notification',
    'lifeBuoy',
    'gear',
    'journey',
    'calendar',
  ]) {
    assert.match(icons, new RegExp(`${icon}: svg`));
  }

  assert.match(icons, /analytics: React\.createElement/);
  assert.match(icons, /content: React\.createElement/);
  assert.match(icons, /M18 20V10M12 20V4M6 20V14/);
  assert.match(icons, /M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z/);
  assert.match(icons, /M21\.2099 15\.89C20\.5737 17\.3945/);
  assert.match(previewModule, /import \{ icons \} from '\.\.\/components\/atoms\/icons\.js'/);
  assert.match(previewModule, /querySelectorAll\('\[data-ds-icon-slot\]'\)/);
});
