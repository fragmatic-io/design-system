# Fragmatic Design System

This folder keeps the Claude export organized by design-system responsibility.

- `tokens/`: source CSS custom properties for color, type, spacing, radius, shadows, and theme behavior.
- `foundations/`: component-foundation contracts and audit notes.
- `components/atoms/`: reusable component snippets exported from the product codebase.
- `components/brand/`: Fragmatic mark, sidebar tile, wordmark metadata, and logo button extracted from the dashboard.
- `assets/brand/`: raw Fragmatic SVG assets for non-React consumers, including the dashboard-matched sidebar tile.
- `patterns/`: token-driven product patterns such as the app shell.
- `styles/`: extracted stylesheet reference from the original download.
- `previews/`: browsable design-system documentation and component/pattern demos.
- `tools/`: preview-only tweak controls.
- `tests/`: smoke tests for preview wiring and design-system affordances.

Keep preview UI token-driven. New styles should prefer `var(--*)` values from `tokens/` so tweaks and theme changes cascade through the page.

Before changing exported atoms, update `foundations/component-contracts.md` if the change introduces a new reusable visual rule.

## Package Usage

Install from GitHub once the repository is pushed:

```bash
yarn add git+ssh://git@github.com/fragmatic-io/design-system.git
```

Import the token CSS in the app root before application styles:

```js
import '@fragmatic/design-system/tokens.css';
import '@fragmatic/design-system/atoms.css';
import '@fragmatic/design-system/brand.css';
import '@fragmatic/design-system/patterns/app-shell.css';
```

Optional reference CSS from the original export is also available:

```js
import '@fragmatic/design-system/styles.css';
import { Button, Badge, Breadcrumb, SearchInput } from '@fragmatic/design-system/atoms';
import { BrandLogoButton, brandLogoItems } from '@fragmatic/design-system/brand';
```

The stable atom entrypoint is `@fragmatic/design-system/atoms`. Original downloaded snippets remain in their per-component folders as source references; avoid importing those paths directly from product code.

## App Shell Containers

Use `.frgm-app-main-container` with a required `data-width` value:

- `full`: dashboards, tables, charts, canvases, and dense product workspaces.
- `narrow`: settings, forms, and focused configuration pages.

Context navigation should switch between page containers from a component/data map so labels, counts, active state, target page, and container width share one source of truth.
