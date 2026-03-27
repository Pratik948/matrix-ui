# MatrixUI

A hacker-aesthetic React component library and design token system. Dark terminals, matrix rain, green phosphor glows — built for tools that want to look like they mean business.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@matrixui/tokens`](./packages/tokens) | 1.0.0 | Design tokens — colors, typography, spacing, motion, shadows |
| [`@matrixui/react`](./packages/react) | 1.0.0 | React component library |

---

## Installation

```bash
# Component library (includes tokens as a dependency)
npm install @matrixui/react react react-dom

# Tokens only (no React dependency)
npm install @matrixui/tokens
```

---

## Quick Start

Call `injectMatrixUITokens()` once at app startup to inject CSS custom properties, then use components normally.

```tsx
import { injectMatrixUITokens } from '@matrixui/tokens'
import { Panel, Button, MatrixRain } from '@matrixui/react'

injectMatrixUITokens()

export default function App() {
  return (
    <Panel style={{ height: 400, width: 600 }}>
      <h1 style={{ color: '#00ff41' }}>MatrixUI</h1>
      <Button variant="primary">Initialize</Button>
    </Panel>
  )
}
```

---

## Design Tokens (`@matrixui/tokens`)

### CSS Injection

```ts
import { injectMatrixUITokens } from '@matrixui/tokens'

// Call once before rendering — injects all --mx-* CSS custom properties into <head>
injectMatrixUITokens()
```

### Token categories

```ts
import {
  colors,
  typography,
  spacing,
  motion,
  shadows,
  borders,
  zIndex,
  rainPresets,
} from '@matrixui/tokens'
```

### Colors

```ts
colors.bg.base        // '#000000' — app background
colors.bg.surface     // '#0a0a0a' — panels, cards
colors.bg.elevated    // '#111111' — hover states, tooltips
colors.bg.overlay     // '#0d0d0d' — modal backdrops

colors.text.primary   // '#e8ffe8' — headings
colors.text.secondary // '#a0c8a0' — body text
colors.text.tertiary  // '#4a7a4a' — metadata, timestamps
colors.text.ghost     // '#1a3a1a' — gutters, placeholders

colors.border.default // '#1a3a1a'
colors.border.focus   // '#00ff41'
colors.border.hover   // '#2a5a2a'

// Status
colors.status.synced  // '#00ff41'
colors.status.ahead   // '#00d4ff'
colors.status.behind  // '#ff3a3a'
colors.status.modified // '#ffd700'

// Diff
colors.diff.added     // '#003300'
colors.diff.removed   // '#1a0000'
colors.diff.neutral   // 'transparent'

// Language dot colors
colors.lang.TypeScript  // '#3178c6'
colors.lang.JavaScript  // '#f7df1e'
colors.lang.Python      // '#3572a5'
// ... and more
```

### Typography

```ts
typography.fontFamilies.display // 'Share Tech Mono, monospace'
typography.fontFamilies.body    // 'JetBrains Mono, monospace'

typography.fontSizes['2xs'] // '8px'
typography.fontSizes.xs     // '10px'
typography.fontSizes.sm     // '11px'
typography.fontSizes.md     // '12px'
typography.fontSizes.lg     // '13px'
typography.fontSizes.xl     // '14px'
typography.fontSizes['2xl'] // '16px'
typography.fontSizes['3xl'] // '20px'

// Pre-composed text styles
typography.textStyles['body/md']    // { fontFamily, fontSize: '12px', fontWeight: 400, ... }
typography.textStyles['mono/hash']  // { fontFamily, fontSize: '11px', letterSpacing: ... }
```

### Spacing

```ts
spacing.space[0]   // '0px'
spacing.space[1]   // '4px'
spacing.space[2]   // '8px'
spacing.space[4]   // '16px'
spacing.space[6]   // '24px'

spacing.radii.sm   // '4px'
spacing.radii.md   // '6px'
spacing.radii.full // '9999px'
```

### Motion

```ts
motion.duration.fast    // '100ms'
motion.duration.normal  // '200ms'
motion.duration.slow    // '300ms'

motion.easing.terminal  // 'cubic-bezier(0.0, 0.0, 0.2, 1)'
motion.transitions.color // 'color 200ms cubic-bezier(...)'
motion.transitions.glow  // 'box-shadow 200ms cubic-bezier(...)'
motion.transitions.toggle // 'all 150ms cubic-bezier(...)'
```

### Shadows

```ts
import { textGlow, boxGlow } from '@matrixui/tokens'

textGlow.greenDefault   // '0 0 8px #00ff41, 0 0 16px ...'
textGlow.cyanDefault    // '0 0 8px #00d4ff, ...'
textGlow.statusSynced   // green glow for synced status

boxGlow.greenFocus      // focus ring — green
boxGlow.cyanFocus       // focus ring — cyan
boxGlow.dangerFocus     // focus ring — red
boxGlow.panelSeam       // inset border glow for panels
```

### Rain Presets

```ts
import { rainPresets } from '@matrixui/tokens'

// Available presets:
// 'titlebar' | 'sidebar' | 'header' | 'tabs' | 'fileList'
// 'diff' | 'history' | 'commitPanel' | 'statusBar' | 'modal'

rainPresets.diff
// { speed: 60, fontSize: 13, opacity: 0.18, headColor: '#ccffdd', ... }
```

---

## React Components (`@matrixui/react`)

### MatrixRain

Canvas-based falling character animation. Used as the background layer for all other components.

```tsx
import { MatrixRain } from '@matrixui/react'

// With a preset
<MatrixRain preset="diff" />

// With overrides
<MatrixRain
  preset="sidebar"
  speed={40}
  opacity={0.3}
  headColor="#00d4ff"
  fontSize={12}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `preset` | `'titlebar' \| 'sidebar' \| 'diff' \| ...` | `'diff'` | Named rain configuration |
| `speed` | `number` | preset value | ms between frames — lower = faster |
| `opacity` | `number` | preset value | Canvas opacity (0–1) |
| `fontSize` | `number` | preset value | Glyph size in px |
| `headColor` | `string` | preset value | Color of the leading glyph |
| `brightColor` | `string` | preset value | Color of mid-trail glyphs |
| `dimColor` | `string` | preset value | Color of trailing glyphs |
| `fadeAlpha` | `number` | preset value | Fade overlay alpha (controls trail length) |

---

### Panel

Container that renders a `<MatrixRain>` background with a semi-transparent content overlay. The base building block for all surfaces.

```tsx
import { Panel } from '@matrixui/react'

<Panel style={{ height: 400, width: 600 }}>
  <p>Content renders above the rain</p>
</Panel>

// Custom rain preset and opacity
<Panel rain={{ preset: 'sidebar' }} bgOpacity={0.85}>
  <nav>Sidebar content</nav>
</Panel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content rendered above the rain layer |
| `rain` | `MatrixRainProps` | `{}` | Props forwarded to the `<MatrixRain>` background |
| `bgOpacity` | `number` | `0.78` | Opacity of the content overlay (0 = fully transparent) |
| `style` | `CSSProperties` | — | Applied to the root element |
| `className` | `string` | — | |

---

### Button

```tsx
import { Button } from '@matrixui/react'

<Button variant="primary" size="md">Commit</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger">Discard Changes</Button>
<Button variant="cyan">Sync</Button>
<Button loading>Pushing...</Button>
<Button disabled>Locked</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'ghost' \| 'danger' \| 'cyan'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `loading` | `boolean` | `false` | Shows a cycling spinner, disables clicks |

Extends all `HTMLButtonElement` attributes.

---

### Input

```tsx
import { Input } from '@matrixui/react'

<Input
  variant="green"
  placeholder="Search commits..."
  value={query}
  onChange={e => setQuery(e.target.value)}
/>

// Error state
<Input variant="cyan" error value={val} onChange={...} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'green' \| 'cyan'` | `'green'` | Border and glow color |
| `error` | `boolean` | `false` | Red border + error glow |

Extends all `HTMLInputElement` attributes.

---

### Textarea

Same API as `Input` but for multi-line text. User resizing is disabled.

```tsx
import { Textarea } from '@matrixui/react'

<Textarea
  variant="green"
  placeholder="Commit message..."
  value={msg}
  onChange={e => setMsg(e.target.value)}
  rows={4}
/>
```

Extends all `HTMLTextAreaElement` attributes.

---

### Avatar

```tsx
import { Avatar } from '@matrixui/react'

// Initials from name
<Avatar name="Ada Lovelace" size="md" />

// With image
<Avatar name="Ada Lovelace" src="/avatars/ada.png" size="lg" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Used to generate initials (first + last word initial) |
| `src` | `string` | — | Image URL — renders `<img>` when provided |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `sm`=24px, `md`=32px, `lg`=40px |

---

### Badge

```tsx
import { Badge } from '@matrixui/react'

<Badge variant="synced" />
<Badge variant="ahead" />
<Badge variant="behind" />
<Badge variant="modified" />
<Badge variant="count" count={3} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'synced' \| 'ahead' \| 'modified' \| 'behind' \| 'count'` | `'synced'` | Visual style |
| `count` | `number` | — | Number shown when `variant="count"` |

---

### Tag

```tsx
import { Tag } from '@matrixui/react'

<Tag variant="lang" label="TypeScript" language="TypeScript" />
<Tag variant="version" label="v2.1.0" />
<Tag variant="branch" label="feat/matrix-rain" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'lang' \| 'version' \| 'branch'` | — | Required |
| `label` | `string` | — | Display text |
| `language` | `string` | — | Used to look up the language dot color (only for `variant="lang"`) |

---

### Switch

```tsx
import { Switch } from '@matrixui/react'

const [enabled, setEnabled] = useState(false)

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Dark mode"
/>

<Switch checked={true} onChange={() => {}} disabled />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Required |
| `onChange` | `(checked: boolean) => void` | — | Required |
| `disabled` | `boolean` | `false` | |
| `label` | `string` | — | Renders a label to the right |

---

### DiffLine

```tsx
import { DiffLine } from '@matrixui/react'

<DiffLine type="added"   lineNo={42} content="+ const x = useMatrixRain(ref)" />
<DiffLine type="removed" lineNo={41} content="- const x = useOldHook(ref)" />
<DiffLine type="neutral" lineNo={40} content="  import { useMatrixRain } from '@matrixui/react'" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'added' \| 'removed' \| 'neutral'` | — | Required. Controls background and text color |
| `content` | `string` | — | Raw line text |
| `lineNo` | `number` | — | Line number rendered in the gutter |

---

### CommitRow

```tsx
import { CommitRow } from '@matrixui/react'

<CommitRow
  author="Ada Lovelace"
  message="feat: add matrix rain animation"
  hash="a1b2c3d"
  time="2h ago"
  fileCount={4}
  onClick={() => openCommit('a1b2c3d')}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `author` | `string` | — | Passed to an internal `<Avatar>` |
| `message` | `string` | — | Commit subject line |
| `hash` | `string` | — | Short SHA — displayed in mono style |
| `time` | `string` | — | Pre-formatted time string (e.g. `"3h ago"`) |
| `fileCount` | `number` | — | Shown in meta row |
| `onClick` | `() => void` | — | Row click handler |

---

### Tooltip

```tsx
import { Tooltip } from '@matrixui/react'

<Tooltip content="Push to remote" placement="top">
  <Button variant="primary">Push</Button>
</Tooltip>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip body |
| `children` | `ReactElement` | — | The trigger element |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | |

---

### ContextMenu

```tsx
import { ContextMenu } from '@matrixui/react'

const items = [
  { type: 'action', label: 'Open file', onClick: () => {} },
  { type: 'action', label: 'Copy path', onClick: () => {} },
  { type: 'separator' },
  { type: 'action', label: 'Delete', danger: true, onClick: () => {} },
]

<ContextMenu items={items}>
  <div onContextMenu={...}>Right-click me</div>
</ContextMenu>
```

| Prop | Type | Description |
|------|------|-------------|
| `items` | `ContextMenuItem[]` | Menu item definitions |
| `children` | `ReactElement` | The element that triggers the context menu |

**ContextMenuItem:**

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'action' \| 'separator' \| 'submenu'` | |
| `label` | `string` | Display text |
| `disabled` | `boolean` | Grays out the item |
| `danger` | `boolean` | Red color scheme |
| `onClick` | `() => void` | Handler for `action` items |
| `items` | `ContextMenuItem[]` | Nested items for `submenu` type |

---

### Toast

The toast system uses React Context. Wrap your app in `<ToastProvider>` and call `useToast()` anywhere inside.

```tsx
import { ToastProvider, useToast } from '@matrixui/react'

// Wrap your app
function App() {
  return (
    <ToastProvider>
      <MyApp />
    </ToastProvider>
  )
}

// Use anywhere inside
function PushButton() {
  const { addToast } = useToast()

  return (
    <Button
      onClick={() => {
        push()
        addToast({ variant: 'success', message: 'Pushed to origin/main' })
      }}
    >
      Push
    </Button>
  )
}
```

**`addToast` options:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'error' \| 'warn'` | `'info'` | |
| `message` | `string` | — | |
| `duration` | `number` | `4000` | Auto-dismiss after ms. |

Max 3 toasts visible at once — extras queue automatically.

---

### Modal

```tsx
import { Modal, Button } from '@matrixui/react'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Resolve Conflict</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Merge Conflict"
  size="md"
>
  <p>Choose which version to keep.</p>
  <Button variant="primary">Keep Ours</Button>
  <Button variant="ghost">Keep Theirs</Button>
</Modal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Required |
| `onClose` | `() => void` | — | Called on backdrop click or Escape |
| `title` | `string` | — | Rendered in the modal header |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `sm`=360px, `md`=480px, `lg`=640px wide |
| `children` | `ReactNode` | — | |

---

### Titlebar

Designed for Tauri / Electron apps. Includes `data-tauri-drag-region` and `-webkit-app-region: drag` out of the box.

```tsx
import { Titlebar } from '@matrixui/react'

<Titlebar
  appName="GitMatrix"
  version="v2.1.0"
  menuItems={[
    { label: 'File', onClick: () => {} },
    { label: 'View', onClick: () => {} },
    { label: 'Help', onClick: () => {} },
  ]}
  onMinimize={window.__TAURI__?.window.getCurrent().minimize}
  onMaximize={window.__TAURI__?.window.getCurrent().toggleMaximize}
  onClose={window.__TAURI__?.window.getCurrent().close}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `appName` | `string` | Displayed after the `⬡` icon |
| `version` | `string` | Version string |
| `menuItems` | `TitlebarMenuItem[]` | Menu items rendered in the menu bar |
| `onMinimize` | `() => void` | `—` window control handler |
| `onMaximize` | `() => void` | `□` window control handler |
| `onClose` | `() => void` | `×` window control handler |

---

### Sidebar

```tsx
import { Sidebar } from '@matrixui/react'

<Sidebar
  header={<span>Repositories</span>}
  footer={<Button variant="ghost" size="sm">+ Add Repo</Button>}
>
  {repos.map(repo => (
    <CommitRow key={repo.id} {...repo} />
  ))}
</Sidebar>
```

| Prop | Type | Description |
|------|------|-------------|
| `header` | `ReactNode` | Fixed slot above the scrollable list |
| `footer` | `ReactNode` | Fixed slot below the scrollable list |
| `children` | `ReactNode` | Scrollable list content |

---

## Hooks

### `useMatrixRain`

Low-level hook that drives the canvas animation. Used internally by `<MatrixRain>` — use this if you need the rain on a canvas you control directly.

```ts
import { useRef } from 'react'
import { useMatrixRain } from '@matrixui/react'

function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useMatrixRain(canvasRef, {
    preset: 'diff',
    speed: 40,
    headColor: '#00d4ff',
  })

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
}
```

**Config** extends `Partial<RainPreset>`:

| Field | Type | Description |
|-------|------|-------------|
| `preset` | `keyof typeof rainPresets` | Named preset to use as base values |
| `speed` | `number` | ms between frames |
| `fontSize` | `number` | Glyph size in px |
| `opacity` | `number` | Canvas opacity |
| `headColor` | `string` | Leading glyph color |
| `brightColor` | `string` | Mid-trail glyph color |
| `dimColor` | `string` | Tail glyph color |
| `fadeAlpha` | `number` | Black overlay alpha per frame |

---

### `useGlitch`

Returns `{ isGlitching: boolean }` that toggles on a randomised interval. Use it to drive glitch CSS effects.

```tsx
import { useGlitch } from '@matrixui/react'

function GlitchText({ children }: { children: string }) {
  const { isGlitching } = useGlitch()

  return (
    <span
      style={{
        filter: isGlitching
          ? 'hue-rotate(90deg) brightness(1.4)'
          : 'none',
        transition: 'filter 50ms',
      }}
    >
      {children}
    </span>
  )
}
```

---

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Lint
pnpm lint

# Start Storybook (component explorer)
pnpm storybook
```

### Monorepo structure

```
matrix-ui/
├── packages/
│   ├── tokens/   → @matrixui/tokens
│   └── react/    → @matrixui/react
└── .storybook/
```

Build order matters: `@matrixui/tokens` must be built before `@matrixui/react` because the React package imports types from the compiled tokens dist.

---

## Publishing

Publish is automated via GitHub Actions on git tag push:

```bash
# Bump versions in packages/tokens/package.json + packages/react/package.json
git commit -m "chore: release v1.1.0"
git tag v1.1.0
git push origin v1.1.0
```

Requires `NPM_TOKEN` in GitHub repo Secrets → Actions.

---

## License

MIT — see [LICENSE](./LICENSE).
