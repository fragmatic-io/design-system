# Fragmatic Design System

This folder keeps the Claude export organized by design-system responsibility.

- `tokens/`: source CSS custom properties for color, type, spacing, radius, shadows, and theme behavior.
- `components/atoms/`: reusable component snippets exported from the product codebase.
- `styles/`: extracted stylesheet reference from the original download.
- `previews/`: browsable design-system documentation and component/pattern demos.
- `tools/`: preview-only tweak controls.
- `tests/`: smoke tests for preview wiring and design-system affordances.

Keep preview UI token-driven. New styles should prefer `var(--*)` values from `tokens/` so tweaks and theme changes cascade through the page.

## Package Usage

Install from GitHub once the repository is pushed:

```bash
yarn add git+ssh://git@github.com/fragmatic-io/design-system.git
```

Import the token CSS in the app root before application styles:

```js
import '@fragmatic/design-system/tokens.css';
```

Optional reference CSS from the original export is also available:

```js
import '@fragmatic/design-system/styles.css';
```

Component snippets currently remain source references under `components/atoms/`. Some snippets still depend on product-local icon and CSS files from the dashboard, so the first stable package surface is tokens/styles/preview. Harden component exports before importing atoms directly into production screens.
