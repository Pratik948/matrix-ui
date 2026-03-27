# CLAUDE.md — MatrixUI Build Plan
# This file is the single source of truth for Claude Code.
# Work through phases in order. Do not skip ahead.
# Check off tasks as you complete them.

---

## Project Overview

**Repo:** `matrix-ui`
**Packages published:**
- `@matrixui/tokens` — Design tokens only (no React dependency)
- `@matrixui/react` — React component library (consumes tokens)

**Stack:** TypeScript · React 18 · tsup (build) · Vitest (tests) · Storybook 8 (docs)
**Node version:** 20 LTS (use `.nvmrc`)
**Package manager:** pnpm (use `pnpm-workspace.yaml` — this is a monorepo)

---

## Monorepo structure to build

```
matrix-ui/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── publish.yml
├── packages/
│   ├── tokens/                   ← @matrixui/tokens
│   │   ├── src/
│   │   │   ├── colors.ts         ← ALREADY EXISTS (copy from /docs/seed/)
│   │   │   ├── typography.ts     ← ALREADY EXISTS
│   │   │   ├── spacing.ts        ← ALREADY EXISTS
│   │   │   ├── motion.ts         ← ALREADY EXISTS
│   │   │   ├── shadows.ts        ← ALREADY EXISTS
│   │   │   ├── borders.ts        ← ALREADY EXISTS
│   │   │   ├── zIndex.ts         ← ALREADY EXISTS
│   │   │   └── index.ts          ← ALREADY EXISTS
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsup.config.ts
│   │
│   └── react/                    ← @matrixui/react
│       ├── src/
│       │   ├── components/
│       │   │   ├── MatrixRain/
│       │   │   ├── Panel/
│       │   │   ├── Button/
│       │   │   ├── Input/
│       │   │   ├── Badge/
│       │   │   ├── Switch/
│       │   │   ├── Titlebar/
│       │   │   ├── DiffLine/
│       │   │   ├── CommitRow/
│       │   │   ├── Avatar/
│       │   │   ├── Toast/
│       │   │   ├── Modal/
│       │   │   ├── ContextMenu/
│       │   │   ├── Tooltip/
│       │   │   ├── Sidebar/
│       │   │   └── Tag/
│       │   ├── hooks/
│       │   │   ├── useGlitch.ts
│       │   │   ├── useMatrixRain.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── tsup.config.ts
│
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
│
├── docs/
│   ├── seed/                     ← Pre-written files to copy into packages/tokens/src/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── motion.ts
│   │   ├── shadows.ts
│   │   ├── borders.ts
│   │   ├── zIndex.ts
│   │   └── index.ts
│   ├── FIGMA_SPEC.md             ← ALREADY EXISTS
│   └── COMPONENTS.md             ← ALREADY EXISTS
│
├── .skills/
│   ├── SKILL.md                  ← Master skill index
│   ├── tokens/
│   │   └── SKILL.md              ← How to add/modify tokens
│   ├── components/
│   │   └── SKILL.md              ← How to build a new component
│   └── storybook/
│       └── SKILL.md              ← How to write stories
│
├── .gitignore
├── .npmrc
├── .nvmrc
├── LICENSE
├── README.md                     ← ALREADY EXISTS
├── CONTRIBUTING.md               ← ALREADY EXISTS
├── package.json                  ← Root (workspace config only)
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## PHASE 0 — Repo scaffolding
*Goal: A working monorepo that can run `pnpm install` and `pnpm build` successfully.*

### 0.1 Root config files

**`.nvmrc`**
```
20
```

**`pnpm-workspace.yaml`**
```yaml
packages:
  - 'packages/*'
```

**Root `package.json`**
```json
{
  "name": "matrix-ui",
  "private": true,
  "version": "0.0.0",
  "description": "MatrixUI monorepo — design tokens and React component library",
  "scripts": {
    "build":       "pnpm -r build",
    "dev":         "pnpm -r --parallel dev",
    "lint":        "pnpm -r lint",
    "typecheck":   "pnpm -r typecheck",
    "test":        "pnpm -r test",
    "storybook":   "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "devDependencies": {
    "@storybook/react":          "^8.0.0",
    "@storybook/react-vite":     "^8.0.0",
    "@storybook/addon-essentials":"^8.0.0",
    "storybook":                 "^8.0.0",
    "react":                     "^18.0.0",
    "react-dom":                 "^18.0.0",
    "typescript":                "^5.4.0",
    "vite":                      "^5.0.0"
  }
}
```

**`tsconfig.base.json`** — shared compiler options inherited by all packages
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

**`.gitignore`**
```
node_modules/
dist/
.turbo/
*.tsbuildinfo
.DS_Store
.env
coverage/
storybook-static/
```

**`.npmrc`**
```
auto-install-peers=true
strict-peer-dependencies=false
```

**`LICENSE`** — full MIT license text, copyright year = current year, copyright holder = "MatrixUI Contributors"

---

### 0.2 `packages/tokens/` config

**`packages/tokens/package.json`**
```json
{
  "name": "@matrixui/tokens",
  "version": "1.0.0",
  "description": "Design tokens for MatrixUI — colors, typography, spacing, motion, shadows",
  "license": "MIT",
  "main":    "./dist/index.js",
  "module":  "./dist/index.mjs",
  "types":   "./dist/index.d.ts",
  "exports": {
    ".": {
      "import":  "./dist/index.mjs",
      "require": "./dist/index.js",
      "types":   "./dist/index.d.ts"
    }
  },
  "files": ["dist", "src"],
  "scripts": {
    "build":     "tsup",
    "dev":       "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint":      "eslint src --ext .ts"
  },
  "devDependencies": {
    "tsup":       "^8.0.0",
    "typescript": "^5.4.0"
  }
}
```

**`packages/tokens/tsconfig.json`**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir":  "dist"
  },
  "include": ["src"]
}
```

**`packages/tokens/tsup.config.ts`**
```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry:       ['src/index.ts'],
  format:      ['esm', 'cjs'],
  dts:         true,
  clean:       true,
  sourcemap:   true,
  treeshake:   true,
  splitting:   false,
  outDir:      'dist',
})
```

---

### 0.3 `packages/react/` config

**`packages/react/package.json`**
```json
{
  "name": "@matrixui/react",
  "version": "1.0.0",
  "description": "React component library for MatrixUI",
  "license": "MIT",
  "main":    "./dist/index.js",
  "module":  "./dist/index.mjs",
  "types":   "./dist/index.d.ts",
  "exports": {
    ".": {
      "import":  "./dist/index.mjs",
      "require": "./dist/index.js",
      "types":   "./dist/index.d.ts"
    }
  },
  "files": ["dist", "src"],
  "scripts": {
    "build":     "tsup",
    "dev":       "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint":      "eslint src --ext .ts,.tsx",
    "test":      "vitest run"
  },
  "dependencies": {
    "@matrixui/tokens": "workspace:*"
  },
  "peerDependencies": {
    "react":     ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@types/react":              "^18.0.0",
    "@types/react-dom":          "^18.0.0",
    "@testing-library/react":    "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@vitejs/plugin-react":      "^4.0.0",
    "jsdom":                     "^24.0.0",
    "tsup":                      "^8.0.0",
    "typescript":                "^5.4.0",
    "vitest":                    "^1.0.0"
  }
}
```

**`packages/react/tsconfig.json`**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir":  "dist"
  },
  "include": ["src"]
}
```

**`packages/react/tsup.config.ts`**
```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry:     ['src/index.ts'],
  format:    ['esm', 'cjs'],
  dts:       true,
  clean:     true,
  sourcemap: true,
  treeshake: true,
  splitting: false,
  external:  ['react', 'react-dom'],
  outDir:    'dist',
})
```

---

### 0.4 Storybook config

**`.storybook/main.ts`**
```ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories:   ['../packages/react/src/**/*.stories.@(ts|tsx)'],
  addons:    ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
}

export default config
```

**`.storybook/preview.tsx`**
```tsx
import type { Preview } from '@storybook/react'
import { injectMatrixUITokens } from '@matrixui/tokens'

// Inject all CSS custom properties into Storybook
injectMatrixUITokens()

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'matrix',
      values: [{ name: 'matrix', value: '#000000' }],
    },
  },
}

export default preview
```

---

### 0.5 CI/CD GitHub Actions

**`.github/workflows/ci.yml`**
```yaml
name: CI
on:
  push:    { branches: [main] }
  pull_request: { branches: [main] }
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm build
      - run: pnpm test
```

**`.github/workflows/publish.yml`**
```yaml
name: Publish
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, registry-url: 'https://registry.npmjs.org', cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm -r publish --access public --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**How to publish:** create a git tag `v1.0.0`, push it — publish runs automatically.
Prerequisite: add `NPM_TOKEN` secret in GitHub repo Settings → Secrets → Actions.

---

## PHASE 1 — Seed token files
*Goal: Copy the pre-written token files from `docs/seed/` into `packages/tokens/src/`.*

The files in `docs/seed/` are the canonical token definitions written in the design phase.
Copy them verbatim — do not modify content during this phase.

```bash
cp docs/seed/*.ts packages/tokens/src/
```

After copying, run:
```bash
pnpm install
pnpm build
```

Expected result: `packages/tokens/dist/` is generated with `index.js`, `index.mjs`, `index.d.ts`.

---

## PHASE 2 — React components
*Build components in this exact order. Each depends on the previous.*

### Priority order (strict — do not reorder)

```
1. MatrixRain    ← foundation, no deps on other components
2. Panel         ← wraps MatrixRain, all other components use Panel
3. Button        ← first interactive primitive
4. Input         ← second interactive primitive
5. Textarea      ← extends Input
6. Avatar        ← used by CommitRow
7. Badge         ← used by CommitRow, Sidebar rows
8. Tag           ← used in repo header
9. Switch        ← used in settings, Titlebar
10. DiffLine      ← used in diff view
11. CommitRow     ← uses Avatar + Badge
12. Tooltip       ← used by Button, Titlebar controls
13. ContextMenu   ← used in file list, history
14. Toast         ← global notification system
15. Modal         ← conflict resolution, confirm dialogs
16. Titlebar      ← uses Button, Switch, Tooltip
17. Sidebar       ← uses Panel, Badge, Avatar
```

### Component file structure (repeat for every component)

```
packages/react/src/components/[Name]/
├── [Name].tsx           ← implementation
├── [Name].types.ts      ← prop interface + exported types
├── [Name].test.tsx      ← unit tests (React Testing Library)
├── [Name].stories.tsx   ← Storybook stories
└── index.ts             ← re-exports [Name] and its types
```

### Component implementation rules (READ BEFORE BUILDING ANY COMPONENT)

1. **Import tokens from `@matrixui/tokens`** — never hardcode hex values or px values inside components.
   ```ts
   import { colors, spacing, textGlow, boxGlow, transitions } from '@matrixui/tokens'
   ```

2. **Style via inline styles using token values** — no CSS files, no CSS modules, no Tailwind. Inline styles ensure the components are portable and don't require a CSS import chain.

3. **Use `React.CSSProperties` for style objects** — all style objects must be typed.

4. **Every interactive element needs all 5 states**: default, hover, focus, active, disabled.
   Use `onMouseEnter`/`onMouseLeave` for hover. Use `onFocus`/`onBlur` for focus. Never use `:hover` in inline styles (it doesn't work).

5. **Export the prop interface** — always export `[Name]Props` from `[Name].types.ts` so consumers can use it.

6. **Forward refs** — all components that render a native DOM element must use `React.forwardRef`.

7. **No `any`** — zero TypeScript `any`. Use `unknown` and narrow, or use proper generics.

8. **`data-matrixui-[component]` attribute** — add to root element for testability.
   ```tsx
   <div data-matrixui-button {...props}>
   ```

---

## PHASE 2 — Component specs

### 2.1 MatrixRain

**File:** `packages/react/src/components/MatrixRain/MatrixRain.tsx`

Implementation notes:
- Uses `useRef` for canvas, `useEffect` for animation loop with `requestAnimationFrame`
- Uses `ResizeObserver` to re-initialise when container resizes
- Accepts a `preset` prop (`keyof typeof rainPresets` from `@matrixui/tokens`)
- Individual props (`speed`, `opacity`, `headColor`, etc.) override the preset
- Returns a `<canvas>` with `position: absolute, inset: 0, width: 100%, height: 100%, pointerEvents: none`
- Canvas `width`/`height` attributes must be set to `offsetWidth`/`offsetHeight` (not CSS size) — otherwise it will be blurry on retina displays. Use `window.devicePixelRatio`.
- Character set: `アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\+=~`
- Cleanup: cancel animation frame + disconnect ResizeObserver on unmount

**Types:**
```ts
export interface MatrixRainProps {
  preset?:      keyof typeof rainPresets  // default: 'diff'
  opacity?:     number
  speed?:       number
  fontSize?:    number
  headColor?:   string
  brightColor?: string
  dimColor?:    string
  fadeAlpha?:   number
  className?:   string
  style?:       React.CSSProperties
}
```

---

### 2.2 Panel

**File:** `packages/react/src/components/Panel/Panel.tsx`

Implementation notes:
- `position: relative, overflow: hidden` on the outer div
- Renders `<MatrixRain>` as the first child (z-index 0, absolute)
- Renders a content div with `position: relative, zIndex: 1, height: 100%, display: flex, flexDirection: column`
- `bgOpacity` controls the semi-transparent background overlay on the content div
- Background color is `colors.bg.overlay` at the given opacity

**Types:**
```ts
export interface PanelProps {
  rain?:        MatrixRainProps & { preset?: keyof typeof rainPresets }
  bgOpacity?:   number          // default: 0.78
  children:     React.ReactNode
  style?:       React.CSSProperties
  className?:   string
}
```

---

### 2.3 Button

**File:** `packages/react/src/components/Button/Button.tsx`

Implementation notes:
- Use `useRef<boolean>` for hover + focus state (don't use React state for this — avoids re-renders)
  Actually use `useState` for hover/focus is fine here since it's a leaf component
- Compute style object from variant + size + state
- `loading` state: show an inline spinner (animated `|` → `/` → `—` → `\` cycling in a `useInterval`) and disable pointer events
- All variant/size/state styles must be derived from token values — see `docs/FIGMA_SPEC.md` Part 5 Button table for exact values
- Must extend `React.ButtonHTMLAttributes<HTMLButtonElement>`

---

### 2.4 Input

**File:** `packages/react/src/components/Input/Input.tsx`

- Controlled component — accepts `value` + `onChange`
- `variant`: `'green'` (default) | `'cyan'` — changes border, text, and focus glow color
- Focus state: update border color + box-shadow glow via `onFocus`/`onBlur`
- Error state: red border + error glow
- Must extend `React.InputHTMLAttributes<HTMLInputElement>`

---

### 2.5 Textarea

- Same as Input but extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>`
- `resize: 'none'` always — no user-resizable textareas in MatrixUI

---

### 2.6 Avatar

- Renders initials from `name` prop (first letter of first + last word)
- If `src` is provided, renders `<img>` with circular clip
- Sizes: `sm` = 24px, `md` = 32px, `lg` = 40px
- Background: `colors.bg.elevated`, border: `colors.border.default`, text: `colors.text.tertiary` with `textGlow.greenSoft`

---

### 2.7 Badge

Variants and their styles are fully specified in `docs/FIGMA_SPEC.md` Part 5 Badge table.
Use the `statusColor` map from `@matrixui/tokens` colors.status.

---

### 2.8 Tag

- `variant: 'lang'` — colored dot + language name. Color from `colors.lang[language] ?? colors.lang.default`
- `variant: 'version'` — hash prefix `v`, cyan color
- `variant: 'branch'` — branch symbol `⎇` prefix, green

---

### 2.9 Switch

Fully specified in `docs/FIGMA_SPEC.md` Part 5 Switch table.
Animate thumb position with `transition: ${transitions.toggle}` from tokens.

---

### 2.10 DiffLine

- Renders a `<div>` with the diff content as a `<code>` element
- Optional `lineNo` gutter: render a fixed-width `<span>` to the left, color `colors.text.ghost`
- Styles from `colors.diff.*` tokens

---

### 2.11 CommitRow

- Layout: `display: flex, gap: 16px, alignItems: flex-start`
- Left: `<Avatar name={author} size="md" />`
- Center: message (Body/MD) + meta row (author · time · N files) in Body/SM
- Right: hash badge using `Mono/Hash` text style
- Hover: background → `colors.bg.elevated`

---

### 2.12 Tooltip

- Uses `position: absolute` positioned relative to a wrapper `<div>` with `position: relative`
- Show/hide on `onMouseEnter`/`onMouseLeave` of the trigger child
- Content: `colors.bg.surface` background, `colors.border.default` border, `colors.text.secondary` text, Body/SM
- Arrow: 4px CSS triangle using border trick

---

### 2.13 ContextMenu

- Renders into a `React.createPortal` (appended to `document.body`)
- Triggered by `onContextMenu` event on the trigger element
- Position: `{ top: clientY, left: clientX }` from mouse event
- Item types: `'action' | 'separator' | 'submenu'`
- Close on: click outside, Escape key, scroll

---

### 2.14 Toast

- Global singleton via React Context (`ToastProvider` + `useToast` hook)
- Max 3 toasts visible simultaneously — queue the rest
- Position: `fixed, bottom: 20px, right: 20px`
- Enter animation: `transform: translateY(8px) → translateY(0)` + `opacity: 0 → 1`, 200ms terminal easing
- Exit animation: `opacity: 1 → 0`, 150ms exit easing
- Auto-dismiss after 4000ms (configurable per toast)

---

### 2.15 Modal

- Backdrop: `position: fixed, inset: 0, background: rgba(0,0,0,0.75)` with `<MatrixRain preset="modal">`
- Content: centered, white-border box using `colors.border.default`
- Close on: backdrop click, Escape key
- Trap focus inside modal while open (use `focus-trap` or manual implementation)
- Sizes: `sm` = 360px, `md` = 480px, `lg` = 640px wide

---

### 2.16 Titlebar

- Root element must have `data-tauri-drag-region` attribute (for Tauri) and also work in Electron via `style: { WebkitAppRegion: 'drag' }`
- Window control buttons must have `style: { WebkitAppRegion: 'no-drag' }` to be clickable
- App icon: `⬡` symbol
- Renders `<MatrixRain preset="titlebar" />` via Panel
- Menu items: mapped from `menuItems` prop, hover behavior per FIGMA_SPEC
- Window controls: `—` `□` `×` — close button gets `colors.status.behind` on hover

---

### 2.17 Sidebar

- Uses `<Panel rain={{ preset: 'sidebar' }}>`
- `children` renders into the scrollable list area
- Fixed header slot (section label) and fixed footer slot (add button)
- Scrollable middle via `overflow-y: auto, flex: 1`

---

## PHASE 3 — Hooks

### `useGlitch`
```ts
// packages/react/src/hooks/useGlitch.ts
// Returns { isGlitching: boolean }
// Fires the glitch randomly using glitch config from @matrixui/tokens motion.ts
// Uses setInterval + setTimeout internally
// Cleans up on unmount
```

### `useMatrixRain`
```ts
// packages/react/src/hooks/useMatrixRain.ts
// Encapsulates the entire canvas animation logic from MatrixRain.tsx
// Accepts: canvasRef, config (RainPreset overrides)
// Returns: nothing (imperative canvas side-effect)
// Separating this from the component enables reuse (e.g. in a background canvas)
```

---

## PHASE 4 — Barrel exports

**`packages/react/src/index.ts`**
```ts
// Components
export * from './components/MatrixRain'
export * from './components/Panel'
export * from './components/Button'
export * from './components/Input'
export * from './components/Badge'
export * from './components/Switch'
export * from './components/Titlebar'
export * from './components/DiffLine'
export * from './components/CommitRow'
export * from './components/Avatar'
export * from './components/Toast'
export * from './components/Modal'
export * from './components/ContextMenu'
export * from './components/Tooltip'
export * from './components/Sidebar'
export * from './components/Tag'

// Hooks
export * from './hooks/useGlitch'
export * from './hooks/useMatrixRain'
```

---

## PHASE 5 — Storybook stories

Write stories **after** each component is built (not before).
Each story file must include:

1. **Default** — component in its default state with minimal props
2. **All variants** — one `argTypes`-controlled story showing all variant permutations
3. **States** — hover, focused, disabled, loading where applicable
4. **On dark background** — all stories use the `matrix` background from `.storybook/preview.tsx`

Story file template:
```tsx
// [Name].stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { [Name] } from './[Name]'

const meta: Meta<typeof [Name]> = {
  title: 'MatrixUI/[Name]',
  component: [Name],
  parameters: {
    backgrounds: { default: 'matrix' },
  },
}
export default meta
type Story = StoryObj<typeof [Name]>

export const Default: Story = { args: { /* minimal props */ } }
export const AllVariants: Story = { ... }
```

---

## PHASE 6 — Skill files

**IMPORTANT:** Create these `.skills/` files so that future Claude Code sessions
working in this repo have complete context without re-reading all source files.

### `.skills/SKILL.md` (master index)
```md
# MatrixUI Skills Index

This repo has the following skill files. Read the relevant one before making changes.

| Task | Read this skill |
|------|----------------|
| Adding or modifying a design token | .skills/tokens/SKILL.md |
| Building or editing a component | .skills/components/SKILL.md |
| Writing or updating Storybook stories | .skills/storybook/SKILL.md |
| Publishing a new version to npm | .skills/publishing/SKILL.md |
```

### `.skills/tokens/SKILL.md`
Write a skill that explains:
- The 3-layer model: raw palette → semantic tokens → CSS variables
- The naming convention for each layer (see CONTRIBUTING.md)
- Where each token type lives (which file)
- The rule: never hardcode values in components — always add a token first
- How to run `pnpm build` in `packages/tokens/` to verify the output
- How to update `docs/FIGMA_SPEC.md` after adding a token
- The CSS variable injection pattern (`injectMatrixUITokens`)
- Common mistakes: adding a color to `colors.ts` but forgetting to add it to `generateCSSVariables()`

### `.skills/components/SKILL.md`
Write a skill that explains:
- The 4-file structure per component (tsx, types, test, stories, index)
- The 7 implementation rules from Phase 2 header above
- The priority build order (MatrixRain → Panel → Button → ...)
- How to import tokens: `import { colors, spacing } from '@matrixui/tokens'`
- The inline-styles-only constraint and why (portability)
- How to handle all 5 interactive states
- The `data-matrixui-[component]` attribute requirement
- How to run the component in isolation: `pnpm storybook`
- How to run tests: `pnpm test` in `packages/react/`

### `.skills/storybook/SKILL.md`
Write a skill that explains:
- The 4 required story types per component
- How to set the dark background in stories
- How `injectMatrixUITokens()` is called in `preview.tsx` — don't call it again in stories
- The story title convention: `'MatrixUI/[ComponentName]'`
- How to use `argTypes` for variant controls

### `.skills/publishing/SKILL.md`
Write a skill that explains:
- Version bump: update `version` in both `packages/tokens/package.json` and `packages/react/package.json`
- Commit with message `chore: release v[version]`
- Create git tag: `git tag v[version]`
- Push tag: `git push origin v[version]`
- The GitHub Actions `publish.yml` workflow triggers automatically
- NPM_TOKEN must be set in GitHub Secrets
- Verify publish at `https://www.npmjs.com/package/@matrixui/tokens`

---

## PHASE 7 — Final verification checklist

Run these commands in order. All must pass before the repo is considered complete.

```bash
pnpm install               # no errors
pnpm typecheck             # zero TypeScript errors
pnpm lint                  # zero lint errors
pnpm test                  # all tests pass
pnpm build                 # both packages build cleanly
pnpm storybook             # Storybook opens, all 17 components visible
```

Then do a consumer test — create a temporary `test-consumer/` directory at repo root:
```bash
mkdir test-consumer && cd test-consumer
pnpm init
pnpm add ../packages/tokens ../packages/react react react-dom
```
Create a minimal React app that imports `<Button>`, `<Panel>`, `<MatrixRain>` and renders them.
If it renders without errors, the package is shippable.

Delete `test-consumer/` after verification.

---

## Notes for Claude Code

- Read `.skills/SKILL.md` first on every session in this repo.
- The `docs/seed/` folder contains the canonical token source files — treat them as read-only reference.
- When in doubt about a color value, check `packages/tokens/src/colors.ts` — it is the single source of truth.
- When in doubt about component behavior, check `docs/FIGMA_SPEC.md` Part 5.
- Never introduce a new npm dependency without a comment explaining why it's needed and why a token/existing dep doesn't solve the problem.
- All work happens inside `packages/` — never modify root config files unless a phase explicitly requires it.
