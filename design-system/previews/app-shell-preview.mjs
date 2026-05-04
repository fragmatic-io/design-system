import React from 'react';
import { createRoot } from 'react-dom/client';
import { DateRangeControl, DropdownMenu, SearchInput, SecondaryTopbar } from '../components/atoms/index.js';
import { icons } from '../components/atoms/icons.js';
import { BrandLogoButton, FragmaticMark, FragmaticSidebarTile } from '../components/brand/index.js';

const shellNavSections = [
  {
    label: 'Operate',
    items: [
      { label: 'Overview', icon: 'dashboard', count: '4' },
      { label: 'Analytics', icon: 'analytics', count: '8', active: true },
      { label: 'Segments', icon: 'segments', count: '24' },
      { label: 'Journeys', icon: 'journey', count: '6' },
      { label: 'Goals', icon: 'goal', count: '3' },
    ],
  },
  {
    label: 'Create',
    items: [
      { label: 'Content', icon: 'content', count: '11' },
      { label: 'Experiences', icon: 'experience', count: '9' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'AI Marketer', icon: 'aiChip', count: '12' },
      { label: 'Profiles', icon: 'profiles', count: '2k' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { label: 'Configuration', icon: 'gear' },
    ],
  },
];

const shellContextItems = [
  { label: 'Overview', count: 'live', page: 'analytics', active: true },
  { label: 'Clusters', count: '8', page: 'analytics' },
  { label: 'Pages', count: '42', page: 'analytics' },
  { label: 'Paths', count: '18', page: 'analytics' },
  { label: 'Topics', count: '12', page: 'analytics' },
  { label: 'Funnels', count: '3', page: 'analytics' },
  { label: 'Recommendations', count: '12', page: 'analytics' },
  { label: 'Project settings', count: 'form', page: 'settings' },
];

const secondaryTopbarByPage = {
  analytics: {
    breadcrumbPath: [{ label: 'Analytics' }, { label: 'Overview' }],
    datePreset: 'Last 90 Days',
    dateRange: '4 Feb-4 May 2026',
  },
  settings: {
    breadcrumbPath: [{ label: 'Analytics' }, { label: 'Project settings' }],
    datePreset: 'Last 90 Days',
    dateRange: '4 Feb-4 May 2026',
  },
};

const secondaryTopbarDemo = document.querySelector('[data-ds-secondary-topbar-demo]');
const dateRangeDemos = document.querySelectorAll('[data-ds-date-range-demo]');

if (secondaryTopbarDemo) {
  createRoot(secondaryTopbarDemo).render(React.createElement(SecondaryTopbar, {
    breadcrumbPath: [{ label: 'Analytics' }, { label: 'Overview' }],
    datePreset: 'Last 90 Days',
    dateRange: '4 Feb-4 May 2026',
  }));
}

dateRangeDemos.forEach((dateRangeDemo) => {
  createRoot(dateRangeDemo).render(React.createElement(DateRangeControl, {
    label: 'Last 90 Days',
    dateRange: '4 Feb-4 May 2026',
    align: dateRangeDemo.dataset.dsDateRangeDemo || 'auto',
    defaultCompare: true,
  }));
});

const dropdownSlotRenderers = {
  domain: () => React.createElement(DropdownMenu, {
    label: 'acme.io',
    caption: 'Acme',
    meta: null,
    variant: 'domain',
    items: [
      { label: 'acme.io', description: 'Acme organization', active: true, meta: 'live' },
      { label: 'store.acme.io', description: 'Storefront workspace', meta: 'prod' },
      { label: 'help.acme.io', description: 'Support workspace', meta: 'beta' },
      { type: 'separator' },
      { label: 'Manage domains', icon: icons.gear },
    ],
  }),
  profile: () => React.createElement(DropdownMenu, {
    label: 'Sarah Khan',
    caption: 'Owner',
    initials: 'SK',
    variant: 'avatar',
    align: 'end',
    items: [
      { label: 'Profile Settings', icon: icons.profiles },
      { label: 'Logout', danger: true },
    ],
  }),
};

const renderIconSlot = (slot) => {
  const name = slot.dataset.dsIconSlot;
  const icon = icons[name];

  if (!icon) {
    slot.dataset.iconMissing = name || 'unknown';
    return;
  }

  createRoot(slot).render(icon);
};

const brandSlotRenderers = {
  mark: () => React.createElement(FragmaticMark, { title: '' }),
  sidebarTile: () => React.createElement(FragmaticSidebarTile, { title: '' }),
  wordmark: () => React.createElement('img', {
    src: '../assets/brand/fragmatic-wordmark.svg',
    alt: 'Fragmatic',
  }),
  topbarMark: () => React.createElement(FragmaticSidebarTile, { title: '' }),
  appShellLogo: () => React.createElement(BrandLogoButton, {
    href: '#patterns',
    label: 'Fragmatic',
  }),
};

const renderBrandSlot = (slot) => {
  const name = slot.dataset.dsBrandSlot;
  const render = brandSlotRenderers[name];

  if (!render) {
    slot.dataset.brandMissing = name || 'unknown';
    return;
  }

  createRoot(slot).render(render());
};

const renderDropdownSlot = (slot) => {
  const name = slot.dataset.dsDropdownSlot;
  const render = dropdownSlotRenderers[name];

  if (!render) {
    slot.dataset.dropdownMissing = name || 'unknown';
    return;
  }

  createRoot(slot).render(render());
};

const renderSearchSlot = (slot) => {
  createRoot(slot).render(React.createElement(SearchInput, {
    className: 'frgm-app-command',
    label: 'Search workspace',
    placeholder: 'Search, jump, or ask...',
    shortcut: '⌘K',
  }));
};

const renderSearchDemo = (slot) => {
  createRoot(slot).render(React.createElement(SearchInput, {
    label: 'Search workspace',
    placeholder: 'Search segments, campaigns...',
    shortcut: '⌘K',
  }));
};

const initializeDropdownDismissal = () => {
  document.addEventListener('pointerdown', (event) => {
    document.querySelectorAll('details.frgm-dropdown[open]').forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.open = false;
      }
    });
  });
};

const createShellNavItem = (item) => {
  const icon = icons[item.icon];
  const attrs = {
    className: 'frgm-app-nav-item',
    type: 'button',
    'data-ds-icon': item.icon,
  };

  if (item.active) {
    attrs['aria-current'] = 'page';
  }

  return React.createElement(
    'button',
    attrs,
    React.createElement('span', { className: 'frgm-app-nav-icon' }, icon),
    React.createElement('span', null, item.label),
    item.count && React.createElement('span', { className: 'frgm-app-nav-count' }, item.count),
  );
};

const createShellNavSection = (section) => [
  React.createElement('div', { key: `${section.label}-label`, className: 'frgm-app-nav-kicker' }, section.label),
  ...section.items.map((item) => React.cloneElement(createShellNavItem(item), { key: `${section.label}-${item.label}` })),
];

const shellNav = document.querySelector('[data-ds-shell-nav]');

if (shellNav) {
  createRoot(shellNav).render(shellNavSections.flatMap(createShellNavSection));
}

const mobileNavItems = shellNavSections.flatMap((section) => section.items).filter((item) => (
  ['Overview', 'Analytics', 'Segments', 'AI Marketer'].includes(item.label)
));

const createShellMobileNavItem = (item) => React.createElement(
  'button',
  {
    className: 'frgm-app-mobilebar-item',
    type: 'button',
    'aria-current': item.active ? 'page' : undefined,
    'data-ds-icon': item.icon,
  },
  React.createElement('span', { className: 'frgm-app-mobilebar-icon' }, icons[item.icon]),
  React.createElement('span', null, item.label === 'AI Marketer' ? 'AI' : item.label),
);

document.querySelectorAll('[data-ds-shell-mobile-nav]').forEach((mobileNav) => {
  createRoot(mobileNav).render(mobileNavItems.map((item) => (
    React.cloneElement(createShellMobileNavItem(item), { key: item.label })
  )));
});

const shellContextNav = document.querySelector('[data-ds-shell-context-nav]');
const shellPages = document.querySelectorAll('[data-shell-page]');
const secondaryTopbarSlot = document.querySelector('[data-ds-secondary-topbar]');
const secondaryTopbarRoot = secondaryTopbarSlot ? createRoot(secondaryTopbarSlot) : null;

const renderSecondaryTopbar = (activeItem) => {
  const topbar = secondaryTopbarByPage[activeItem.page] ?? secondaryTopbarByPage.analytics;

  secondaryTopbarRoot?.render(React.createElement(SecondaryTopbar, {
    ...topbar,
    className: 'frgm-app-secondary-topbar-surface',
  }));
};

const setShellPage = (activeItem) => {
  shellPages.forEach((page) => {
    page.hidden = page.dataset.shellPage !== activeItem.page;
  });

  renderSecondaryTopbar(activeItem);

  shellContextNav?.querySelectorAll('[data-shell-context-item]').forEach((button) => {
    if (button.dataset.shellContextItem === activeItem.label) {
      button.setAttribute('aria-current', 'page');
    } else {
      button.removeAttribute('aria-current');
    }
  });
};

const createShellContextItem = (item) => React.createElement(
  'button',
  {
    className: 'frgm-app-context-item',
    type: 'button',
    'data-shell-context-item': item.label,
    'data-shell-context-page': item.page,
    'aria-current': item.active ? 'page' : undefined,
    onClick: () => setShellPage(item),
  },
  React.createElement('span', null, item.label),
  React.createElement('span', null, item.count),
);

if (shellContextNav) {
  createRoot(shellContextNav).render(shellContextItems.map((item) => (
    React.cloneElement(createShellContextItem(item), { key: item.label })
  )));
  setShellPage(shellContextItems.find((item) => item.active) ?? shellContextItems[0]);
}

const contextOverlay = document.querySelector('[data-context-overlay]');
const contextClosers = document.querySelectorAll('[data-context-close]');
const contextPanelTitle = document.querySelector('[data-context-panel-title]');
const contextPanelDescription = document.querySelector('[data-context-panel-description]');
const contextPanelContent = document.querySelectorAll('[data-context-panel-content]');

const contextPanelCopy = {
  recommendation: {
    title: 'Recommendation context',
    description: 'Reusable right panel for selected rows, charts, segments, journey nodes, and AI recommendations.',
  },
  notifications: {
    title: 'Notifications',
    description: 'Workspace alerts, sync status, and review items.',
  },
};

const setContextPanelContent = (target = 'recommendation') => {
  const copy = contextPanelCopy[target] ?? contextPanelCopy.recommendation;

  if (contextPanelTitle) {
    contextPanelTitle.textContent = copy.title;
  }

  if (contextPanelDescription) {
    contextPanelDescription.textContent = copy.description;
  }

  contextPanelContent.forEach((panel) => {
    panel.hidden = panel.dataset.contextPanelContent !== target;
  });
};

const setContextPanelOpen = (isOpen, target = 'recommendation') => {
  if (!contextOverlay) {
    return;
  }

  if (isOpen) {
    setContextPanelContent(target);
  }

  contextOverlay.classList.toggle('is-open', isOpen);
  contextOverlay.setAttribute('aria-hidden', String(!isOpen));
  document.querySelectorAll('[data-context-open]').forEach((trigger) => {
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
};

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-context-open]');

  if (trigger) {
    setContextPanelOpen(true, trigger.dataset.contextPanelTarget || 'recommendation');
  }
});

contextClosers.forEach((trigger) => {
  trigger.addEventListener('click', () => setContextPanelOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contextOverlay?.classList.contains('is-open')) {
    setContextPanelOpen(false);
  }
});

setContextPanelOpen(false);

document.querySelectorAll('[data-ds-icon-slot]').forEach(renderIconSlot);
document.querySelectorAll('[data-ds-brand-slot]').forEach(renderBrandSlot);
document.querySelectorAll('[data-ds-dropdown-slot]').forEach(renderDropdownSlot);
document.querySelectorAll('[data-ds-search-slot]').forEach(renderSearchSlot);
document.querySelectorAll('[data-ds-search-demo]').forEach(renderSearchDemo);
initializeDropdownDismissal();
