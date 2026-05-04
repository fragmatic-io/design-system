'use client';

import React from 'react';
import { icons } from './icons.js';

const cx = (...parts) => parts.filter(Boolean).join(' ');

const humanize = (value) =>
  typeof value === 'string'
    ? value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : value;

const truncate = (value, max = 15, visible = 15) => {
  if (typeof value !== 'string' || value.length <= max || visible >= value.length) {
    return { text: value, title: undefined };
  }
  return { text: `${value.slice(0, visible)}...`, title: value };
};

export { icons };

export function Button({
  label = 'Button',
  children,
  icon,
  isIcon = false,
  position = 'left',
  disabled = false,
  onclick,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  isLoading = false,
  isDropdown = false,
  ...props
}) {
  const resolvedIcon = icon ?? (isIcon ? icons.anchor : null);
  const handleClick = onClick ?? onclick;

  return React.createElement(
    'button',
    {
      ...props,
      type,
      disabled,
      onClick: disabled ? undefined : handleClick,
      className: cx('frgm-button', className),
      style,
      'data-variant': variant,
      'data-size': size,
      'aria-busy': isLoading || undefined,
    },
    position === 'left' && resolvedIcon && React.createElement('span', { className: 'frgm-button-icon' }, resolvedIcon),
    children ?? label,
    position === 'right' && resolvedIcon && React.createElement('span', { className: 'frgm-button-icon' }, resolvedIcon),
    isDropdown && React.createElement('span', { className: 'frgm-button-icon' }, icons.chevronDown),
  );
}

export function Badge({
  status = '',
  icon,
  label,
  isIconLeft = true,
  onHoverMessage,
  className = '',
}) {
  const normalizedStatus = String(status || label || '').toLowerCase();
  const showPercent = ['profit', 'loss', 'none'].includes(normalizedStatus);
  const iconNode = icon && React.createElement('span', { className: 'frgm-badge-icon' }, icon);

  return React.createElement(
    'span',
    {
      className: cx('frgm-badge', className),
      'data-status': normalizedStatus,
      title: onHoverMessage,
    },
    isIconLeft && iconNode,
    React.createElement('span', null, label, showPercent ? '%' : ''),
    !isIconLeft && iconNode,
  );
}

export function Breadcrumb({ breadcrumbPath = [{ label: 'Overview', href: '#' }], LinkComponent = 'a' }) {
  const path = breadcrumbPath.slice(-3);

  return React.createElement(
    'nav',
    { className: 'frgm-breadcrumb', 'aria-label': 'Breadcrumb' },
    React.createElement(
      'ol',
      null,
      ...path.map((item, index) => {
        const isLast = index === path.length - 1;
        return React.createElement(
          'li',
          { key: `${item?.href ?? item?.label}-${index}`, 'aria-current': isLast ? 'page' : undefined },
          isLast
            ? item?.label
            : React.createElement(LinkComponent, { href: item?.href ?? '#' }, item?.label),
          !isLast && React.createElement('span', { className: 'frgm-breadcrumb-sep' }, icons.chevronRight),
        );
      }),
    ),
  );
}

export function LinkButton({ label = 'link title', href = '#', icon, LinkComponent = 'a', className = '' }) {
  return React.createElement(
    LinkComponent,
    { href, className: cx('frgm-link-button', className) },
    label,
    icon && React.createElement('span', { className: 'frgm-button-icon' }, icon),
  );
}

export function Pill({ label, isActive = false, icon, className = '' }) {
  return React.createElement(
    'span',
    { className: cx('frgm-pill', className), 'data-active': String(!!isActive) },
    icon,
    React.createElement('span', null, label),
  );
}

export function ProfileTag({ value, className = '' }) {
  return React.createElement('span', { className: cx('frgm-profile-tag', className) }, value);
}

export function ProfitLose({ prvData = 0, currentData = 0, className = '' }) {
  const percentageChange = prvData === 0
    ? (currentData === 0 ? 0 : 100)
    : ((currentData - prvData) / Math.abs(prvData)) * 100;
  const isProfit = percentageChange >= 0;

  return React.createElement(
    'span',
    { className: cx('frgm-profit', className), 'data-direction': isProfit ? 'up' : 'down' },
    isProfit ? icons.arrowUpRight : icons.arrowDownRight,
    React.createElement('span', null, `${percentageChange.toFixed(1)}%`),
  );
}

export function SegmentStatus({ status = 'draft', className = '' }) {
  return React.createElement(
    'span',
    { className: cx('frgm-segment-status', className), 'data-status': String(status).toLowerCase() },
    icons.dot,
    React.createElement('span', null, status),
  );
}

export function ProgressBar({ data = 0, isDisplayData = true, color, className = '' }) {
  const value = Number.isFinite(Number(data)) ? Number(data) : 0;

  return React.createElement(
    'span',
    { className: cx('frgm-progress', className) },
    React.createElement('progress', { value, max: 100, style: color ? { '--color': color } : undefined }),
    isDisplayData && React.createElement('span', { className: 'frgm-progress-value' }, `${value}%`),
  );
}

export function SearchInput({
  value,
  defaultValue,
  onChange,
  placeholder = 'Search',
  label = 'Search',
  className = '',
  ...props
}) {
  return React.createElement(
    'label',
    { className: cx('frgm-search', className) },
    icons.search,
    React.createElement('span', { style: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' } }, label),
    React.createElement('input', { ...props, type: 'search', value, defaultValue, onChange, placeholder }),
  );
}

export function SwitchButton({ isAnd = true, setIsAnd, isDisabled = false, className = '' }) {
  const select = (value) => {
    if (!isDisabled) setIsAnd?.(value);
  };

  return React.createElement(
    'span',
    { className: cx('frgm-switch', className), role: 'group', 'aria-label': 'Match mode' },
    React.createElement('button', { type: 'button', disabled: isDisabled, 'aria-pressed': !!isAnd, onClick: () => select(true) }, 'All'),
    React.createElement('button', { type: 'button', disabled: isDisabled, 'aria-pressed': !isAnd, onClick: () => select(false) }, 'Any'),
  );
}

export function Loader({ size = 'default', color, className = '' }) {
  const sizeMap = { small: '1.1429rem', default: '2rem', large: '3rem' };
  const spinnerSize = typeof size === 'number' ? `${size}px` : sizeMap[size] ?? sizeMap.default;

  return React.createElement('span', {
    className: cx('frgm-spinner', className),
    role: 'status',
    'aria-label': 'Loading',
    style: { '--spinner-size': spinnerSize, ...(color ? { '--color': color } : {}) },
  });
}

export function TypingLoader({ color, className = '' }) {
  return React.createElement(
    'span',
    {
      className: cx('frgm-typing-loader', className),
      role: 'status',
      'aria-label': 'Typing',
      style: color ? { '--color': color } : undefined,
    },
    React.createElement('span', null),
    React.createElement('span', null),
    React.createElement('span', null),
  );
}

export function getCustomSpinner(size = 'default', color) {
  return React.createElement(Loader, { size, color });
}

export const customSpinner = getCustomSpinner();
export const typingLoader = React.createElement(TypingLoader);

export function MetaPill({ label, value, trend, highlight, className = '' }) {
  const formattedValue = humanize(value) || 'N/A';
  const { text, title } = truncate(formattedValue);
  const trendIcon = {
    up: icons.arrowUpBig,
    down: icons.arrowDownBig,
    same: icons.arrowRightBig,
  }[trend];

  return React.createElement(
    'span',
    { className: cx('frgm-meta-pill', className) },
    React.createElement('span', { className: 'frgm-meta-pill-label' }, humanize(label) || 'N/A'),
    React.createElement(
      'span',
      { className: 'frgm-meta-pill-value', title, 'data-highlight': highlight },
      trendIcon,
      React.createElement('span', null, text),
    ),
  );
}
