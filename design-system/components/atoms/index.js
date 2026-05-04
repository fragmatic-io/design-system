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
  shortcut,
  className = '',
  ...props
}) {
  return React.createElement(
    'label',
    { className: cx('frgm-search', className) },
    icons.search,
    React.createElement('span', { style: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' } }, label),
    React.createElement('input', { ...props, type: 'search', value, defaultValue, onChange, placeholder }),
    shortcut && React.createElement('kbd', null, shortcut),
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

const dateRangeToday = new Date(2026, 4, 4);
const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthShortLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const msPerDay = 24 * 60 * 60 * 1000;

const cloneDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const addMonths = (date, months) => new Date(date.getFullYear(), date.getMonth() + months, 1);
const addYears = (date, years) => new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
const daysBetween = (start, end) => Math.max(1, Math.round((cloneDate(end) - cloneDate(start)) / msPerDay) + 1);
const dateKey = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
].join('-');
const formatDateLabel = (date) => `${monthShortLabels[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
const formatRangeLabel = ({ start, end }) => (
  start.getFullYear() === end.getFullYear()
    ? `${start.getDate()} ${monthShortLabels[start.getMonth()]}-${end.getDate()} ${monthShortLabels[end.getMonth()]} ${end.getFullYear()}`
    : `${formatDateLabel(start)}-${formatDateLabel(end)}`
);
const labelToPresetKey = (label) => ({
  'Last 7 Days': '7d',
  'Last 14 Days': '14d',
  'Last 28 Days': '28d',
  'Last 30 Days': '30d',
  'Last 90 Days': '90d',
}[label]);
const presetRangeByKey = (key, fallbackRange) => {
  const daysByKey = { '7d': 7, '14d': 14, '28d': 28, '30d': 30, '90d': 90 };
  const days = daysByKey[key];

  if (!days) {
    return fallbackRange ?? { start: addDays(dateRangeToday, -89), end: cloneDate(dateRangeToday) };
  }

  return { start: addDays(dateRangeToday, -(days - 1)), end: cloneDate(dateRangeToday) };
};
const compareRangeByKey = (key, range) => {
  const duration = daysBetween(range.start, range.end);

  if (key === 'last_year_match_day' || key === 'last_year') {
    return { start: addYears(range.start, -1), end: addYears(range.end, -1) };
  }

  if (key === 'custom') {
    return { start: addDays(range.start, -(duration * 2)), end: addDays(range.start, -(duration + 1)) };
  }

  return { start: addDays(range.start, -duration), end: addDays(range.end, -duration) };
};
const normalizeRange = (start, end) => (
  dateKey(start) <= dateKey(end) ? { start, end } : { start: end, end: start }
);

export function DateRangeControl({
  label = 'Last 90 Days',
  dateRange = '4 Feb-4 May 2026',
  compareRange,
  presets = [
    { key: '7d', label: 'Last 7 Days' },
    { key: '14d', label: 'Last 14 Days' },
    { key: '28d', label: 'Last 28 Days' },
    { key: '30d', label: 'Last 30 Days' },
    { key: '90d', label: 'Last 90 Days' },
    { key: 'custom', label: 'Custom' },
  ],
  comparisonOptions = [
    { key: 'prev_match_day', label: 'Preceding period (match day of week)' },
    { key: 'last_year_match_day', label: 'Same period last year (match day of week)' },
    { key: 'prev_period', label: 'Preceding period' },
    { key: 'last_year', label: 'Same period last year' },
    { key: 'custom', label: 'Custom' },
  ],
  onPresetSelect,
  onDateClick,
  onApply,
  align = 'auto',
  defaultCompare = false,
  className = '',
}) {
  const rootRef = React.useRef(null);
  const initialRange = React.useMemo(() => presetRangeByKey(labelToPresetKey(label) ?? '90d'), [label]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [resolvedAlign, setResolvedAlign] = React.useState(align === 'end' ? 'end' : 'start');
  const [resolvedPlacement, setResolvedPlacement] = React.useState('bottom');
  const [isConstrained, setIsConstrained] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState(label);
  const [range, setRange] = React.useState(initialRange);
  const [isCompare, setIsCompare] = React.useState(!!compareRange || defaultCompare);
  const [selectedCompare, setSelectedCompare] = React.useState(comparisonOptions[0]?.key);
  const [activeBoundary, setActiveBoundary] = React.useState('start');
  const [visibleMonth, setVisibleMonth] = React.useState(new Date(initialRange.start.getFullYear(), initialRange.start.getMonth(), 1));
  const [periodMenu, setPeriodMenu] = React.useState(null);
  const compareRangeSelection = compareRangeByKey(selectedCompare, range);
  const rangeLabel = formatRangeLabel(range);
  const compareRangeLabel = formatRangeLabel(compareRangeSelection);
  const buildCalendarMonth = ({ key, label: monthLabel, year, month }) => {
    const firstOfMonth = new Date(year, month, 1);
    const firstVisible = new Date(year, month, 1 - firstOfMonth.getDay());
    const rangeStartKey = dateKey(range.start);
    const rangeEndKey = dateKey(range.end);
    const compareStartKey = dateKey(compareRangeSelection.start);
    const compareEndKey = dateKey(compareRangeSelection.end);

    return {
      key,
      label: monthLabel,
      days: Array.from({ length: 42 }, (_, index) => {
        const date = new Date(firstVisible);
        date.setDate(firstVisible.getDate() + index);
        const dayKey = dateKey(date);

        return {
          key: `${key}-${dayKey}`,
          label: String(date.getDate()),
          muted: date.getMonth() !== month,
          date,
          selection: dayKey >= rangeStartKey && dayKey <= rangeEndKey,
          selectionStart: dayKey === rangeStartKey,
          selectionEnd: dayKey === rangeEndKey,
          compare: dayKey >= compareStartKey && dayKey <= compareEndKey,
          compareStart: dayKey === compareStartKey,
          compareEnd: dayKey === compareEndKey,
        };
      }),
    };
  };
  const calendarMonths = [
    addMonths(visibleMonth, -1),
    visibleMonth,
    addMonths(visibleMonth, 1),
  ].map((monthDate) => buildCalendarMonth({
    key: dateKey(monthDate).slice(0, 7),
    label: `${monthShortLabels[monthDate.getMonth()]} ${monthDate.getFullYear()}`,
    year: monthDate.getFullYear(),
    month: monthDate.getMonth(),
  }));
  const monthOptions = monthLabels.map((monthLabel, index) => ({ label: monthLabel, value: index }));
  const yearOptions = Array.from({ length: 5 }, (_, index) => visibleMonth.getFullYear() - 2 + index);
  const setVisibleMonthValue = (nextMonth, nextYear = visibleMonth.getFullYear()) => {
    setVisibleMonth(new Date(nextYear, nextMonth, 1));
    setPeriodMenu(null);
  };
  const setDateBoundary = (date) => {
    const pickedDate = cloneDate(date);

    if (activeBoundary === 'start') {
      setRange(normalizeRange(pickedDate, range.end));
      setActiveBoundary('end');
      return;
    }

    setRange(normalizeRange(range.start, pickedDate));
    setActiveBoundary('start');
  };
  const choosePreset = (preset) => {
    const presetLabel = typeof preset === 'string' ? preset : preset.label;
    const presetKey = typeof preset === 'string' ? labelToPresetKey(preset) : preset.key;
    const nextRange = presetRangeByKey(presetKey, range);

    setSelectedLabel(presetLabel);
    setRange(nextRange);
    setVisibleMonth(new Date(nextRange.start.getFullYear(), nextRange.start.getMonth(), 1));
    setActiveBoundary('start');
    onPresetSelect?.(preset);
  };
  const periodMenuContent = periodMenu === 'month' ? monthOptions : yearOptions.map((year) => ({ label: String(year), value: year }));
  const renderPeriodMenu = periodMenu && React.createElement(
    'div',
    { className: 'frgm-date-range-period-menu', 'data-menu': periodMenu },
    ...periodMenuContent.map((item) => {
      const isMonth = periodMenu === 'month';
      const activeValue = isMonth ? visibleMonth.getMonth() : visibleMonth.getFullYear();
      return React.createElement(
        'button',
        {
          key: item.value,
          type: 'button',
          'data-active': item.value === activeValue ? 'true' : undefined,
          onClick: () => (isMonth ? setVisibleMonthValue(item.value) : setVisibleMonthValue(visibleMonth.getMonth(), item.value)),
        },
        item.label,
      );
    }),
  );
  const presetItems = presets.map((preset) => {
    const presetLabel = typeof preset === 'string' ? preset : preset.label;

    return {
      key: typeof preset === 'string' ? preset : preset.key ?? preset.label,
      label: presetLabel,
    };
  });

  React.useEffect(() => {
    setSelectedLabel(label);
    setRange(initialRange);
    setVisibleMonth(new Date(initialRange.start.getFullYear(), initialRange.start.getMonth(), 1));
  }, [initialRange, label]);

  React.useEffect(() => {
    const closeOnOutsidePointerDown = (event) => {
      const root = rootRef.current;

      if (!isOpen || root?.contains(event.target)) {
        return;
      }

      setIsOpen(false);
      setPeriodMenu(null);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const scroller = rootRef.current?.querySelector('.frgm-date-range-month');
      const currentMonth = rootRef.current?.querySelector('[data-current-month="true"]');
      const selectionStart = rootRef.current?.querySelector('[data-selection-start="true"]');
      const target = selectionStart || currentMonth;

      if (scroller && target) {
        const centeredOffset = target.offsetTop - scroller.offsetTop - (scroller.clientHeight / 2);
        scroller.scrollTop = Math.max(0, centeredOffset);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, range, visibleMonth]);

  React.useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePopoverAlignment = () => {
      const root = rootRef.current;
      const popover = root?.querySelector('.frgm-date-range-popover');

      if (!root || !popover || typeof window === 'undefined') {
        return;
      }

      const rootRect = root.getBoundingClientRect();
      const popoverWidth = popover.getBoundingClientRect().width;
      const popoverHeight = popover.getBoundingClientRect().height;
      const viewportPadding = 16;
      const wouldOverflowRight = rootRect.left + popoverWidth > window.innerWidth - viewportPadding;
      const fitsFromRightEdge = rootRect.right - popoverWidth >= viewportPadding;
      const availableBelow = window.innerHeight - rootRect.bottom - viewportPadding;
      const availableAbove = rootRect.top - viewportPadding;
      const nextPlacement = availableBelow < Math.min(popoverHeight, 420) && availableAbove > availableBelow ? 'top' : 'bottom';
      const availableHeight = nextPlacement === 'top' ? availableAbove : availableBelow;

      setResolvedAlign(align !== 'auto' ? (align === 'end' ? 'end' : 'start') : (wouldOverflowRight && fitsFromRightEdge ? 'end' : 'start'));
      setResolvedPlacement(nextPlacement);
      setIsConstrained(availableHeight < popoverHeight);
      root.style.setProperty('--frgm-date-range-popover-available-h', `${Math.max(320, availableHeight)}px`);
    };

    updatePopoverAlignment();
    window.addEventListener('resize', updatePopoverAlignment);

    return () => window.removeEventListener('resize', updatePopoverAlignment);
  }, [align, isOpen]);

  const applySelection = () => {
    onApply?.({ label: selectedLabel, dateRange: rangeLabel, compareRange: isCompare ? compareRangeLabel : undefined, isCompare, compareKey: selectedCompare });
    setIsOpen(false);
  };

  const cancelSelection = () => {
    setSelectedLabel(label);
    setRange(initialRange);
    setIsCompare(!!compareRange || defaultCompare);
    setSelectedCompare(comparisonOptions[0]?.key);
    setVisibleMonth(new Date(initialRange.start.getFullYear(), initialRange.start.getMonth(), 1));
    setActiveBoundary('start');
    setPeriodMenu(null);
    setIsOpen(false);
  };

  return React.createElement(
    'div',
    {
      ref: rootRef,
      className: cx('frgm-date-range-control', className),
      'data-align': resolvedAlign,
      'data-placement': resolvedPlacement,
      'data-constrained': isConstrained ? 'true' : undefined,
      'data-open': isOpen ? 'true' : undefined,
      'data-compare': isCompare ? 'true' : undefined,
      'data-selected': selectedLabel ? 'true' : undefined,
    },
    React.createElement(
      'button',
      {
        className: 'frgm-date-range-preset-trigger',
        type: 'button',
        onClick: () => setIsOpen(true),
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
      },
      React.createElement('span', null, selectedLabel),
      React.createElement('span', { className: 'frgm-date-range-chevron' }, icons.chevronDown),
    ),
    React.createElement(
      'button',
      {
        className: 'frgm-date-range-display',
        type: 'button',
        onClick: (event) => {
          setIsOpen(true);
          onDateClick?.(event);
        },
        'aria-label': `Date range ${rangeLabel}`,
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
      },
      React.createElement(
        'span',
        { className: 'frgm-date-range-primary' },
        React.createElement('span', { className: 'frgm-date-range-icon' }, icons.calendar),
        React.createElement('span', null, rangeLabel),
      ),
      isCompare && React.createElement(
        'span',
        { className: 'frgm-date-range-compare' },
        React.createElement('span', null, 'Compare :'),
        React.createElement('span', null, compareRangeLabel),
      ),
    ),
    isOpen && React.createElement(
      'div',
      { className: 'frgm-date-range-popover', role: 'dialog', 'aria-label': 'Date range picker' },
      React.createElement(
        'aside',
        { className: 'frgm-date-range-shortcuts' },
        React.createElement(
          'ul',
          { className: 'frgm-date-range-shortcut-list' },
          ...presetItems.map((item) => React.createElement(
            'li',
            { key: item.key },
            React.createElement(
              'button',
              {
                className: 'frgm-date-range-shortcut',
                type: 'button',
                'data-active': item.label === selectedLabel ? 'true' : undefined,
                onClick: () => choosePreset(item),
              },
              item.label,
            ),
          )),
        ),
        React.createElement(
          'div',
          { className: 'frgm-date-range-compare-toggle' },
          React.createElement('span', null, 'Compare'),
          React.createElement(
            'label',
            { className: 'frgm-date-range-switch' },
            React.createElement('input', { type: 'checkbox', checked: isCompare, onChange: (event) => setIsCompare(event.target.checked) }),
            React.createElement('span', null),
          ),
        ),
        isCompare && React.createElement(
          'ul',
          { className: 'frgm-date-range-shortcut-list', 'data-compare': 'true' },
          ...comparisonOptions.map((item) => React.createElement(
            'li',
            { key: item.key },
            React.createElement(
              'button',
              {
                className: 'frgm-date-range-shortcut',
                type: 'button',
                'data-active': item.key === selectedCompare ? 'true' : undefined,
                onClick: () => setSelectedCompare(item.key),
              },
              item.label,
            ),
          )),
        ),
      ),
      React.createElement(
        'section',
        { className: 'frgm-date-range-calendar' },
        React.createElement(
          'div',
          { className: 'frgm-date-range-fields' },
          React.createElement(
            'div',
            { className: 'frgm-date-range-field-head' },
            React.createElement('span', null),
            React.createElement('span', null, 'Start date'),
            React.createElement('span', null, 'End date'),
          ),
          React.createElement(
            'div',
            { className: 'frgm-date-range-field-row', role: 'group', 'aria-label': 'Selected date range' },
            React.createElement('span', { className: 'frgm-date-range-field-label' }, 'Range'),
            React.createElement('button', { type: 'button', 'data-active': activeBoundary === 'start' ? 'true' : undefined, onClick: () => setActiveBoundary('start') }, formatDateLabel(range.start)),
            React.createElement('button', { type: 'button', 'data-active': activeBoundary === 'end' ? 'true' : undefined, onClick: () => setActiveBoundary('end') }, formatDateLabel(range.end)),
          ),
          isCompare && React.createElement(
            'div',
            { className: 'frgm-date-range-field-row', 'data-variant': 'compare', role: 'group', 'aria-label': 'Compare date range' },
            React.createElement('span', { className: 'frgm-date-range-field-label' }, 'Compare'),
            React.createElement('button', { type: 'button' }, formatDateLabel(compareRangeSelection.start)),
            React.createElement('button', { type: 'button' }, formatDateLabel(compareRangeSelection.end)),
          ),
        ),
        React.createElement(
          'div',
          { className: 'frgm-date-range-month-nav' },
          React.createElement('button', { className: 'frgm-date-range-nav-button', type: 'button', 'aria-label': 'Previous month', onClick: () => setVisibleMonth(addMonths(visibleMonth, -1)) }, '‹'),
          React.createElement(
            'button',
            { className: 'frgm-date-range-period-button', type: 'button', 'aria-label': 'Choose month', 'aria-expanded': periodMenu === 'month', onClick: () => setPeriodMenu(periodMenu === 'month' ? null : 'month') },
            React.createElement('span', null, monthLabels[visibleMonth.getMonth()]),
            React.createElement('span', { className: 'frgm-date-range-period-chevron' }, icons.chevronDown),
          ),
          React.createElement(
            'button',
            { className: 'frgm-date-range-period-button', type: 'button', 'aria-label': 'Choose year', 'aria-expanded': periodMenu === 'year', onClick: () => setPeriodMenu(periodMenu === 'year' ? null : 'year') },
            React.createElement('span', null, String(visibleMonth.getFullYear())),
            React.createElement('span', { className: 'frgm-date-range-period-chevron' }, icons.chevronDown),
          ),
          React.createElement('button', { className: 'frgm-date-range-nav-button', type: 'button', 'aria-label': 'Next month', onClick: () => setVisibleMonth(addMonths(visibleMonth, 1)) }, '›'),
          renderPeriodMenu,
        ),
        React.createElement(
          'div',
          { className: 'frgm-date-range-weekdays' },
          ...['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => React.createElement('span', { key: day }, day)),
        ),
        React.createElement(
          'div',
          { className: 'frgm-date-range-month' },
          ...calendarMonths.map((month) => React.createElement(
            'section',
            {
              className: 'frgm-date-range-month-section',
              key: month.key,
              'data-current-month': month.key === dateKey(visibleMonth).slice(0, 7) ? 'true' : undefined,
            },
            React.createElement('b', null, month.label),
            React.createElement(
              'div',
              { className: 'frgm-date-range-days' },
              ...month.days.map((day) => React.createElement(
                'button',
                {
                  key: day.key,
                  type: 'button',
                  'data-muted': day.muted ? 'true' : undefined,
                  'data-selection': day.selection ? 'true' : undefined,
                  'data-selection-start': day.selectionStart ? 'true' : undefined,
                  'data-selection-end': day.selectionEnd ? 'true' : undefined,
                  'data-compare': isCompare && day.compare ? 'true' : undefined,
                  'data-compare-start': isCompare && day.compareStart ? 'true' : undefined,
                  'data-compare-end': isCompare && day.compareEnd ? 'true' : undefined,
                  onClick: () => setDateBoundary(day.date),
                },
                day.label,
              )),
            ),
          )),
        ),
        React.createElement(
          'div',
          { className: 'frgm-date-range-footer' },
          React.createElement('button', { type: 'button', onClick: cancelSelection }, 'Cancel'),
          React.createElement('button', { type: 'button', onClick: applySelection }, 'Apply'),
        ),
      ),
    ),
  );
}

export function SecondaryTopbar({
  breadcrumbPath = [{ label: 'Analytics' }, { label: 'Overview' }],
  datePreset = 'Last 90 Days',
  dateRange = '4 Feb-4 May 2026',
  compareRange,
  presets,
  onPresetSelect,
  className = '',
  actions,
}) {
  return React.createElement(
    'section',
    {
      className: cx('frgm-secondary-topbar', className),
      'aria-label': 'Current page context',
    },
    React.createElement(
      'nav',
      { className: 'frgm-secondary-topbar-breadcrumb', 'aria-label': 'Breadcrumb' },
      breadcrumbPath.map((item, index) => {
        const isLast = index === breadcrumbPath.length - 1;
        return React.createElement(
          React.Fragment,
          { key: `${item.label}-${index}` },
          React.createElement(isLast ? 'b' : 'span', null, item.label),
          !isLast && React.createElement('span', { 'aria-hidden': 'true' }, '›'),
        );
      }),
    ),
    React.createElement(
      'div',
      { className: 'frgm-secondary-topbar-controls' },
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
