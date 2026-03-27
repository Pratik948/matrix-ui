# Contributing to MatrixUI

## Ground rules

1. **Tokens first.** Any new visual property must be a token before it becomes a component prop. If you find yourself hardcoding a color or spacing value inside a component, stop — add a token first.

2. **Document for Figma.** Every new token or component must be documented in `docs/FIGMA_SPEC.md` with exact values, naming, and Figma effect style references.

3. **No new hues without a vote.** The MatrixUI palette is intentionally narrow. Adding a new color family (e.g. purple, orange) requires discussion — these are not decorative decisions.

4. **Rain presets are named, not inline.** New UI panels must pick or extend a named `rainPreset` in `motion.ts`. Anonymous rain configs in component files are not allowed.

## Adding a new token

1. Add the raw value to the appropriate token file (`colors.ts`, `spacing.ts`, etc.)
2. Add a semantic alias if the token is consumed by components
3. Add the CSS custom property to the relevant `generateXXXCSSVariables()` function
4. Document in `docs/FIGMA_SPEC.md`
5. Export from `src/tokens/index.ts`

## Adding a new component

1. Create `src/components/[ComponentName]/` folder
2. Required files:
   - `index.tsx` — component implementation
   - `[ComponentName].types.ts` — prop types
   - `[ComponentName].stories.tsx` — Storybook stories
   - `README.md` — usage docs (this feeds into `docs/COMPONENTS.md`)
3. Add to `docs/FIGMA_SPEC.md` — Part 5: Component Specifications
4. Export from `src/components/index.ts`

## Commit conventions

```
feat(tokens): add status/conflict color token
fix(Button): correct hover glow intensity
docs(figma): add CommitRow anatomy spec
chore: bump tsup to 8.1
```

## Token naming rules

| Type       | Format                       | Example |
|-----------|------------------------------|---------|
| Raw palette | `[family][step]`            | `green[100]` |
| Semantic   | `[category]/[role]`         | `text/primary` |
| CSS var    | `--mx-[category]-[role]`    | `--mx-text-primary` |
| Figma var  | `[category]/[role]`         | `text/primary` |
| Figma style| `[Group]/[Name]/[Variant]`  | `Glow/Green/Primary` |
