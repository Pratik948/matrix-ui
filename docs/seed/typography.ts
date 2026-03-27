/**
 * @matrixui/tokens — Typography System
 *
 * MatrixUI is unapologetically monospace. There are no serif or sans-serif
 * fonts in this system. Every character is fixed-width, every number aligns
 * in a column, every hash is scannable at a glance.
 *
 * Three font roles:
 *   display  — App name, window title, section headers. Slightly wider tracking.
 *   body     — All UI labels, menu items, descriptions.
 *   mono     — Code, diffs, hashes, file paths, numerical data. Ligature-enabled.
 *
 * Figma notes:
 *   - Create three Text Styles groups: Display/, Body/, Mono/
 *   - Each size × weight combination = one Figma Text Style
 *   - e.g. "Body/SM Regular", "Mono/BASE Medium", "Display/LG Bold"
 *   - Letter spacing is defined in % in Figma — convert: px / fontSize * 100
 */

// ─────────────────────────────────────────────
// FONT FAMILIES
// Defined as stacks — first available font wins.
// ─────────────────────────────────────────────

export const fontFamilies = {
  /**
   * Display — app name, window title, large headings
   * Share Tech Mono has a slightly wider character and great zero-slashing
   */
  display: "'Share Tech Mono', 'Courier New', 'Lucida Console', monospace",

  /**
   * Body — all general UI text: labels, descriptions, menu items
   * Courier New is universally available. JetBrains Mono is preferred if installed.
   */
  body: "'JetBrains Mono', 'Courier New', 'Lucida Console', monospace",

  /**
   * Mono — code, diffs, file paths, commit hashes, numbers
   * JetBrains Mono with ligatures is ideal here: --> becomes →, !== becomes ≠
   */
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace",
} as const


// ─────────────────────────────────────────────
// SIZE SCALE
// Base unit: 12px (body/base). Scale is NOT strictly modular —
// it's tuned for terminal density at small sizes.
// ─────────────────────────────────────────────

export const fontSizes = {
  '2xs':  '8px',   // Status bar, timestamps in tight spaces
  xs:     '9px',   // Meta labels (CRT MODE toggle text)
  sm:     '11px',  // Secondary labels, menu items, section headers
  base:   '12px',  // Default body text
  md:     '13px',  // Diff content, commit messages, file names
  lg:     '14px',  // Repo name in header, active panel titles
  xl:     '16px',  // (reserved — rarely used in terminal UI)
  '2xl':  '18px',  // Window title / app name in titlebar
  '3xl':  '24px',  // Onboarding / empty state headlines
} as const

export type FontSize = keyof typeof fontSizes


// ─────────────────────────────────────────────
// FONT WEIGHTS
// Monospace fonts have limited weight options — we use three.
// ─────────────────────────────────────────────

export const fontWeights = {
  regular: 400,
  medium:  500,   // Used for file names, branch names
  bold:    700,   // Used for repo names, active repo in sidebar
} as const


// ─────────────────────────────────────────────
// LINE HEIGHT
// Dense by default. Generous only in diff views and long descriptions.
// ─────────────────────────────────────────────

export const lineHeights = {
  none:    1,      // Single-line labels that must not wrap
  tight:   1.2,    // Status bar, badges, chips
  snug:    1.4,    // Default for most UI labels
  normal:  1.5,    // Body text, commit descriptions, input fields
  relaxed: 1.75,   // Diff lines — room to see add/remove colors
  loose:   2,      // (reserved)
} as const


// ─────────────────────────────────────────────
// LETTER SPACING
// Monospace fonts are already well-spaced; we only widen for
// ALL-CAPS section labels and the app title.
// ─────────────────────────────────────────────

export const letterSpacing = {
  tighter: '-0.02em',  // (unused — monospace looks bad tighter)
  tight:   '0em',      // Default for code, diffs, body text
  normal:  '0.04em',   // Default UI labels
  wide:    '0.08em',   // Buttons, interactive labels
  wider:   '0.14em',   // Section headers (REPOSITORIES, COMMIT)
  widest:  '0.25em',   // App title (MATRIX//DESK, CIPHER)
} as const


// ─────────────────────────────────────────────
// SEMANTIC TEXT STYLES
// These are what Figma Text Styles map to.
// Format: role / size / weight
// ─────────────────────────────────────────────

export const textStyles = {

  // ── Display ──────────────────────────────────────────────────────────────
  'display/appName': {
    fontFamily:    fontFamilies.display,
    fontSize:      fontSizes['2xl'],
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
    // Figma note: Apply "Green/Glow/Primary" effect style
  },
  'display/sectionHeader': {
    fontFamily:    fontFamilies.display,
    fontSize:      fontSizes.xs,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
    // color: text.dim
  },
  'display/panelTitle': {
    fontFamily:    fontFamilies.display,
    fontSize:      fontSizes.lg,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },

  // ── Body ──────────────────────────────────────────────────────────────────
  'body/sm': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.sm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacing.normal,
  },
  'body/base': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.base,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  'body/md': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.md,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.normal,
    letterSpacing: letterSpacing.tight,
  },
  'body/smMedium': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.sm,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacing.normal,
  },
  'body/baseBold': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.base,
    fontWeight:    fontWeights.bold,
    lineHeight:    lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },

  // ── Button / interactive labels ───────────────────────────────────────────
  'ui/buttonLabel': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.sm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },
  'ui/tabLabel': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.sm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },
  'ui/menuItem': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes.sm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.normal,
  },
  'ui/statusBar': {
    fontFamily:    fontFamilies.body,
    fontSize:      fontSizes['2xs'],
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.tight,
  },

  // ── Mono / Code ───────────────────────────────────────────────────────────
  'mono/diff': {
    fontFamily:    fontFamilies.mono,
    fontSize:      fontSizes.md,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.relaxed,
    letterSpacing: letterSpacing.tight,
    // Figma note: Enable ligatures in OpenType features
  },
  'mono/hash': {
    fontFamily:    fontFamilies.mono,
    fontSize:      fontSizes.sm,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.tight,
    // color: text.dim — hashes are intentionally low contrast
  },
  'mono/path': {
    fontFamily:    fontFamilies.mono,
    fontSize:      fontSizes.base,
    fontWeight:    fontWeights.regular,
    lineHeight:    lineHeights.snug,
    letterSpacing: letterSpacing.tight,
  },
  'mono/badge': {
    fontFamily:    fontFamilies.mono,
    fontSize:      fontSizes.xs,
    fontWeight:    fontWeights.medium,
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.tight,
  },

} as const

export type TextStyle = keyof typeof textStyles


// ─────────────────────────────────────────────
// CSS CUSTOM PROPERTIES
// ─────────────────────────────────────────────

export function generateTypographyCSSVariables(): string {
  return `
    /* MatrixUI Typography Tokens */
    --mx-font-display: ${fontFamilies.display};
    --mx-font-body:    ${fontFamilies.body};
    --mx-font-mono:    ${fontFamilies.mono};

    --mx-text-2xs:  ${fontSizes['2xs']};
    --mx-text-xs:   ${fontSizes.xs};
    --mx-text-sm:   ${fontSizes.sm};
    --mx-text-base: ${fontSizes.base};
    --mx-text-md:   ${fontSizes.md};
    --mx-text-lg:   ${fontSizes.lg};
    --mx-text-xl:   ${fontSizes.xl};
    --mx-text-2xl:  ${fontSizes['2xl']};
    --mx-text-3xl:  ${fontSizes['3xl']};

    --mx-leading-tight:   ${lineHeights.tight};
    --mx-leading-normal:  ${lineHeights.normal};
    --mx-leading-relaxed: ${lineHeights.relaxed};

    --mx-tracking-tight:   ${letterSpacing.tight};
    --mx-tracking-normal:  ${letterSpacing.normal};
    --mx-tracking-wide:    ${letterSpacing.wide};
    --mx-tracking-wider:   ${letterSpacing.wider};
    --mx-tracking-widest:  ${letterSpacing.widest};
  `
}
