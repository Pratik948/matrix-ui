# MatrixUI — Component API Reference

All components accept a `className` and `style` prop for overrides.
All components are typed with TypeScript.

---

## MatrixRain

The animated canvas rain that lives behind every panel.

```tsx
import { MatrixRain } from '@matrixui/react'

<MatrixRain preset="sidebar" />
<MatrixRain
  preset="diff"
  // Override individual preset values:
  opacity={0.15}
  speed={60}
/>
```

| Prop        | Type                         | Default    | Description |
|-------------|------------------------------|------------|-------------|
| `preset`    | `RainPresetName`             | `'diff'`   | Named preset (see motion.ts rainPresets) |
| `opacity`   | `number`                     | preset     | 0–1 canvas opacity |
| `speed`     | `number`                     | preset     | ms per frame (lower = faster) |
| `fontSize`  | `number`                     | preset     | Glyph size in px |
| `headColor` | `string`                     | preset     | Leading glyph color |
| `brightColor`| `string`                    | preset     | Mid-trail color |
| `dimColor`  | `string`                     | preset     | Trailing dim color |
| `fadeAlpha` | `number`                     | preset     | Overlay alpha (trail length) |

---

## Panel (RainPanel)

A container that provides a MatrixRain background and semi-transparent surface.
This is the primary layout primitive — all major sections use it.

```tsx
import { Panel } from '@matrixui/react'

<Panel rain={{ preset: 'sidebar' }} style={{ width: 220 }}>
  {/* content */}
</Panel>
```

| Prop         | Type                | Default | Description |
|-------------|---------------------|---------|-------------|
| `rain`       | `RainConfig`        | —       | Rain configuration (preset or individual values) |
| `bgOpacity`  | `number`            | `0.78`  | Background overlay opacity (0–1) |
| `children`   | `ReactNode`         | —       | Panel content |

---

## Button

```tsx
import { Button } from '@matrixui/react'

<Button variant="primary" size="md" onClick={handlePush}>
  ↑ PUSH ORIGIN
</Button>
```

| Prop        | Type                                      | Default     |
|-------------|-------------------------------------------|-------------|
| `variant`   | `'primary' \| 'ghost' \| 'danger' \| 'cyan'` | `'ghost'`  |
| `size`      | `'sm' \| 'md' \| 'lg'`                  | `'md'`      |
| `disabled`  | `boolean`                                 | `false`     |
| `loading`   | `boolean`                                 | `false`     |
| `leftIcon`  | `ReactNode`                               | —           |
| `rightIcon` | `ReactNode`                               | —           |
| `fullWidth` | `boolean`                                 | `false`     |

---

## Input / Textarea

```tsx
import { Input, Textarea } from '@matrixui/react'

<Input placeholder="// Filter repos..." value={q} onChange={setQ} />
<Textarea
  placeholder="// Enter commit message..."
  variant="cyan"
  rows={3}
/>
```

| Prop        | Type                     | Default     |
|-------------|--------------------------|-------------|
| `variant`   | `'green' \| 'cyan'`      | `'green'`   |
| `size`      | `'sm' \| 'md'`           | `'md'`      |
| `error`     | `boolean \| string`      | `false`     |
| `rows`      | `number` (Textarea only) | `3`         |

---

## Badge

```tsx
import { Badge } from '@matrixui/react'

<Badge variant="synced" />
<Badge variant="count" count={7} />
<Badge variant="fileStatus" status="M" />
```

| Prop      | Type                                        |
|-----------|---------------------------------------------|
| `variant` | `'synced' \| 'ahead' \| 'modified' \| 'behind' \| 'count' \| 'fileStatus'` |
| `count`   | `number` (for count variant)                |
| `status`  | `'A' \| 'M' \| 'D' \| 'R'` (for fileStatus)|

---

## Switch

```tsx
import { Switch } from '@matrixui/react'

<Switch checked={crtMode} onChange={setCrtMode} label="CRT MODE" />
```

| Prop       | Type         |
|------------|--------------|
| `checked`  | `boolean`    |
| `onChange` | `(v: boolean) => void` |
| `label`    | `string`     |
| `disabled` | `boolean`    |

---

## DiffLine

```tsx
import { DiffLine } from '@matrixui/react'

<DiffLine type="added"   content="+  const redPill = await choice.select('red');" />
<DiffLine type="removed" content="-  const bluePill = await choice.select('blue');" />
<DiffLine type="neutral" content="   // I know kung-fu" />
```

| Prop      | Type                                  |
|-----------|---------------------------------------|
| `type`    | `'added' \| 'removed' \| 'neutral'`  |
| `content` | `string`                              |
| `lineNo`  | `number` (optional gutter number)     |

---

## CommitRow

```tsx
import { CommitRow } from '@matrixui/react'

<CommitRow
  hash="a3f9d12"
  message="fix: resolve anomaly in construct.js"
  author="Neo"
  time="2 min ago"
  fileCount={3}
  isLatest
/>
```

| Prop        | Type      |
|-------------|-----------|
| `hash`      | `string`  |
| `message`   | `string`  |
| `author`    | `string`  |
| `time`      | `string`  |
| `fileCount` | `number`  |
| `isLatest`  | `boolean` |
| `onClick`   | `() => void` |

---

## Avatar

```tsx
import { Avatar } from '@matrixui/react'

<Avatar name="Neo" size="md" />
```

| Prop   | Type                  | Default |
|--------|----------------------|---------|
| `name` | `string`             | —       |
| `src`  | `string`             | —       |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

---

## Titlebar

```tsx
import { Titlebar } from '@matrixui/react'

<Titlebar
  appName="CIPHER"
  version="v1.0.0"
  menuItems={['FILE', 'EDIT', 'VIEW', 'REPOSITORY', 'BRANCH', 'HELP']}
  onMinimize={() => invoke('minimize')}
  onMaximize={() => invoke('maximize')}
  onClose={() => invoke('close')}
/>
```

| Prop           | Type           |
|---------------|----------------|
| `appName`     | `string`       |
| `version`     | `string`       |
| `menuItems`   | `string[]`     |
| `onMinimize`  | `() => void`   |
| `onMaximize`  | `() => void`   |
| `onClose`     | `() => void`   |

The titlebar is `data-tauri-drag-region` aware out of the box.

---

## Toast

```tsx
import { useToast } from '@matrixui/react'

const toast = useToast()
toast.success('Pushed to origin/main')
toast.error('Merge conflict detected')
toast.info('Fetching from remote...')
```

| Method         | Signature |
|----------------|-----------|
| `toast.success` | `(message: string, options?) => void` |
| `toast.error`   | `(message: string, options?) => void` |
| `toast.info`    | `(message: string, options?) => void` |
| `toast.warn`    | `(message: string, options?) => void` |

---

## Modal

```tsx
import { Modal } from '@matrixui/react'

<Modal
  isOpen={showConflict}
  onClose={() => setShowConflict(false)}
  title="MERGE CONFLICT"
  size="md"
>
  {/* conflict resolution content */}
</Modal>
```

| Prop       | Type            |
|------------|-----------------|
| `isOpen`   | `boolean`       |
| `onClose`  | `() => void`    |
| `title`    | `string`        |
| `size`     | `'sm' \| 'md' \| 'lg'` |

---

## Tag

```tsx
import { Tag } from '@matrixui/react'

<Tag label="Python" color="#00cc33" />
<Tag label="v1.0.2" variant="version" />
```

| Prop      | Type                                   |
|-----------|----------------------------------------|
| `label`   | `string`                               |
| `color`   | `string` (hex)                         |
| `variant` | `'lang' \| 'version' \| 'branch'`     |
