/**
 * @matrixui/tokens — Color System
 *
 * MatrixUI uses a carefully constrained palette. There are no gradients between
 * unrelated hues. Instead, each hue family has a deep scale (900→50) that can
 * be used for backgrounds, borders, body text, and glows respectively.
 *
 * Figma notes:
 *   - Each scale entry maps to a Figma Color Style: e.g. "Green/200"
 *   - Glow values are NOT color styles — they are Effect Styles (see shadows.ts)
 *   - The semantic layer (surface, text, border…) maps to Figma Variables
 */

// ─────────────────────────────────────────────
// RAW PALETTE
// Named by luminance step within each hue family.
// 900 = darkest (backgrounds), 50 = lightest (highlights)
// ─────────────────────────────────────────────

export const palette = {

  // ── Green — primary brand hue ──────────────────────────────────────────────
  // The iconic phosphor green of a Matrix terminal.
  // 200 is "THE" green — the one you see in the rain.
  green: {
    950: '#000500',   // Absolute void — used only for deepest backgrounds
    900: '#000a00',   // Panel backgrounds (sidebar, modals)
    800: '#001200',   // Elevated surfaces (hovered rows)
    700: '#001a00',   // Subtle dividers
    600: '#002800',   // Borders (default)
    500: '#003300',   // Borders (prominent), scrollbar track
    400: '#006600',   // Muted / placeholder text
    300: '#00aa33',   // Secondary body text
    200: '#00cc44',   // Primary body text
    100: '#00ff41',   // ★ Brand green — active, focused, primary actions, rain glyph
    75:  '#66ff88',   // Rain head glyphs, sparkle highlights
    50:  '#ccffdd',   // Near-white tint — used sparingly for max contrast labels
  },

  // ── Cyan — accent hue ──────────────────────────────────────────────────────
  // Used in the commit panel and any secondary workspace area to break
  // visual monotony while staying within the "terminal" family.
  cyan: {
    900: '#000d0d',
    800: '#001a1a',
    700: '#002233',
    600: '#003344',
    500: '#006677',
    400: '#009999',
    300: '#00cccc',   // ★ Cyan accent — commit panel borders, status SECURE
    200: '#00eeff',
    100: '#aaffff',   // Cyan rain head glyphs
    50:  '#dfffff',
  },

  // ── Amber — warning / modified state ───────────────────────────────────────
  // Only used for modified-file badges and non-critical warnings.
  amber: {
    700: '#2a1a00',
    500: '#664400',
    300: '#ffcc00',   // ★ Modified indicator
    100: '#ffee88',
    50:  '#fffacc',
  },

  // ── Red — danger / deleted / conflict ──────────────────────────────────────
  // Conflict markers, deleted diff lines, destructive action buttons.
  red: {
    900: '#0d0000',
    700: '#330000',
    500: '#660000',
    300: '#ff4444',   // ★ Danger — deleted lines, conflicts, agent count
    200: '#ff7777',
    100: '#ffaaaa',
  },

  // ── Neutral ────────────────────────────────────────────────────────────────
  black:     '#000000',
  trueBlack: '#000000',   // Used for canvas background behind rain
  white:     '#ffffff',   // Only for rain head glyphs at peak brightness
} as const


// ─────────────────────────────────────────────
// SEMANTIC TOKENS
// These are what components consume — never the raw palette directly.
// Maps to Figma Variables (Mode: Dark — the only mode MatrixUI ships in).
// ─────────────────────────────────────────────

export const colors = {

  // ── Backgrounds ────────────────────────────────────────────────────────────
  bg: {
    base:        palette.black,           // Window / root background
    surface:     palette.green[900],      // Panel surfaces (sidebar, panes)
    elevated:    palette.green[800],      // Hovered rows, dropdown menus
    overlay:     'rgba(0, 10, 0, 0.72)',  // Semi-transparent panel overlays
    modal:       'rgba(0, 8, 0, 0.94)',   // Modal backdrop + modal surface
    input:       'rgba(0, 18, 0, 0.60)',  // Text inputs, textareas
    inputCyan:   'rgba(0, 12, 16, 0.60)', // Inputs in cyan panels
    selection:   'rgba(0, 255, 65, 0.12)',// Text selection highlight
  },

  // ── Text ───────────────────────────────────────────────────────────────────
  text: {
    primary:     palette.green[100],      // Active items, labels, headings
    secondary:   palette.green[200],      // Body text, commit messages
    tertiary:    palette.green[300],      // Secondary labels, timestamps
    muted:       palette.green[400],      // Placeholder, disabled
    dim:         palette.green[500],      // Very muted — section headers
    ghost:       palette.green[600],      // Near-invisible metadata
    cyanPrimary: palette.cyan[300],       // Text in cyan accent panels
    cyanMuted:   palette.cyan[500],       // Muted text in cyan panels
    danger:      palette.red[300],        // Deleted lines, errors
    warning:     palette.amber[300],      // Modified file labels
    added:       palette.green[100],      // Added diff lines
    white:       palette.white,           // Maximum contrast, rain heads
  },

  // ── Borders ────────────────────────────────────────────────────────────────
  border: {
    subtle:      palette.green[700],      // Very light dividers
    default:     palette.green[600],      // Standard borders, separators
    strong:      palette.green[500],      // Focused inputs, active elements
    active:      palette.green[100],      // Active/selected left border stripe
    cyan:        palette.cyan[600],       // Borders in cyan panels
    cyanActive:  palette.cyan[300],       // Active borders in cyan panels
    danger:      palette.red[500],        // Error state borders
  },

  // ── Interactive ────────────────────────────────────────────────────────────
  interactive: {
    // Primary button / key action
    primaryBg:       'rgba(0, 255, 65, 0.10)',
    primaryBgHover:  'rgba(0, 255, 65, 0.22)',
    primaryBgActive: 'rgba(0, 255, 65, 0.30)',
    primaryBorder:   palette.green[100],
    primaryText:     palette.green[100],

    // Ghost / secondary button
    ghostBg:         'transparent',
    ghostBgHover:    'rgba(0, 255, 65, 0.06)',
    ghostBorder:     palette.green[500],
    ghostBorderHover:palette.green[300],
    ghostText:       palette.green[400],
    ghostTextHover:  palette.green[300],

    // Danger button
    dangerBg:        'rgba(255, 68, 68, 0.10)',
    dangerBgHover:   'rgba(255, 68, 68, 0.22)',
    dangerBorder:    palette.red[300],
    dangerText:      palette.red[300],

    // Cyan accent button (commit panel)
    cyanBg:          'rgba(0, 204, 204, 0.10)',
    cyanBgHover:     'rgba(0, 204, 204, 0.22)',
    cyanBorder:      palette.cyan[300],
    cyanText:        palette.cyan[300],
  },

  // ── Diff ───────────────────────────────────────────────────────────────────
  diff: {
    addedBg:         'rgba(0, 255, 65, 0.08)',
    addedBorder:     palette.green[100],
    addedText:       palette.green[100],
    removedBg:       'rgba(255, 40, 0, 0.08)',
    removedBorder:   palette.red[300],
    removedText:     palette.red[300],
    neutralText:     palette.green[500],
  },

  // ── Status ─────────────────────────────────────────────────────────────────
  status: {
    synced:    palette.green[100],   // ◉ SYNCED
    ahead:     palette.cyan[300],    // ↑ AHEAD
    modified:  palette.amber[300],   // ◈ MODIFIED
    behind:    palette.red[300],     // ↓ BEHIND
    conflict:  palette.red[300],     // !! CONFLICT
    untracked: palette.green[400],   // ? UNTRACKED
  },

  // ── Language badge colors ──────────────────────────────────────────────────
  // One dot per language in the repo header
  lang: {
    'C++':       palette.green[100],
    'Python':    palette.green[200],
    'Rust':      '#ff6600',
    'Lisp':      palette.cyan[300],
    'Java':      palette.red[300],
    'TypeScript':palette.cyan[200],
    'JavaScript':'#ffdd00',
    'Go':        palette.cyan[300],
    'Ruby':      '#cc1111',
    'Swift':     '#ff5533',
    'Kotlin':    '#aa44ff',
    'Dart':      '#0099ff',
    'Shell':     palette.green[300],
    'default':   palette.green[400],
  },

} as const


// ─────────────────────────────────────────────
// CSS CUSTOM PROPERTIES
// Call generateCSSVariables() to inject into :root
// ─────────────────────────────────────────────

export function generateCSSVariables(): string {
  return `
    /* MatrixUI Color Tokens */

    /* --- Raw palette --- */
    --mx-green-950: ${palette.green[950]};
    --mx-green-900: ${palette.green[900]};
    --mx-green-800: ${palette.green[800]};
    --mx-green-700: ${palette.green[700]};
    --mx-green-600: ${palette.green[600]};
    --mx-green-500: ${palette.green[500]};
    --mx-green-400: ${palette.green[400]};
    --mx-green-300: ${palette.green[300]};
    --mx-green-200: ${palette.green[200]};
    --mx-green-100: ${palette.green[100]};
    --mx-green-75:  ${palette.green[75]};
    --mx-green-50:  ${palette.green[50]};

    --mx-cyan-900: ${palette.cyan[900]};
    --mx-cyan-700: ${palette.cyan[700]};
    --mx-cyan-600: ${palette.cyan[600]};
    --mx-cyan-500: ${palette.cyan[500]};
    --mx-cyan-400: ${palette.cyan[400]};
    --mx-cyan-300: ${palette.cyan[300]};
    --mx-cyan-100: ${palette.cyan[100]};

    --mx-amber-300: ${palette.amber[300]};
    --mx-red-300:   ${palette.red[300]};

    /* --- Semantic --- */
    --mx-bg-base:          ${colors.bg.base};
    --mx-bg-surface:       ${colors.bg.surface};
    --mx-bg-elevated:      ${colors.bg.elevated};
    --mx-bg-overlay:       ${colors.bg.overlay};

    --mx-text-primary:     ${colors.text.primary};
    --mx-text-secondary:   ${colors.text.secondary};
    --mx-text-muted:       ${colors.text.muted};
    --mx-text-dim:         ${colors.text.dim};

    --mx-border-subtle:    ${colors.border.subtle};
    --mx-border-default:   ${colors.border.default};
    --mx-border-strong:    ${colors.border.strong};
    --mx-border-active:    ${colors.border.active};

    --mx-status-synced:    ${colors.status.synced};
    --mx-status-ahead:     ${colors.status.ahead};
    --mx-status-modified:  ${colors.status.modified};
    --mx-status-behind:    ${colors.status.behind};
  `
}
