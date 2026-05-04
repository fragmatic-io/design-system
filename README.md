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
import '@fragmatic/design-system/atoms.css';
```

Optional exported paths:

```js
import '@fragmatic/design-system/styles.css';
import { paths, sections } from '@fragmatic/design-system';
import { Button, Badge, Breadcrumb, SearchInput } from '@fragmatic/design-system/atoms';
```

## Structure

- `design-system/tokens/`: CSS custom properties.
- `design-system/foundations/`: component-foundation contracts and audit notes.
- `design-system/styles/`: extracted reference CSS.
- `design-system/components/atoms/`: source snippets from the original export.
- `design-system/previews/`: browsable design-system preview.
- `design-system/tools/`: preview tweak controls.
- `design-system/tests/`: smoke tests.

## Current Package Surface

The stable package surface is CSS tokens, token-based atom styles, preview metadata, preview tooling, and hardened React atom exports. The original downloaded snippets remain under `design-system/components/atoms/*` as source references, but consumers should import atoms from `@fragmatic/design-system/atoms`.

The atom contract audit lives in `design-system/foundations/component-contracts.md`. Exported atoms should not add reusable visual decisions unless those decisions are first formalized in `design-system/tokens/tokens.css`.

## Checks

```bash
npm test
npm run pack:check
```
