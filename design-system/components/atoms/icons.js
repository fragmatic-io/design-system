import React from 'react';

const svg = (path, viewBox = '0 0 16 16') =>
  React.createElement(
    'svg',
    {
      viewBox,
      width: '1em',
      height: '1em',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      focusable: 'false',
    },
    path,
  );

export const icons = {
  anchor: svg([
    React.createElement('circle', { key: 'c', cx: 8, cy: 5, r: 2.5 }),
    React.createElement('path', { key: 'p', d: 'M8 7.5v6M4.5 10.5C5.2 12.2 6.4 13 8 13s2.8-.8 3.5-2.5' }),
  ]),
  chevronDown: svg(React.createElement('path', { d: 'M4 6l4 4 4-4' })),
  chevronRight: svg(React.createElement('path', { d: 'M6 4l4 4-4 4' })),
  arrowUpBig: svg(React.createElement('path', { d: 'M8 13V3M4 7l4-4 4 4' })),
  arrowDownBig: svg(React.createElement('path', { d: 'M8 3v10M4 9l4 4 4-4' })),
  arrowRightBig: svg(React.createElement('path', { d: 'M3 8h10M9 4l4 4-4 4' })),
  arrowUpRight: svg(React.createElement('path', { d: 'M5 11l6-6M6 5h5v5' })),
  arrowDownRight: svg(React.createElement('path', { d: 'M5 5l6 6M11 6v5H6' })),
  dot: React.createElement('span', {
    'aria-hidden': 'true',
    className: 'frgm-icon-dot',
  }),
  search: svg([
    React.createElement('circle', { key: 'c', cx: 7, cy: 7, r: 4.5 }),
    React.createElement('path', { key: 'p', d: 'M11 11l3 3' }),
  ]),
};
