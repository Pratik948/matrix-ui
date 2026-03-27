# MatrixUI — Figma Design Specification
### Complete handoff document for translating the token system into a Figma library

---

## How to use this document

This spec defines every decision needed to build the MatrixUI Figma library from scratch. Work through it in order: Foundations → Components → Patterns. Each section includes exact values, naming conventions, and notes on Figma-specific behavior.

---

## Part 1: Figma Library Setup

### File structure

```
MatrixUI.fig
├── 🎨 Foundations
│   ├── Colors          ← Color styles + Variables
│   ├── Typography      ← Text styles
│   ├── Spacing         ← Variables (spacing, sizing)
│   ├── Shadows & Glows ← Effect styles
│   └── Icons           ← Icon components
├── 🧱 Components
│   ├── Primitives      ← Button, Input, Badge, Switch, Tag
│   ├── Layout          ← Panel, Sidebar, Titlebar, StatusBar
│   ├── Git UI          ← DiffLine, CommitRow, FileRow, Avatar
│   └── Overlays        ← Modal, Toast, Tooltip, ContextMenu
└── 📐 Patterns
    ├── App Shell       ← Full window layout
    ├── Changes View    ← Staged/unstaged + diff
    ├── History View    ← Commit log
    └── Commit Panel    ← Right panel
```

### Figma settings
- **Grid:** 4px base grid on all frames
- **Nudge:** Small nudge = 1px, Large nudge = 4px
- **Color profile:** Unmanaged (sRGB)
- **Unit:** px throughout

---

## Part 2: Color Styles & Variables

### Step 1: Create Color Styles (raw palette)

Create a "Colors" page in Figma. Create a solid rectangle for each entry.
**Naming convention: `[Family]/[Step]`**

#### Green family (primary brand hue)
| Style Name    | Hex Value | Usage note |
|---------------|-----------|-----------|
| Green/950     | `#000500` | Absolute void backgrounds |
| Green/900     | `#000a00` | Panel surfaces |
| Green/800     | `#001200` | Elevated/hovered surfaces |
| Green/700     | `#001a00` | Subtle dividers |
| Green/600     | `#002800` | Standard borders |
| Green/500     | `#003300` | Prominent borders |
| Green/400     | `#006600` | Muted / placeholder text |
| Green/300     | `#00aa33` | Secondary text |
| Green/200     | `#00cc44` | Primary text |
| Green/100     | `#00ff41` | ⭐ BRAND GREEN — primary actions, rain glyph |
| Green/75      | `#66ff88` | Rain head glyphs, highlights |
| Green/50      | `#ccffdd` | Near-white labels |

#### Cyan family (accent)
| Style Name  | Hex Value | Usage note |
|-------------|-----------|-----------|
| Cyan/900    | `#000d0d` | |
| Cyan/700    | `#002233` | Cyan panel backgrounds |
| Cyan/600    | `#003344` | Cyan borders |
| Cyan/500    | `#006677` | Muted cyan text |
| Cyan/400    | `#009999` | Secondary cyan text |
| Cyan/300    | `#00cccc` | ⭐ CYAN ACCENT — commit panel |
| Cyan/100    | `#aaffff` | Cyan highlights |

#### Amber family (warnings)
| Style Name  | Hex Value | Usage note |
|-------------|-----------|-----------|
| Amber/700   | `#2a1a00` | |
| Amber/300   | `#ffcc00` | ⭐ MODIFIED indicator |
| Amber/100   | `#ffee88` | |

#### Red family (danger)
| Style Name | Hex Value | Usage note |
|------------|-----------|-----------|
| Red/900    | `#0d0000` | |
| Red/500    | `#660000` | |
| Red/300    | `#ff4444` | ⭐ DANGER — deleted lines, conflicts |
| Red/100    | `#ffaaaa` | |

#### Neutrals
| Style Name | Hex Value |
|------------|-----------|
| Black      | `#000000` |
| White      | `#ffffff` |

---

### Step 2: Create Figma Variables (semantic layer)

In Figma Variables panel, create a collection called **"MatrixUI"** with one mode: **Dark**.

> ℹ️ MatrixUI ships dark-only. Light mode is not in scope.

#### Background variables
| Variable Name          | Value (Dark)          |
|-----------------------|------------------------|
| bg/base               | `#000000`              |
| bg/surface            | `#000a00`              |
| bg/elevated           | `#001200`              |
| bg/overlay            | `rgba(0, 10, 0, 0.72)` |
| bg/modal              | `rgba(0, 8, 0, 0.94)`  |
| bg/input              | `rgba(0, 18, 0, 0.60)` |
| bg/input-cyan         | `rgba(0, 12, 16, 0.60)`|
| bg/selection          | `rgba(0, 255, 65, 0.12)`|

#### Text variables
| Variable Name          | Value (Dark) |
|-----------------------|--------------|
| text/primary          | `#00ff41`    |
| text/secondary        | `#00cc44`    |
| text/tertiary         | `#00aa33`    |
| text/muted            | `#006600`    |
| text/dim              | `#003300`    |
| text/ghost            | `#002800`    |
| text/cyan-primary     | `#00cccc`    |
| text/danger           | `#ff4444`    |
| text/warning          | `#ffcc00`    |
| text/added            | `#00ff41`    |
| text/white            | `#ffffff`    |

#### Border variables
| Variable Name          | Value (Dark) |
|-----------------------|--------------|
| border/subtle         | `#001a00`    |
| border/default        | `#002800`    |
| border/strong         | `#003300`    |
| border/active         | `#00ff41`    |
| border/cyan           | `#003344`    |
| border/cyan-active    | `#00cccc`    |
| border/danger         | `#660000`    |

#### Spacing variables
| Variable Name      | Value   |
|-------------------|---------|
| space/micro        | `2px`   |
| space/xs           | `4px`   |
| space/sm           | `8px`   |
| space/md           | `12px`  |
| space/lg           | `16px`  |
| space/xl           | `20px`  |
| space/2xl          | `24px`  |
| space/3xl          | `32px`  |

#### Height variables
| Variable Name          | Value   |
|-----------------------|---------|
| height/titlebar        | `42px`  |
| height/tab-bar         | `38px`  |
| height/repo-header     | `52px`  |
| height/status-bar      | `24px`  |
| height/row-sm          | `32px`  |
| height/row-md          | `40px`  |
| height/row-lg          | `56px`  |

#### Width variables
| Variable Name          | Value   |
|-----------------------|---------|
| width/sidebar          | `220px` |
| width/commit-panel     | `240px` |
| width/file-list        | `230px` |

---

## Part 3: Text Styles

**Naming convention: `[Category]/[Size] [Weight]`**

Create all text styles with:
- Auto layout: Fixed width, clip overflow
- Text align: Left (unless specified)

### Display styles
| Style Name              | Family      | Size  | Weight | Line H | Tracking | Transform |
|------------------------|-------------|-------|--------|--------|----------|-----------|
| Display/App Name        | Share Tech Mono | 18px | Bold | 1.0 | 0.25em | Uppercase |
| Display/Section Header  | Share Tech Mono | 9px  | Regular | 1.0 | 0.14em | Uppercase |
| Display/Panel Title     | Share Tech Mono | 14px | Bold | 1.2 | 0.04em | None |

### Body styles
| Style Name        | Family          | Size  | Weight  | Line H | Tracking |
|------------------|-----------------|-------|---------|--------|----------|
| Body/SM Regular   | JetBrains Mono  | 11px  | Regular | 1.4    | 0.04em   |
| Body/SM Medium    | JetBrains Mono  | 11px  | Medium  | 1.4    | 0.04em   |
| Body/Base Regular | JetBrains Mono  | 12px  | Regular | 1.5    | 0.04em   |
| Body/Base Bold    | JetBrains Mono  | 12px  | Bold    | 1.2    | 0.04em   |
| Body/MD Regular   | JetBrains Mono  | 13px  | Regular | 1.5    | 0em      |

### UI styles (buttons, tabs, labels)
| Style Name          | Family         | Size  | Weight  | Line H | Tracking | Transform |
|--------------------|----------------|-------|---------|--------|----------|-----------|
| UI/Button Label     | JetBrains Mono | 11px  | Regular | 1.0    | 0.08em   | Uppercase |
| UI/Tab Label        | JetBrains Mono | 11px  | Regular | 1.0    | 0.14em   | Uppercase |
| UI/Menu Item        | JetBrains Mono | 11px  | Regular | 1.0    | 0.04em   | None |
| UI/Status Bar       | JetBrains Mono | 8px   | Regular | 1.0    | 0em      | None |

### Mono / code styles
| Style Name     | Family         | Size  | Weight  | Line H | Tracking |
|---------------|----------------|-------|---------|--------|----------|
| Mono/Diff     | JetBrains Mono | 13px  | Regular | 1.75   | 0em      |
| Mono/Hash     | JetBrains Mono | 11px  | Regular | 1.0    | 0em      |
| Mono/Path     | JetBrains Mono | 12px  | Regular | 1.4    | 0em      |
| Mono/Badge    | JetBrains Mono | 9px   | Medium  | 1.0    | 0em      |

> ℹ️ **Figma fonts note:** JetBrains Mono is available as a free Google Font. Install it via `figma.google.com/fonts`. Share Tech Mono is also on Google Fonts.

---

## Part 4: Effect Styles (Glows)

**Naming convention: `Glow/[Color]/[Intensity]`**

All glows are **Drop Shadow** effects with:
- X: 0, Y: 0 (centered)
- Blend mode: Normal
- No inner shadow (except Focus Ring)

### Text glows
Applied via "Text Layer" effects in Figma (Drop Shadow on text):

| Style Name              | X  | Y  | Blur | Spread | Color             | Opacity |
|------------------------|----|----|------|--------|-------------------|---------|
| Glow/Green/Subtle      | 0  | 0  | 4    | 0      | `#00ff41`         | 20%     |
| Glow/Green/Soft        | 0  | 0  | 6    | 0      | `#00ff41`         | 40%     |
| Glow/Green/Primary     | 0  | 0  | 8    | 0      | `#00ff41`         | 60%     |
| Glow/Green/Strong      | 0  | 0  | 12   | 0      | `#00ff41`         | 80%     |
| Glow/Green/Max         | 0  | 0  | 10   | 0      | `#00ff41`         | 100% + 2nd: 0 0 20 0 50% |
| Glow/Cyan/Primary      | 0  | 0  | 8    | 0      | `#00cccc`         | 60%     |
| Glow/Status/Synced     | 0  | 0  | 6    | 0      | `#00ff41`         | 50%     |
| Glow/Status/Ahead      | 0  | 0  | 6    | 0      | `#00cccc`         | 50%     |
| Glow/Status/Modified   | 0  | 0  | 6    | 0      | `#ffcc00`         | 50%     |
| Glow/Status/Behind     | 0  | 0  | 6    | 0      | `#ff4444`         | 50%     |

### Box glows
Applied to frame/component effects:

| Style Name               | X  | Y  | Blur | Spread | Color     | Opacity |
|-------------------------|----|----|------|--------|-----------|---------|
| Glow/Box/Green/Default  | 0  | 0  | 14   | 0      | `#00ff41` | 25%     |
| Glow/Box/Green/Hover    | 0  | 0  | 20   | 0      | `#00ff41` | 40%     |
| Glow/Box/Green/Active   | 0  | 0  | 24   | 0      | `#00ff41` | 55%     |
| Glow/Box/Green/Focus    | 0  | 0  | 8    | 1      | `#00ff41` | 100%    |
| Glow/Box/Cyan/Default   | 0  | 0  | 14   | 0      | `#00cccc` | 22%     |
| Glow/Box/Cyan/Hover     | 0  | 0  | 22   | 0      | `#00cccc` | 40%     |
| Glow/Box/Danger/Default | 0  | 0  | 10   | 0      | `#ff4444` | 20%     |
| Glow/Box/Danger/Hover   | 0  | 0  | 18   | 0      | `#ff4444` | 40%     |
| Glow/Window             | 0  | 25 | 60   | 0      | `#000000` | 90%     |

---

## Part 5: Component Specifications

### Component anatomy conventions

All MatrixUI components follow this anatomy:
```
[Component]
├── Rain Layer      ← canvas (non-interactive, always z-index 0)
├── Background      ← semi-transparent fill
├── Content         ← actual component content
└── Border          ← 1px stroke on applicable edges
```

In Figma, the **Rain Layer** is represented as a rectangle with a "MatrixRain" fill pattern (use a screenshot of the rain at the appropriate preset opacity) — it cannot be animated in Figma, so document the preset name.

---

### Button

**Variants:** `variant` × `size` × `state`
- variant: `primary | ghost | danger | cyan`
- size: `sm | md | lg`
- state: `default | hover | active | focused | disabled`

| Property            | Primary          | Ghost            | Danger           | Cyan             |
|--------------------|------------------|------------------|------------------|------------------|
| Height (md)         | 32px             | 32px             | 32px             | 32px             |
| Padding H (md)      | 16px             | 16px             | 16px             | 16px             |
| Border width        | 1px              | 1px              | 1px              | 1px              |
| Border radius       | 0px              | 0px              | 0px              | 0px              |
| Font style          | UI/Button Label  | UI/Button Label  | UI/Button Label  | UI/Button Label  |
| Text color          | text/primary     | text/muted       | text/danger      | text/cyan-primary|
| Border color        | border/active    | border/default   | border/danger    | border/cyan-active |
| Background          | bg/input (10%)   | transparent      | danger (10%)     | cyan (10%)       |
| Glow (default)      | Glow/Box/Green/Default | none       | Glow/Box/Danger/Default | Glow/Box/Cyan/Default |
| Glow (hover)        | Glow/Box/Green/Hover | Glow/Box/Green/Faint | Glow/Box/Danger/Hover | Glow/Box/Cyan/Hover |
| Text glow (default) | Glow/Green/Soft  | none             | none             | Glow/Cyan/Soft   |

**Size modifiers:**
| Size | Height | Padding H | Font Size |
|------|--------|-----------|-----------|
| sm   | 26px   | 12px      | 10px      |
| md   | 32px   | 16px      | 11px      |
| lg   | 38px   | 20px      | 12px      |

**Disabled state:** opacity 0.35, no glow, cursor not-allowed

---

### Input / Textarea

| Property        | Default                | Focused               |
|----------------|------------------------|-----------------------|
| Border          | border/default (1px)   | border/active (1px)   |
| Background      | bg/input               | bg/input              |
| Text color      | text/secondary         | text/primary          |
| Placeholder     | text/muted             | text/muted            |
| Border radius   | 0px                    | 0px                   |
| Glow            | none                   | Glow/Box/Green/Focus  |
| Padding         | 10px 10px              | 10px 10px             |
| Font            | Body/MD Regular        | Body/MD Regular       |
| Caret color     | text/primary           | text/primary          |

**Cyan variant** (used in commit panel):
- Border: border/cyan → border/cyan-active on focus
- Text: text/cyan-primary
- Glow on focus: Glow/Box/Cyan/Focus

---

### Badge / Status Chip

| Variant  | Text          | Color Token        | Background                  |
|----------|---------------|--------------------|-----------------------------|
| Synced   | ◉ SYNCED      | status/synced      | rgba(0, 255, 65, 0.08)      |
| Ahead    | ↑ AHEAD       | status/ahead       | rgba(0, 204, 204, 0.08)     |
| Modified | ◈ MODIFIED    | status/modified    | rgba(255, 204, 0, 0.08)     |
| Behind   | ↓ BEHIND      | status/behind      | rgba(255, 68, 68, 0.08)     |
| Count    | [number]      | text/primary       | rgba(0, 255, 65, 0.10)      |

All badges:
- Font: Mono/Badge
- Padding: 2px 6px
- Border: 1px solid matching color at 30% opacity
- Border radius: 2px

---

### Switch (Toggle)

| Property     | Off               | On                  |
|-------------|-------------------|---------------------|
| Track width  | 34px              | 34px                |
| Track height | 17px              | 17px                |
| Track bg     | bg/input (50%)    | rgba(0,200,255,0.15)|
| Track border | border/subtle     | border/cyan-active  |
| Thumb size   | 11×11px           | 11×11px             |
| Thumb bg     | border/default    | text/cyan-primary   |
| Thumb pos    | left: 2px         | left: 19px          |
| Thumb glow   | none              | Glow/Cyan/Primary   |
| Track radius | 9px (pill)        | 9px (pill)          |

---

### DiffLine

| Type     | Background                    | Left Border (3px)  | Text Color        |
|---------|-------------------------------|--------------------|-------------------|
| added   | rgba(0, 255, 65, 0.08)       | border/active      | text/added        |
| removed | rgba(255, 40, 0, 0.08)       | border/danger      | text/danger       |
| neutral | transparent                   | transparent        | text/dim          |

- Height: auto (min 28px)
- Padding: 2px 16px
- Font: Mono/Diff
- Line height: 1.75
- Text glow: added → Glow/Green/Subtle, removed → none

---

### CommitRow

| Element      | Property                                              |
|-------------|-------------------------------------------------------|
| Container   | height: 56px min, padding: 12px 20px, border-bottom: border/subtle |
| Avatar      | 32×32px, border-radius: 50%, bg: bg/elevated, border: border/default |
| Avatar text | Body/Base Bold, color: text/tertiary, Glow/Green/Soft |
| Message     | Body/MD Regular, color: text/secondary               |
| Meta row    | Body/SM Regular, color: text/muted                   |
| Hash badge  | Mono/Hash, bg: bg/elevated, border: border/subtle     |
| Hover state | bg: bg/elevated                                       |

---

### Panel (RainPanel)

| Property       | Value                          |
|---------------|--------------------------------|
| Position       | relative, overflow: hidden     |
| Background     | Semi-transparent (see bg/overlay) |
| Rain layer     | absolute, inset 0, z-index: 0  |
| Content layer  | relative, z-index: 1           |
| Rain preset    | Specified per usage (see Part 6) |

In Figma: Use a frame with Auto Layout. Add a rectangle behind with the rain screenshot + appropriate opacity.

---

### Titlebar

| Property           | Value                              |
|-------------------|------------------------------------|
| Height             | 42px                               |
| Background         | bg/overlay                         |
| Border bottom      | border/default                     |
| Rain preset        | `titlebar`                         |
| App icon           | 20px, color: text/primary, Glow/Green/Max |
| App name           | Display/App Name, Glow/Green/Max   |
| Version label      | Body/SM Regular, color: text/ghost |
| Menu items         | UI/Menu Item, color: text/muted    |
| Menu hover         | color: text/primary, Glow/Green/Soft |
| Drag region        | entire bar except window controls  |

**Window Controls (Matrix-style, no OS buttons):**
| Control  | Symbol | Default color    | Hover color     | Size     |
|---------|--------|------------------|-----------------|----------|
| Minimize | —      | border/strong    | text/muted      | 11×11px  |
| Maximize | □      | border/strong    | text/muted      | 11×11px  |
| Close    | ×      | border/strong    | text/danger     | 11×11px  |

All window controls: border-radius 0 (square dots), border: 1px solid currentColor

---

### Sidebar

| Property       | Value              |
|---------------|--------------------|
| Width          | 220px (fixed)      |
| Background     | bg/surface (76%)   |
| Border right   | border/subtle      |
| Rain preset    | `sidebar`          |

**Repo Row (within sidebar):**
| State    | Left border         | Background                   |
|---------|---------------------|------------------------------|
| Default  | transparent (2px)   | transparent                  |
| Hover    | transparent (2px)   | bg/elevated                  |
| Active   | border/active (2px) | rgba(0, 255, 65, 0.06)       |

---

### StatusBar

| Property    | Value                          |
|------------|--------------------------------|
| Height      | 24px                           |
| Background  | rgba(0, 255, 65, 0.05)         |
| Border top  | border/default                 |
| Font        | UI/Status Bar                  |
| Text color  | text/muted                     |
| Rain preset | `statusBar`                    |

---

### Toast / Notification

| Variant | Border left (3px)  | Background               |
|--------|---------------------|--------------------------|
| Info   | border/active       | bg/surface               |
| Success| status/synced       | rgba(0, 255, 65, 0.06)   |
| Error  | border/danger       | rgba(255, 68, 68, 0.06)  |
| Warn   | status/modified     | rgba(255, 204, 0, 0.06)  |

- Width: 320px
- Padding: 12px 16px
- Border: 1px solid border/default (all sides) + 3px left
- Font: Body/SM Regular
- Position: fixed, bottom-right, z-index: toast (300)
- Enter: slide up + fade in, 200ms terminal easing
- Exit: fade out, 150ms exit easing

---

## Part 6: Rain Preset Reference for Figma Layers

When annotating components in Figma, add a note layer with the rain preset name.
Use this reference to know which screenshot/opacity to use for the rain rectangle.

| Panel / Component      | Rain Preset   | Figma opacity | Dominant color |
|-----------------------|---------------|---------------|----------------|
| Titlebar               | titlebar      | 22%           | Green          |
| Left sidebar           | sidebar       | 38%           | Dark green     |
| Repo header bar        | header        | 20%           | Bright green   |
| Tab navigation strip   | tabs          | 18%           | Mid green      |
| File list pane         | fileList      | 28%           | Yellow-green   |
| Diff / code view       | diff          | 30%           | Bright green   |
| Commit history         | history       | 32%           | Soft green     |
| Commit panel (right)   | commitPanel   | 35%           | Cyan           |
| Status bar             | statusBar     | 28%           | Green          |
| Modal overlay          | modal         | 40%           | Bright green   |

---

## Part 7: Icon Set

All icons are 12×12px or 16×16px SVG. Stroke style only (no fill), 1px stroke width.

### Git operation icons
| Name           | Symbol | Usage |
|---------------|--------|-------|
| branch         | ⎇      | Branch indicator |
| push           | ↑      | Push action |
| pull/fetch     | ↓      | Fetch / pull action |
| commit         | ◆      | Commit dot in graph |
| merge          | ⊕      | Merge operation |
| stash          | ◈      | Stash operation |
| tag            | ◇      | Tag indicator |
| conflict       | ⚡     | Merge conflict |

### Status icons
| Name           | Symbol | Color token       |
|---------------|--------|-------------------|
| synced         | ◉      | status/synced     |
| ahead          | ↑      | status/ahead      |
| modified       | ◈      | status/modified   |
| behind         | ↓      | status/behind     |
| untracked      | ?      | text/muted        |

### File status icons (diff)
| Name     | Symbol | Color token  |
|---------|--------|--------------|
| added    | A      | text/added   |
| modified | M      | text/warning |
| deleted  | D      | text/danger  |
| renamed  | R      | status/ahead |

---

## Part 8: Spacing & Layout Grid

### The 4px grid

All spacing in MatrixUI is a multiple of 4px. In Figma:
1. Set frame grid: 4px, columns, opacity 10%
2. Nudge: Large nudge = 4px (Figma preferences)

### Standard component padding anatomy

```
┌─────────────────────────────────┐
│ ← 16px →  content  ← 16px →   │  Panel (horizontal)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 10px top                        │
│ ← 14px →  content  ← 14px →   │  Sidebar row
│ 10px bottom                     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 6px top                         │
│ ← 16px →  content  ← 16px →   │  Button (md)
│ 6px bottom                      │
└─────────────────────────────────┘
```

---

## Part 9: Interaction States Summary

Every interactive element passes through these states in order:

```
disabled → default → hover → focused → active → disabled
```

| State    | Border change  | Background change | Glow change         | Text change      |
|---------|---------------|-------------------|---------------------|------------------|
| default  | border/default | bg/input          | none                | text/muted       |
| hover    | border/strong  | bg/elevated       | Glow/Box/Green/Faint| text/tertiary    |
| focused  | border/active  | bg/input          | Glow/Box/Green/Focus| text/primary     |
| active   | border/active  | bg/selection      | Glow/Box/Green/Active| text/primary    |
| disabled | border/subtle  | transparent       | none                | text/ghost (35%) |

---

## Part 10: Accessibility Notes

MatrixUI is intentionally low-contrast in its dim states (text/dim, text/ghost). This is by design for non-essential metadata. However, all **interactive and primary content** meets WCAG AA:

| Element               | Foreground  | Background | Contrast ratio |
|-----------------------|-------------|------------|----------------|
| Primary text on base  | `#00ff41`   | `#000000`  | 10.7:1 ✅ AAA  |
| Secondary text        | `#00cc44`   | `#000a00`  | 8.2:1  ✅ AA   |
| Button label          | `#00ff41`   | `#001200`  | 9.4:1  ✅ AAA  |
| Danger text           | `#ff4444`   | `#000000`  | 5.1:1  ✅ AA   |
| Warning/modified      | `#ffcc00`   | `#000000`  | 14.5:1 ✅ AAA  |
| Muted text (info only)| `#006600`   | `#000000`  | 3.1:1  ⚠️ decorative only |

> All muted/ghost text should only be used for non-essential decorative content (metadata, timestamps).

---

*Last updated: MatrixUI v1.0 — "Wake up, designer."*
