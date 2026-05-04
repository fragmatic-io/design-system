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

export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  children,
  className = '',
}) {
  return React.createElement(
    'label',
    { className: cx('frgm-field', className), htmlFor: id },
    label && React.createElement(
      'span',
      { className: 'frgm-field-label' },
      label,
      required && React.createElement('span', { className: 'frgm-field-required', 'aria-hidden': 'true' }, ' *'),
    ),
    children,
    error
      ? React.createElement('span', { className: 'frgm-field-error' }, error)
      : hint && React.createElement('span', { className: 'frgm-field-hint' }, hint),
  );
}

export function TextInput({
  id,
  label,
  hint,
  error,
  required = false,
  type = 'text',
  className = '',
  inputClassName = '',
  ...props
}) {
  return React.createElement(
    Field,
    { id, label, hint, error, required, className },
    React.createElement('input', {
      ...props,
      id,
      type,
      required,
      'aria-invalid': error ? 'true' : undefined,
      className: cx('frgm-input', inputClassName),
    }),
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required = false,
  options = [],
  className = '',
  selectClassName = '',
  children,
  ...props
}) {
  return React.createElement(
    Field,
    { id, label, hint, error, required, className },
    React.createElement(
      'select',
      {
        ...props,
        id,
        required,
        'aria-invalid': error ? 'true' : undefined,
        className: cx('frgm-select', selectClassName),
      },
      children ?? options.map((option) => React.createElement(
        'option',
        {
          key: option.value ?? option.label ?? option,
          value: option.value ?? option,
        },
        option.label ?? option,
      )),
    ),
  );
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  required = false,
  className = '',
  textareaClassName = '',
  ...props
}) {
  return React.createElement(
    Field,
    { id, label, hint, error, required, className },
    React.createElement('textarea', {
      ...props,
      id,
      required,
      'aria-invalid': error ? 'true' : undefined,
      className: cx('frgm-textarea', textareaClassName),
    }),
  );
}

export function FieldGroup({
  legend,
  description,
  layout = 'stack',
  children,
  className = '',
}) {
  return React.createElement(
    'fieldset',
    { className: cx('frgm-field-group', className), 'data-layout': layout },
    legend && React.createElement('legend', { className: 'frgm-field-legend' }, legend),
    description && React.createElement('span', { className: 'frgm-field-description' }, description),
    React.createElement('div', { className: 'frgm-field-group-body' }, children),
  );
}

export function FieldRow({ children, className = '' }) {
  return React.createElement('div', { className: cx('frgm-field-row', className) }, children);
}

export function CheckboxField({ label, className = '', ...props }) {
  return React.createElement(
    'label',
    { className: cx('frgm-choice', className) },
    React.createElement('input', { ...props, type: 'checkbox' }),
    React.createElement('span', null, label),
  );
}

export function RadioField({ label, className = '', ...props }) {
  return React.createElement(
    'label',
    { className: cx('frgm-choice', className) },
    React.createElement('input', { ...props, type: 'radio' }),
    React.createElement('span', null, label),
  );
}

export function ToggleField({ label, className = '', ...props }) {
  return React.createElement(
    'label',
    { className: cx('frgm-toggle-field', className) },
    React.createElement('input', { ...props, type: 'checkbox' }),
    React.createElement('span', null, label),
  );
}

export function DropdownMenu({
  label = 'Menu',
  caption,
  meta,
  initials,
  icon,
  items = [],
  variant = 'default',
  align = 'start',
  className = '',
}) {
  const isCompactTrigger = ['icon', 'avatar'].includes(variant);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    const closeOnOutsidePointerDown = (event) => {
      const root = rootRef.current;

      if (!root?.open || root.contains(event.target)) {
        return;
      }

      root.open = false;
    };

    document.addEventListener('pointerdown', closeOnOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown);
  }, []);

  return React.createElement(
    'details',
    { ref: rootRef, className: cx('frgm-dropdown', className), 'data-align': align },
    React.createElement(
      'summary',
      { className: 'frgm-dropdown-trigger', 'data-variant': variant },
      icon && React.createElement('span', { className: 'frgm-dropdown-trigger-icon' }, icon),
      initials && React.createElement('span', { className: 'frgm-dropdown-avatar' }, initials),
      !isCompactTrigger && React.createElement(
        'span',
        { className: 'frgm-dropdown-trigger-copy' },
        React.createElement('span', { className: 'frgm-dropdown-label' }, label),
        caption && React.createElement('span', { className: 'frgm-dropdown-caption' }, caption),
      ),
      !isCompactTrigger && meta && React.createElement('span', { className: 'frgm-dropdown-meta' }, meta),
      !isCompactTrigger && React.createElement('span', { className: 'frgm-dropdown-chevron' }, icons.chevronDown),
    ),
    React.createElement(
      'div',
      { className: 'frgm-dropdown-panel', role: 'menu' },
      items.map((item, index) => {
        if (item.type === 'separator') {
          return React.createElement('span', { key: `separator-${index}`, className: 'frgm-dropdown-separator', role: 'separator' });
        }

        const Element = item.href ? 'a' : 'button';
        return React.createElement(
          Element,
          {
            key: item.key ?? item.label ?? index,
            className: 'frgm-dropdown-item',
            href: item.href,
            type: item.href ? undefined : 'button',
            role: 'menuitem',
            'data-active': item.active ? 'true' : undefined,
            'data-danger': item.danger ? 'true' : undefined,
            onClick: (event) => {
              item.onClick?.(event);
              if (!event.defaultPrevented) {
                rootRef.current?.removeAttribute('open');
              }
            },
          },
          item.icon && React.createElement('span', { className: 'frgm-dropdown-item-icon' }, item.icon),
          React.createElement(
            'span',
            { className: 'frgm-dropdown-item-copy' },
            React.createElement('span', { className: 'frgm-dropdown-item-label' }, item.label),
            item.description && React.createElement('span', { className: 'frgm-dropdown-item-description' }, item.description),
          ),
          item.meta && React.createElement('span', { className: 'frgm-dropdown-item-meta' }, item.meta),
        );
      }),
    ),
  );
}

export function DateRangeControl({
  label = 'Last 90 Days',
  dateRange = '4 Feb-4 May 2026',
  compareRange,
  presets = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom range'],
  onPresetSelect,
  onDateClick,
  className = '',
}) {
  const [selectedLabel, setSelectedLabel] = React.useState(label);
  const presetItems = presets.map((preset) => {
    const presetLabel = typeof preset === 'string' ? preset : preset.label;

    return {
      key: typeof preset === 'string' ? preset : preset.key ?? preset.label,
      label: presetLabel,
      active: presetLabel === selectedLabel,
      onClick: () => {
        setSelectedLabel(presetLabel);
        onPresetSelect?.(preset);
      },
    };
  });

  return React.createElement(
    'div',
    { className: cx('frgm-date-range-control', className) },
    React.createElement(DropdownMenu, {
      label: selectedLabel,
      variant: 'date-range',
      items: presetItems,
      className: 'frgm-date-range-presets',
    }),
    React.createElement(
      'button',
      {
        className: 'frgm-date-range-display',
        type: 'button',
        onClick: onDateClick,
        'aria-label': `Date range ${dateRange}`,
      },
      React.createElement(
        'span',
        { className: 'frgm-date-range-primary' },
        React.createElement('span', { className: 'frgm-date-range-icon' }, icons.calendar),
        React.createElement('span', null, dateRange),
      ),
      compareRange && React.createElement(
        'span',
        { className: 'frgm-date-range-compare' },
        React.createElement('span', null, 'Compare :'),
        React.createElement('span', null, compareRange),
      ),
    ),
  );
}

export function SecondaryTopbar({
  title = 'Overview',
  datePreset = 'Last 90 Days',
  dateRange = '4 Feb-4 May 2026',
  compareRange,
  presets,
  expanded,
  defaultExpanded = true,
  onExpandedChange,
  onPresetSelect,
  className = '',
  actions,
}) {
  const isControlled = typeof expanded === 'boolean';
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);
  const isExpanded = isControlled ? expanded : internalExpanded;
  const setExpanded = (nextExpanded) => {
    if (!isControlled) {
      setInternalExpanded(nextExpanded);
    }

    onExpandedChange?.(nextExpanded);
  };

  return React.createElement(
    'section',
    {
      className: cx('frgm-secondary-topbar', className),
      'data-state': isExpanded ? 'expanded' : 'collapsed',
      'aria-label': 'Current page context',
    },
    React.createElement(
      'button',
      {
        className: 'frgm-secondary-topbar-toggle',
        type: 'button',
        'aria-expanded': isExpanded,
        'aria-label': isExpanded ? 'Collapse page context' : 'Expand page context',
        onClick: () => setExpanded(!isExpanded),
      },
      icons.panelLeft,
    ),
    React.createElement(
      'div',
      { className: 'frgm-secondary-topbar-body' },
      React.createElement('h2', { className: 'frgm-secondary-topbar-title' }, title),
      React.createElement(DateRangeControl, {
        label: datePreset,
        dateRange,
        compareRange,
        presets,
        onPresetSelect,
      }),
    ),
    actions && React.createElement('div', { className: 'frgm-secondary-topbar-actions' }, actions),
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
  const sizeMap = {
    small: 'var(--frgm-loader-size-sm)',
    default: 'var(--frgm-loader-size-md)',
    large: 'var(--frgm-loader-size-lg)',
  };
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
