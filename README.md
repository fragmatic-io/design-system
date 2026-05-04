# Fragmatic Design System Package

Token-driven Fragmatic design-system assets packaged for reuse across Fragmatic apps.

## Install

```bash
yarn add git+ssh://git@github.com/fragmatic-io/design-system.git
```

## Use In Next

Import tokens in your app root before product styles:

```js
import '@fragmatic/design-system/tokens.css';
```

Optional exported paths:

```js
import '@fragmatic/design-system/styles.css';
import { paths, sections } from '@fragmatic/design-system';
```

## Structure

- `design-system/tokens/`: CSS custom properties.
- `design-system/styles/`: extracted reference CSS.
- `design-system/components/atoms/`: source snippets from the original export.
- `design-system/previews/`: browsable design-system preview.
- `design-system/tools/`: preview tweak controls.
- `design-system/tests/`: smoke tests.

## Current Package Surface

The stable package surface is CSS tokens, reference CSS, preview metadata, and preview tooling. Component snippets are included as source references, but several still depend on dashboard-local icon/CSS modules and should be hardened before direct production imports.

## Checks

```bash
npm test
npm run pack:check
```
