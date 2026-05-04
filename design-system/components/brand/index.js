'use client';

import React from 'react';

const markPath = React.createElement(React.Fragment, null,
  React.createElement('path', { d: 'M0 39L8.48026 34.1265L0 29.251V39Z', fill: '#A8E300' }),
  React.createElement('path', { d: 'M16.9605 34.1264L0 24.3755L8.48026 19.5L25.4408 29.251L16.9605 34.1264Z', fill: '#A8E300' }),
  React.createElement('path', { d: 'M16.9605 4.87548L25.4408 9.75095L33.9211 14.6245L25.4408 19.5L0 4.87548L8.48026 0L16.9605 4.87548Z', fill: '#A8E300' }),
);

const sidebarTilePath = React.createElement(React.Fragment, null,
  React.createElement('rect', { width: 40, height: 40, rx: 10, fill: '#012815' }),
  React.createElement('path', { d: 'M10.91 30.86L16.056 27.912L10.91 24.963V30.86Z', fill: '#DBFF38' }),
  React.createElement('path', { d: 'M21.202 27.913L10.909 22.015L16.055 19.067L26.349 24.964L21.202 27.913Z', fill: '#DBFF38' }),
  React.createElement('path', { d: 'M21.202 10.221L26.349 13.171L31.496 16.118L26.349 19.066L10.909 10.221L16.056 7.273L21.202 10.221Z', fill: '#DBFF38' }),
);

export function FragmaticMark({ title = 'Fragmatic', className = '' }) {
  return React.createElement(
    'svg',
    {
      className,
      width: 34,
      height: 39,
      viewBox: '0 0 34 39',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      role: title ? 'img' : undefined,
      'aria-label': title || undefined,
      'aria-hidden': title ? undefined : 'true',
    },
    markPath,
  );
}

export function FragmaticSidebarTile({ title = 'Fragmatic', className = '' }) {
  return React.createElement(
    'svg',
    {
      className,
      width: 40,
      height: 40,
      viewBox: '0 0 40 40',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      role: title ? 'img' : undefined,
      'aria-label': title || undefined,
      'aria-hidden': title ? undefined : 'true',
    },
    sidebarTilePath,
  );
}

export function BrandLogoButton({
  href,
  label = 'Fragmatic',
  showWordmark = true,
  LinkComponent = 'a',
  className = '',
  ...props
}) {
  const Comp = href ? LinkComponent : 'button';
  const linkProps = href ? { href } : { type: 'button' };

  return React.createElement(
    Comp,
    {
      ...linkProps,
      ...props,
      className: ['frgm-brand-button', className].filter(Boolean).join(' '),
      'aria-label': label,
    },
    React.createElement('span', { className: 'frgm-brand-mark' }, React.createElement(FragmaticMark, { title: '' })),
    showWordmark
      ? React.createElement('span', { className: 'frgm-brand-name' }, label)
      : null,
  );
}

export const brandAssets = {
  mark: '@fragmatic/design-system/assets/brand/fragmatic-mark.svg',
  sidebarTile: '@fragmatic/design-system/assets/brand/fragmatic-sidebar-tile.svg',
  wordmark: '@fragmatic/design-system/assets/brand/fragmatic-wordmark.svg',
};

export const brandLogoItems = [
  {
    key: 'mark',
    label: 'Fragmatic mark',
    source: brandAssets.mark,
    usage: 'Standalone identity mark for compact surfaces.',
  },
  {
    key: 'sidebarTile',
    label: 'Sidebar tile',
    source: brandAssets.sidebarTile,
    usage: 'Primary sidebar logo with dashboard-matched 40px tile treatment.',
  },
  {
    key: 'wordmark',
    label: 'Wordmark',
    source: brandAssets.wordmark,
    usage: 'Full Fragmatic wordmark for auth, empty states, and non-shell brand moments.',
  },
];
