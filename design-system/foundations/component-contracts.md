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
| Spacing | `--frgm-control-*`, `--frgm-inline-gap-*`, `--frgm-pill-pad-*` | Control dimensions, atom gaps, pill padding. |
| Motion/state | `--frgm-motion-*`, `--frgm-state-*` | Hover lift, transitions, loader timing, disabled opacity. |
| Iconography | `components/atoms/icons.js`, `--frgm-icon-size-*`, `--frgm-dot-size` | Package-local line icons and dot indicators. |

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
| `SwitchButton` | `--gray-100`, `--gray-500`, `--card-bg`, `--text-title`, `--shadow-elev`, `--frgm-control-*`, `--frgm-pill-pad-y-sm`, `--frgm-state-muted-opacity` | Selected option uses `aria-pressed="true"` with card background/elevation; disabled uses muted opacity. | Covers All/Any segmented choice only. |
| `Loader` | `--frgm-loader-*`, `--primary`, `--frgm-motion-spin-duration`, `--frgm-pill-radius` | Size maps to foundation `small/default/large`; optional color prop sets `--color`. | Replaces Ant Design icon dependency with CSS spinner. |
| `TypingLoader` | `--frgm-control-gap`, `--frgm-inline-gap-sm`, `--primary`, `--frgm-motion-typing-duration`, `--frgm-pill-radius` | Three dots stagger using the typing duration token. | No inline keyframes in component JS. |
| `MetaPill` | `--gray-500`, `--text-title`, `--lime-50`, `--lime-700`, `--red-50`, `--red-700`, `--frgm-pill-*`, `--frgm-inline-gap-xs` | `highlight="up"` and `highlight="down"` map to positive/negative status foundations. | Text truncation is behavior, not styling: default visible length is 15 chars from the original source snippet. |

## Audit Result

The hardened package entrypoint `@fragmatic/design-system/atoms` now avoids dashboard-local imports and consumes foundation tokens for reusable visual decisions. The original downloaded snippets are retained as references, but production consumers should use the hardened entrypoint only.
