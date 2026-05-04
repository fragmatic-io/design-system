# Component Foundation Contracts

This document is the audit boundary for exported atoms. Components must consume foundations from `tokens/tokens.css`; if a component needs a new reusable value, add it to the foundation layer first, then reference it from component CSS.

## Foundation Layers

| Layer | Source | Purpose |
| --- | --- | --- |
| Brand color | `--emerald-*`, `--primary`, `--primary-hover`, `--primary-fg` | Brand actions, active states, selected pills, progress fill. |
| Surface | `--page-bg`, `--card-bg`, `--border-subtle` | Page, card, neutral control backgrounds, borders. |
| Text | `--text-title`, `--text-body`, `--text-caption`, `--text-meta`, `--gray-*` | Text hierarchy, inactive states, muted metadata. |
| Status | `--amber-*`, `--red-*`, `--lime-*`, `--blue-*` | Warning, error, positive/negative metric, focus ring. |
| Shape | `--r-4`, `--r-6`, `--r-pill`, `--frgm-control-radius`, `--frgm-pill-radius` | Control, segment, and pill shape. |
| Type | `--font-sans`, `--font-mono`, `--frgm-control-font-*`, `--frgm-pill-font-size` | Component text sizing and weights. |
| Spacing | `--space-*`, `--frgm-control-*`, `--frgm-inline-gap-*`, `--frgm-pill-pad-*` | Shared spacing scale, control dimensions, atom gaps, pill padding. |
| Motion/state | `--frgm-motion-*`, `--frgm-state-*` | Hover lift, transitions, loader timing, disabled opacity. |
| Iconography | `components/atoms/icons.js`, `--frgm-icon-size-*`, `--frgm-dot-size` | Package-local line icons and dot indicators. |
| Brand assets | `components/brand`, `assets/brand/*.svg`, `brandLogoItems` | Fragmatic mark, sidebar tile, and wordmark as reusable foundation items. |

The default light surface is the canvas surface from the tweaks model: `--page-bg: #f6f3ec`, `--card-bg: #fdfaf3`, and `--border-subtle: #e7e0cf`. Standalone previews, including the dedicated app shell page, must rely on these tokens instead of restamping their own surface values.

## Form Foundation

Forms use a composed foundation rather than one-off `.field` snippets. Use `Field`, `FieldRow`, and `FieldGroup` for structure; use `TextInput`, `SelectField`, `TextareaField`, `SearchInput`, `CheckboxField`, `RadioField`, and `ToggleField` for controls. Pattern previews should use the same `frgm-*` classes even when written as static HTML.

Form controls default to a neutral filled surface so they remain distinct from card surfaces, inherit density from the root rem scale, and share the primary border plus blue focus ring. Required, hint, invalid, disabled, checkbox, radio, and toggle states must be represented by atom classes and foundation tokens before being reused in components, patterns, charts, or inspectors.

## Dropdown Foundation

Dropdowns use `DropdownMenu` and the `.frgm-dropdown-*` classes. Domain switchers, profile menus, settings menus, and overflow menus should compose this atom instead of creating shell-local trigger, radius, panel, or menu item styles.

Dropdown triggers use the shared control radius and border tokens. The `domain`, `icon`, and `avatar` variants change content density only; they do not create new shape rules outside the atom foundation.

## Secondary Topbar Foundation

Dashboard-style page context bars use `SecondaryTopbar`, composed with `DateRangeControl`. Product shells should pass breadcrumb path, date preset, and date range through the component API instead of hand-maintaining breadcrumb/filter HTML in app shell patterns.

The app shell secondary topbar preserves the existing page breadcrumb and contextual action area; date fields are an additive control in the same row, not a replacement for the breadcrumb.

`DateRangeControl` follows the dashboard `DateRangeDropdown` behavior: preset shortcuts (`Last 7/14/28/30/90 Days`, `Custom`), compare toggle, comparison options, draft selection, cancel, and apply. The field area uses a compact Range row, a centered `vs` separator, and a Compare row when comparison is enabled. The dashboard code uses `react-date-range` with `date-fns`; the design-system component extracts that reusable UI contract while avoiding app-only Redux preference wiring.

`DateRangeControl` uses the dashboard-derived date range tokens in `tokens/tokens.css`: `--frgm-date-range-h`, `--frgm-date-range-min-width`, `--frgm-date-range-max-width`, `--frgm-date-range-pad-*`, `--frgm-date-range-popover-*`, `--frgm-date-range-panel-*`, `--frgm-date-range-border`, `--frgm-date-range-border-active`, `--frgm-date-range-divider`, `--frgm-date-range-text`, `--frgm-date-range-shadow`, `--frgm-date-range-surface`, `--frgm-date-range-field-*`, `--frgm-date-range-option-*`, and `--frgm-date-range-selection-*`. Do not resize this control with shell-local CSS.

Date range borders have three defined types: control border (`--frgm-date-range-border`), active/open control border (`--frgm-date-range-border-active`), and popover section border (`--frgm-date-range-popover-border`). Date field chips have normal and active definitions through `--frgm-date-range-field-chip-*`; selected range cells use `--frgm-date-range-selection-fill` with edge cells using `--frgm-date-range-edge-fill`. Spacing between the trigger and popover, shortcut rail, field area, calendar, and footer must come from the date-range spacing tokens, not component-local margins.

Date popovers must use the component `align` API (`auto`, `start`, or `end`) instead of preview or shell positioning overrides. `auto` is the default and resolves against the viewport so a date control placed near the right edge opens left without clipping, while left-side placements open from the left.

## Brand Logo Foundation

`components/brand` is the source of truth for Fragmatic logo usage. Reusable logo placements must use `FragmaticMark`, `FragmaticSidebarTile`, `BrandLogoButton`, `brandLogoItems`, or the exported raw SVG assets instead of hand-drawn inline marks or text placeholders.

The primary sidebar logo uses the dashboard-derived 40px tile treatment. Its shared CSS keeps the mark container at `40px` with `8px 10px` padding, matching the dashboard sidebar code.

## Icon Foundation

`components/atoms/icons.js` is the source of truth for reusable product icons. Add new icons there first, export them through the design-system package, and consume them by name from components, patterns, and previews. Do not paste inline SVG paths into product surfaces when the icon is reusable.

Icons must inherit `currentColor`, use the established icon size tokens where CSS controls sizing, and stay free of dashboard-local imports. One-off diagrams and chart illustrations can remain local to their example, but navigation, actions, statuses, and repeated product concepts belong in the icon module.

## App Shell Container Foundation

The app shell exposes one main-content container API: `.frgm-app-main-container[data-width='full' | 'narrow']`. Use `full` for data-heavy dashboards, tables, charts, canvases, and recommendation workspaces that need all available horizontal space. Use `narrow` for settings, forms, and low-density configuration pages that should be centered for readability.

Only one app-shell page container should be visible for a selected context navigation item. Context navigation owns page switching; previews and product shells should drive labels, counts, active state, target page, and container width from a component/data map instead of hand-maintained HTML.

## Atom Contracts

| Atom | Foundation Inputs | State Rules | Notes |
| --- | --- | --- | --- |
| `Button` | `--primary`, `--primary-hover`, `--primary-fg`, `--card-bg`, `--text-title`, `--gray-50`, `--gray-700`, `--frgm-control-*`, `--frgm-motion-*`, `--frgm-state-disabled-opacity`, `--frgm-icon-size-md` | `primary`, `secondary`, `ghost`; hover uses `--primary-hover` or `--gray-50`; disabled uses foundation opacity. | Sizes are `sm/md/lg` from control height/padding/font tokens. |
| `Badge` | `--gray-100`, `--gray-700`, `--emerald-50`, `--emerald-800`, `--amber-50`, `--amber-700`, `--red-50`, `--red-700`, `--frgm-pill-*`, `--frgm-icon-size-sm` | `active/success`, `idle/warning`, `loss/error/inactive`, default neutral. | Tooltip behavior is native `title`; no Ant Design dependency. |
| `Breadcrumb` | `--font-sans`, `--frgm-control-font-size-sm`, `--frgm-breadcrumb-line`, `--frgm-inline-gap-md`, `--text-title`, `--gray-500`, `--gray-400` | Last item gets `aria-current="page"`; links use muted text and title color on hover. | `LinkComponent` prop lets Next pass `next/link` without coupling the package to Next. |
| `LinkButton` | `--primary`, `--primary-hover`, `--font-sans`, `--frgm-control-font-size-md`, `--frgm-control-strong-font-weight`, `--frgm-inline-gap-sm` | Hover changes to `--primary-hover` and underlines. | Uses plain anchor by default; `LinkComponent` can replace it. |
| `Pill` | `--primary`, `--primary-fg`, `--gray-100`, `--gray-700`, `--frgm-pill-*` | Active pill uses primary; inactive pill uses neutral background/text. | Intended for compact mode/category selectors. |
| `ProfileTag` | `--gray-100`, `--gray-800`, `--frgm-pill-*` | Neutral only. | Simple label shell; avatar composition should be a separate molecule. |
| `ProfitLose` | `--lime-50`, `--lime-700`, `--red-50`, `--red-700`, `--font-mono`, `--frgm-pill-*` | Positive/zero uses `up`; negative uses `down`. | Calculation stays in component logic; visual state is token mapped. |
| `SegmentStatus` | `--gray-100`, `--gray-700`, `--emerald-50`, `--emerald-800`, `--amber-50`, `--amber-700`, `--r-4`, `--frgm-pill-*`, `--frgm-dot-size` | `active`, `scheduled/idle`, default neutral. | Dot uses `currentColor`, so it inherits status color. |
| `ProgressBar` | `--gray-100`, `--primary`, `--frgm-dot-size`, `--frgm-pill-radius`, `--frgm-inline-gap-lg`, `--frgm-control-h-lg`, `--font-mono` | Fill defaults to `--primary`; optional `color` prop sets `--color` for data-viz overrides. | Native `progress` keeps semantics. |
| `SearchInput` | `--card-bg`, `--text-title`, `--gray-300`, `--gray-400`, `--primary`, `--frgm-control-focus-ring`, `--frgm-control-*`, `--frgm-search-width` | `:focus-within` applies primary border and blue focus ring. | Includes visually hidden label for accessibility. |
| `Field` | `--text-body`, `--text-meta`, `--red-700`, `--frgm-control-font-*`, `--frgm-inline-gap-sm` | Required marker uses red; error text replaces hint when present. | Structural wrapper for one label/control/help stack. |
| `TextInput` | `--gray-100`, `--gray-300`, `--text-title`, `--text-caption`, `--primary`, `--red-700`, `--frgm-control-*`, `--frgm-state-disabled-opacity` | Focus, invalid, required, and disabled states map to shared field CSS. | Supports text-like input types through the `type` prop. |
| `SelectField` | `--gray-100`, `--gray-300`, `--text-title`, `--primary`, `--red-700`, `--frgm-control-*`, `--frgm-state-disabled-opacity` | Focus, invalid, required, and disabled states map to shared field CSS. | Options can be passed as strings/objects or native children. |
| `TextareaField` | `--gray-100`, `--gray-300`, `--text-title`, `--text-caption`, `--primary`, `--red-700`, `--frgm-control-*`, `--frgm-state-disabled-opacity` | Focus, invalid, required, and disabled states map to shared field CSS. | Uses the same field stack with a larger resizable control. |
| `FieldGroup` | `--text-title`, `--text-meta`, `--frgm-control-font-*`, `--frgm-inline-gap-*` | `data-layout="inline"` wraps choice controls horizontally; default stacks content. | Use for related choices, settings sections, and inspector groups. |
| `FieldRow` | `--frgm-inline-gap-md` | Auto-fit columns collapse responsively. | Use instead of ad hoc two-column field grids. |
| `CheckboxField` | `--card-bg`, `--gray-300`, `--primary`, `--frgm-icon-size-md`, `--frgm-control-focus-ring`, `--frgm-state-disabled-opacity` | Checked state uses primary fill; focus-visible uses the shared focus ring. | Native checkbox semantics, custom visual shell. |
| `RadioField` | `--card-bg`, `--gray-300`, `--primary`, `--frgm-icon-size-md`, `--frgm-control-focus-ring`, `--frgm-state-disabled-opacity` | Checked state uses primary fill; focus-visible uses the shared focus ring. | Native radio semantics, custom visual shell. |
| `ToggleField` | `--card-bg`, `--gray-300`, `--primary`, `--border-subtle`, `--shadow-elev`, `--frgm-control-focus-ring`, `--frgm-state-disabled-opacity` | Checked state uses primary track; knob motion uses foundation motion. | For binary settings where switch affordance is expected. |
| `DropdownMenu` | `--card-bg`, `--gray-50`, `--border-subtle`, `--border-strong`, `--text-body`, `--text-title`, `--text-meta`, `--shadow-pop`, `--frgm-control-*`, `--frgm-inline-gap-*`, `--frgm-icon-size-md` | `domain`, `icon`, `avatar`, and default trigger variants share the same panel and item rules; open state is native `details[open]`. | Use for domain, profile, settings, and overflow menus. |
| `DateRangeControl` | `--card-bg`, `--gray-50`, `--text-title`, `--text-meta`, `--frgm-control-*`, `--frgm-date-range-*`, `--frgm-icon-size-md`, `--frgm-layer-popover` | Preset selector opens the dashboard-style range dialog; date display is a selected-state button with calendar icon, optional compare line, compare options, active date chips, selected range cells, cancel, apply, and viewport-aware `align`. | Mirrors the dashboard 44px two-part date trigger and reusable date range behavior. |
| `SecondaryTopbar` | `--card-bg`, `--border-subtle`, `--text-title`, `--text-meta`, `--gray-50`, `--frgm-control-*`, `--frgm-inline-gap-*`, `--frgm-icon-size-md` | Breadcrumb, date controls, and optional actions stay visible in the normal row. | Use for second-row page context in the app shell. |
| `SwitchButton` | `--gray-100`, `--gray-500`, `--card-bg`, `--text-title`, `--shadow-elev`, `--frgm-control-*`, `--frgm-pill-pad-y-sm`, `--frgm-state-muted-opacity` | Selected option uses `aria-pressed="true"` with card background/elevation; disabled uses muted opacity. | Covers All/Any segmented choice only. |
| `Loader` | `--frgm-loader-*`, `--primary`, `--frgm-motion-spin-duration`, `--frgm-pill-radius` | Size maps to foundation `small/default/large`; optional color prop sets `--color`. | Replaces Ant Design icon dependency with CSS spinner. |
| `TypingLoader` | `--frgm-control-gap`, `--frgm-inline-gap-sm`, `--primary`, `--frgm-motion-typing-duration`, `--frgm-pill-radius` | Three dots stagger using the typing duration token. | No inline keyframes in component JS. |
| `MetaPill` | `--gray-500`, `--text-title`, `--lime-50`, `--lime-700`, `--red-50`, `--red-700`, `--frgm-pill-*`, `--frgm-inline-gap-xs` | `highlight="up"` and `highlight="down"` map to positive/negative status foundations. | Text truncation is behavior, not styling: default visible length is 15 chars from the original source snippet. |

## Audit Result

The hardened package entrypoint `@fragmatic/design-system/atoms` now avoids dashboard-local imports and consumes foundation tokens for reusable visual decisions. The original downloaded snippets are retained as references, but production consumers should use the hardened entrypoint only.
