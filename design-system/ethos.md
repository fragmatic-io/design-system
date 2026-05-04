# Fragmatic Design System Ethos

This design system is a contract, not a collection of attractive snippets. Every component, pattern, and preview must be traceable back to foundations: color, type, spacing, radius, elevation, state, motion, and accessibility tokens.

## Core Rules

1. Build from foundations first.
   Use tokens from `tokens/tokens.css` or add a formal semantic token there before using a new reusable value. Do not invent one-off colors, spacing, radii, shadows, or state treatments inside examples.

2. Components are part of the design system.
   Components are acceptable only when their public API and visual behavior are defined by foundations. Atoms must export cleanly from the package and must not depend on old local project paths.

3. Examples must use the same contract as production.
   Preview HTML, package exports, docs, and visual examples should all consume the same token and component rules. Do not fix previews with selector overrides that production code cannot reasonably use.

4. Dark mode is not an afterthought.
   Light and dark themes must resolve through semantic tokens. If a component fails in dark mode, fix the token contract or the component's normal token usage. Do not patch dark mode by targeting literal legacy colors such as `stroke="#065f46"`.

5. Data visualization needs semantic tokens.
   Charts must use chart tokens such as `--chart-primary`, `--chart-grid`, and `--chart-warning`. SVG examples should use classes or currentColor wired to those tokens, not hardcoded light-mode hex values.

6. Icons live in the icon foundation.
   Add reusable product icons to `components/atoms/icons.js` first, then consume them from the design-system package in atoms, patterns, previews, and product shells. Do not paste inline SVGs into reusable UI when an icon belongs in the shared module.

7. Logos live in the brand foundation.
   Add reusable logo assets and logo treatments to `components/brand` and `assets/brand` first, then consume those exports everywhere. Do not redraw Fragmatic marks, use text placeholders for logos, or paste logo SVGs directly into patterns.

8. Patterns must cascade from atoms and foundations.
   Patterns may compose atoms, layout primitives, and semantic tokens. They should not create new button styles, badges, pills, chat bubbles, or chart colors unless those are formalized as reusable component rules.

9. Forms are foundation primitives.
   Text inputs, selects, textareas, search, checkbox, radio, toggles, field rows, and field groups must use the packaged form atoms or their `frgm-*` classes. Do not create one-off `.field`, inspector input, or drawer form styles without first promoting the behavior into the form foundation.

10. Dropdowns are foundation primitives.
   Domain switchers, profile menus, settings menus, and overflow menus must use `DropdownMenu` or `.frgm-dropdown-*` classes. Do not create shell-local dropdown triggers, menu panels, or new rounding rules.

11. Compose repeated UI from foundation-backed data.
   When labels, counts, icon names, active states, or item groups define reusable UI, put them in a small named data map or component contract and render from that source. Do not hand-maintain parallel markup when the same structure can compose from foundations.

12. App surfaces choose documented container variants.
   Use the app shell `full` container for dense workspaces and the `narrow` container for settings or forms. Do not stack multiple shell page variants in one preview state or invent page-width rules outside the app shell container contract.

13. Secondary topbars are components, not page snippets.
   Use `SecondaryTopbar` and `DateRangeControl` for page-context rows with breadcrumbs, filters, dates, and contextual actions. Add missing behavior to the component/foundation contract before using it in app shell patterns.

14. Hardening means formalizing, not hiding.
   If cleanup exposes an invented value, either remove it or promote it into the foundation contract with a clear name and usage. Avoid compatibility shims unless they are temporary, documented, and tested.

15. Accessibility is a release condition.
   Text, controls, charts, states, and focus indicators must remain readable in light and dark themes. Contrast-sensitive changes need tests or a browser smoke check.

16. Keep files modular.
   Split large additions into focused files and folders when the design system grows. Prefer small, named contracts over long anonymous blocks.

17. Test every meaningful change.
    Add or update smoke, package, contrast, or browser tests for each change. If a change cannot be covered immediately, document the gap in the final handoff.

## Review Checklist

- Does every reusable value come from a foundation or semantic token?
- Does the component still work when tokens change?
- Does every reusable icon come from `components/atoms/icons.js`?
- Does every reusable Fragmatic logo come from `components/brand` or `assets/brand`?
- Do forms use packaged field, input, search, choice, and group primitives?
- Do domain, profile, settings, and overflow menus use the dropdown foundation?
- Do secondary topbars use the shared `SecondaryTopbar` and `DateRangeControl` components?
- Is repeated UI composed from a named data map or component contract instead of duplicated markup?
- Does dark mode work without dark-only hacks?
- Are package exports, preview examples, and docs still in sync?
- Is the change covered by a test or smoke check?
