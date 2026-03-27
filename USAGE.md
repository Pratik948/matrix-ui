# MatrixUI — Component Usage Guide

This guide covers practical patterns for using MatrixUI components together.
For full API reference (all props, types, token values) see [README.md](./README.md).

---

## Setup

```bash
npm install @matrixui/react react react-dom
```

Call `injectMatrixUITokens()` **once** at your app entry point before anything renders:

```tsx
// main.tsx or index.tsx
import { injectMatrixUITokens } from '@matrixui/tokens'
import { createRoot } from 'react-dom/client'
import App from './App'

injectMatrixUITokens()
createRoot(document.getElementById('root')!).render(<App />)
```

---

## Composing a full app shell

```tsx
import { ToastProvider, Titlebar, Sidebar, Panel } from '@matrixui/react'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Titlebar
          appName="GitMatrix"
          version="v1.0.0"
          menuItems={[{ label: 'File' }, { label: 'View' }]}
          onMinimize={() => {}}
          onMaximize={() => {}}
          onClose={() => {}}
        />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar header={<span>Repositories</span>}>
            {/* sidebar rows */}
          </Sidebar>
          <main style={{ flex: 1, overflow: 'auto' }}>
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
```

---

## Panel — the base surface

Every major section of UI should live inside a `<Panel>`. It provides the Matrix rain background and the dark overlay.

```tsx
import { Panel } from '@matrixui/react'

// Basic surface
<Panel style={{ height: '100%', padding: 16 }}>
  <h2>Commit History</h2>
</Panel>

// More opaque overlay (less visible rain)
<Panel bgOpacity={0.92} style={{ padding: 24 }}>
  <p>Settings content</p>
</Panel>

// Choose a rain mood per panel
<Panel rain={{ preset: 'diff' }}>     {/* slow, subtle */}
<Panel rain={{ preset: 'sidebar' }}>  {/* medium, narrow columns */}
<Panel rain={{ preset: 'modal' }}>    {/* fast, dramatic */}

// Override individual rain values
<Panel rain={{ preset: 'diff', speed: 30, opacity: 0.35 }}>
```

---

## Button patterns

```tsx
import { Button } from '@matrixui/react'

// Primary action (green)
<Button variant="primary" onClick={push}>Push</Button>

// Secondary / cancel
<Button variant="ghost" onClick={cancel}>Cancel</Button>

// Destructive
<Button variant="danger" onClick={discard}>Discard Changes</Button>

// Cyan accent (sync, fetch, pull)
<Button variant="cyan" onClick={fetch}>Fetch</Button>

// Async action — show spinner while working
const [loading, setLoading] = useState(false)

<Button
  variant="primary"
  loading={loading}
  onClick={async () => {
    setLoading(true)
    await push()
    setLoading(false)
  }}
>
  Push
</Button>

// Size scale
<Button size="sm">Compact</Button>
<Button size="md">Default</Button>
<Button size="lg">Prominent</Button>
```

---

## Forms — Input, Textarea, Switch

```tsx
import { Input, Textarea, Switch, Button } from '@matrixui/react'

function CommitForm() {
  const [message, setMessage] = useState('')
  const [amend, setAmend]     = useState(false)
  const [error, setError]     = useState(false)

  function submit() {
    if (!message.trim()) { setError(true); return }
    setError(false)
    commit({ message, amend })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input
        variant="green"
        placeholder="Commit summary..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        error={error}
      />
      <Textarea
        variant="green"
        placeholder="Extended description (optional)"
        rows={4}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <Switch
        checked={amend}
        onChange={setAmend}
        label="Amend last commit"
      />
      <Button variant="primary" onClick={submit}>Commit</Button>
    </div>
  )
}
```

---

## Diff view

```tsx
import { DiffLine } from '@matrixui/react'

const lines = [
  { type: 'neutral', lineNo: 1,  content: '  import { useEffect } from "react"' },
  { type: 'removed', lineNo: 2,  content: '- const interval = setInterval(tick, 100)' },
  { type: 'added',   lineNo: 2,  content: '+ const interval = setInterval(tick, cfg.speed)' },
  { type: 'neutral', lineNo: 3,  content: '  return () => clearInterval(interval)' },
]

<Panel rain={{ preset: 'diff' }} style={{ fontFamily: 'monospace' }}>
  {lines.map((line, i) => (
    <DiffLine key={i} type={line.type} lineNo={line.lineNo} content={line.content} />
  ))}
</Panel>
```

---

## Commit history list

```tsx
import { CommitRow, Panel } from '@matrixui/react'

const commits = [
  { hash: 'a1b2c3d', author: 'Ada Lovelace',  message: 'feat: matrix rain hook',      time: '2h ago', fileCount: 3 },
  { hash: 'e4f5g6h', author: 'Alan Turing',    message: 'fix: canvas blur on retina',  time: '5h ago', fileCount: 1 },
  { hash: 'i7j8k9l', author: 'Grace Hopper',   message: 'docs: update CONTRIBUTING',   time: '1d ago', fileCount: 2 },
]

<Panel rain={{ preset: 'history' }}>
  {commits.map(c => (
    <CommitRow
      key={c.hash}
      {...c}
      onClick={() => openCommit(c.hash)}
    />
  ))}
</Panel>
```

---

## Badges and Tags

```tsx
import { Badge, Tag } from '@matrixui/react'

// Repository status badge
<Badge variant="synced" />   // green dot — up to date
<Badge variant="ahead" />    // cyan — commits to push
<Badge variant="behind" />   // red — commits to pull
<Badge variant="modified" /> // amber — uncommitted changes
<Badge variant="count" count={7} />  // numeric badge

// Tagging metadata
<Tag variant="lang"    label="TypeScript" language="TypeScript" />
<Tag variant="version" label="v1.4.2" />
<Tag variant="branch"  label="feat/matrix-rain" />
```

---

## Tooltip — wrapping any trigger

```tsx
import { Tooltip, Button } from '@matrixui/react'

// Wrap any element — Tooltip handles show/hide automatically
<Tooltip content="Push commits to origin/main" placement="bottom">
  <Button variant="primary">Push</Button>
</Tooltip>

<Tooltip content="No remote configured" placement="top">
  <Button variant="ghost" disabled>Sync</Button>
</Tooltip>

// Rich content in tooltip
<Tooltip
  placement="right"
  content={
    <div>
      <strong>3 files changed</strong>
      <br />
      +42 −7
    </div>
  }
>
  <span>{commit.hash}</span>
</Tooltip>
```

---

## ContextMenu — right-click menus

```tsx
import { ContextMenu } from '@matrixui/react'

const fileMenuItems = [
  { type: 'action',    label: 'Open',          onClick: () => open(file) },
  { type: 'action',    label: 'Copy path',      onClick: () => copy(file.path) },
  { type: 'action',    label: 'Reveal in Finder', onClick: () => reveal(file) },
  { type: 'separator' },
  { type: 'action',    label: 'Stage file',    onClick: () => stage(file) },
  { type: 'separator' },
  { type: 'action',    label: 'Delete',        danger: true, onClick: () => del(file) },
]

<ContextMenu items={fileMenuItems}>
  <div className="file-row">{file.name}</div>
</ContextMenu>
```

The menu renders into a portal at `document.body` and closes on outside click, Escape, or scroll.

---

## Toast notifications

Wrap your app in `<ToastProvider>` once, then call `useToast()` anywhere:

```tsx
import { useToast } from '@matrixui/react'

function SyncButton() {
  const { addToast } = useToast()

  async function sync() {
    try {
      await fetchRemote()
      addToast({ variant: 'success', message: 'Fetched from origin' })
    } catch (err) {
      addToast({
        variant: 'error',
        message: 'Fetch failed — check your connection',
        duration: 8000,  // stay longer for errors
      })
    }
  }

  return <Button onClick={sync}>Fetch</Button>
}
```

| Variant | When to use |
|---------|-------------|
| `success` | Operation completed — push, commit, merge |
| `error` | Operation failed — network error, conflict |
| `warn` | Non-blocking issue — stale branch, large file |
| `info` | Neutral update — background sync started |

---

## Modal — dialogs and confirmations

```tsx
import { Modal, Button } from '@matrixui/react'

function DiscardDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Discard Changes
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Discard all changes?"
        size="sm"
      >
        <p style={{ color: '#a0c8a0', marginBottom: 16 }}>
          This will permanently delete your uncommitted changes.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { onConfirm(); setOpen(false) }}>
            Discard
          </Button>
        </div>
      </Modal>
    </>
  )
}
```

---

## Avatar — user identity

```tsx
import { Avatar } from '@matrixui/react'

// Initials only
<Avatar name="Ada Lovelace" />          // renders "AL"
<Avatar name="Grace Hopper" size="lg" />

// With profile image
<Avatar name="Alan Turing" src="/avatars/alan.png" size="md" />

// Common pattern — avatar beside a name
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Avatar name={user.name} src={user.avatarUrl} size="sm" />
  <span>{user.name}</span>
</div>
```

---

## Titlebar (Tauri / Electron)

```tsx
import { Titlebar } from '@matrixui/react'

// Tauri
import { getCurrentWindow } from '@tauri-apps/api/window'
const win = getCurrentWindow()

<Titlebar
  appName="GitMatrix"
  version="v1.0.0"
  menuItems={[
    { label: 'File',     onClick: openFileMenu },
    { label: 'View',     onClick: openViewMenu },
    { label: 'Terminal', onClick: openTerminal },
    { label: 'Help',     onClick: openHelp },
  ]}
  onMinimize={() => win.minimize()}
  onMaximize={() => win.toggleMaximize()}
  onClose={() => win.close()}
/>
```

The root element has `data-tauri-drag-region` and `-webkit-app-region: drag` automatically. Window control buttons have `-webkit-app-region: no-drag` so they remain clickable.

---

## Sidebar with sections

```tsx
import { Sidebar, Badge, Button } from '@matrixui/react'

<Sidebar
  header={
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Repositories</span>
      <Badge variant="count" count={repos.length} />
    </div>
  }
  footer={
    <Button variant="ghost" size="sm" style={{ width: '100%' }}>
      + Clone Repository
    </Button>
  }
>
  {repos.map(repo => (
    <CommitRow
      key={repo.id}
      author={repo.owner}
      message={repo.name}
      hash={repo.branch}
      time={repo.lastActivity}
      onClick={() => selectRepo(repo.id)}
    />
  ))}
</Sidebar>
```

---

## Using hooks directly

### `useGlitch` — glitch effect on any element

```tsx
import { useGlitch } from '@matrixui/react'

function GlitchHeading({ children }: { children: string }) {
  const { isGlitching } = useGlitch()

  return (
    <h1
      style={{
        color: '#00ff41',
        filter: isGlitching ? 'hue-rotate(180deg) brightness(2)' : 'none',
        transform: isGlitching ? 'translateX(2px)' : 'none',
        transition: 'filter 50ms, transform 50ms',
      }}
    >
      {children}
    </h1>
  )
}
```

### `useMatrixRain` — rain on your own canvas

```tsx
import { useRef } from 'react'
import { useMatrixRain } from '@matrixui/react'

function CustomBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useMatrixRain(canvasRef, {
    preset: 'modal',
    headColor: '#00d4ff',   // cyan variant
    speed: 30,
  })

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  )
}
```

---

## Token values in custom components

When building your own components alongside MatrixUI, import tokens directly instead of hardcoding values:

```tsx
import { colors, spacing, textGlow, boxGlow, transitions } from '@matrixui/tokens'

const style: React.CSSProperties = {
  backgroundColor: colors.bg.surface,
  color:           colors.text.primary,
  padding:         `${spacing.space[2]} ${spacing.space[4]}`,
  border:          `1px solid ${colors.border.default}`,
  borderRadius:    spacing.radii.sm,
  textShadow:      textGlow.greenSoft,
  transition:      transitions.color,
}
```

---

## TypeScript — using prop types

All prop interfaces are exported and can be used to type your own wrappers:

```tsx
import type { ButtonProps, ModalProps, ToastItem } from '@matrixui/react'

// Extend a component's props
interface ConfirmButtonProps extends ButtonProps {
  confirmMessage: string
  onConfirm: () => void
}

// Re-use a sub-type
type MyToast = Omit<ToastItem, 'id'>
```
