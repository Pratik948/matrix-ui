# MatrixUI

> *"You take the red pill — you stay in Wonderland, and I show you how deep the design system goes."*

**MatrixUI** is a production-grade design system and React component library built around the aesthetic of the Matrix — cascading green glyphs, phosphor-glow typography, CRT scanlines, and terminal-grade density. It is the visual foundation for all Cipher-ecosystem apps, and any future application that wants to live inside the machine.

---

## Philosophy

| Principle | Description |
|-----------|-------------|
| **Purposeful darkness** | Every surface is dark by intent, not convention. Black and deep greens are the canvas — glows are the ink. |
| **Glow over shadow** | Where other systems use drop shadows for depth, MatrixUI uses luminous text-shadow and box-shadow glows. |
| **Terminals first** | Typography is monospace throughout. Every number, hash, path, and label renders in a fixed-width font. This is not a stylistic quirk — it is load-bearing. |
| **Rain is structural** | The Matrix rain canvas is not decoration. It is a background layer in the component hierarchy, expressing the aliveness of each panel. |
| **Density without clutter** | Information-dense like a real terminal. Never padded like a consumer SaaS product. |
| **Systematic variance** | Every panel can have a different rain speed, hue, and opacity — but all are drawn from the same token set, so the system stays coherent. |

---

## Packages in this repo

```
@matrixui/tokens      — Design tokens (colors, type, spacing, motion, shadows)
@matrixui/react       — React component library
@matrixui/icons       — SVG icon set (glyphs, status, git operations)
```

---

## Quick start

```bash
npm install @matrixui/tokens @matrixui/react
```

```tsx
import { Panel, Button, MatrixRain } from '@matrixui/react'
import '@matrixui/react/styles.css'

export default function App() {
  return (
    <Panel rain={{ preset: 'sidebar' }}>
      <Button variant="primary">Push Origin</Button>
    </Panel>
  )
}
```

---

## Repository structure

```
matrix-ui/
├── src/
│   ├── tokens/                  # All design tokens (TypeScript + CSS variables)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── motion.ts
│   │   ├── shadows.ts
│   │   ├── borders.ts
│   │   ├── zIndex.ts
│   │   └── index.ts
│   └── components/              # React components
│       ├── MatrixRain/
│       ├── Panel/
│       ├── Button/
│       ├── Input/
│       ├── Badge/
│       ├── Switch/
│       ├── Titlebar/
│       ├── DiffLine/
│       ├── CommitRow/
│       ├── Avatar/
│       ├── Toast/
│       ├── Modal/
│       ├── ContextMenu/
│       ├── Tooltip/
│       ├── Sidebar/
│       └── Tag/
├── docs/
│   ├── FIGMA_SPEC.md            # Full Figma handoff document
│   ├── TOKENS.md                # Token reference for designers
│   ├── COMPONENTS.md            # Component usage guide
│   └── RAIN_PRESETS.md          # MatrixRain configuration reference
├── storybook/                   # Visual component docs
├── package.json
├── tsconfig.json
└── README.md
```

---

## Design tools

| Tool | Status | Notes |
|------|--------|-------|
| Figma | 🔜 Planned | Full token + component library. See `docs/FIGMA_SPEC.md` for handoff spec |
| Storybook | ✅ Included | `npm run storybook` |
| Chromatic | 🔜 Planned | Visual regression testing |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT — use it, fork it, ship it.
