/**
 * @matrixui/tokens — Shadows & Glows
 *
 * MatrixUI does not use traditional box-shadows for depth or elevation.
 * Instead, glow effects replace shadows — luminous halos that make elements
 * appear to emit light from within, like phosphor on a CRT screen.
 *
 * Two types of glow:
 *   text-shadow   — Applied to text nodes. Creates the "lit from within" glyph effect.
 *   box-shadow    — Applied to containers/buttons. Creates border glow halos.
 *
 * Layering rule: Glow intensity increases with interactivity state:
 *   idle → hover → focused/active
 *
 * Figma notes:
 *   - Each glow = a Figma Effect Style
 *   - Name format: "Glow / [Color] / [Intensity]"
 *   - e.g. "Glow / Green / Subtle", "Glow / Green / Primary", "Glow / Cyan / Active"
 *   - text-shadow glows = Figma "Drop Shadow" effect with 0 X, 0 Y offset
 *   - box-shadow glows = Figma "Inner Shadow" (0 spread) + "Drop Shadow" (outer)
 */

// ─────────────────────────────────────────────
// TEXT SHADOW GLOWS
// Applied to text elements. Format: "x y blur color"
// ─────────────────────────────────────────────

export const textGlow = {
  // ── Green glows ───────────────────────────────────────────────────────────
  /** No glow — default state */
  none: 'none',

  /** Subtle — secondary text, muted labels */
  greenSubtle: '0 0 4px rgba(0, 255, 65, 0.20)',

  /** Soft — body text, active but not focused */
  greenSoft: '0 0 6px rgba(0, 255, 65, 0.40)',

  /** Primary — active labels, focused states, the app name */
  greenPrimary: '0 0 8px rgba(0, 255, 65, 0.60)',

  /** Strong — hover state on interactive text */
  greenStrong: '0 0 12px rgba(0, 255, 65, 0.80)',

  /** Max — app title, critical active state */
  greenMax: '0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.50)',

  // ── Cyan glows ────────────────────────────────────────────────────────────
  cyanSoft:    '0 0 6px rgba(0, 204, 204, 0.40)',
  cyanPrimary: '0 0 8px rgba(0, 204, 204, 0.60)',
  cyanStrong:  '0 0 12px rgba(0, 204, 204, 0.80)',

  // ── Status glows ──────────────────────────────────────────────────────────
  statusSynced:   '0 0 6px rgba(0, 255, 65, 0.50)',
  statusAhead:    '0 0 6px rgba(0, 204, 204, 0.50)',
  statusModified: '0 0 6px rgba(255, 204, 0, 0.50)',
  statusBehind:   '0 0 6px rgba(255, 68, 68, 0.50)',

  // ── Diff glows ────────────────────────────────────────────────────────────
  diffAdded:   '0 0 4px rgba(0, 255, 65, 0.30)',
  diffRemoved: '0 0 4px rgba(255, 68, 68, 0.30)',

} as const

export type TextGlow = keyof typeof textGlow


// ─────────────────────────────────────────────
// BOX SHADOW GLOWS
// Applied to containers and interactive elements.
// ─────────────────────────────────────────────

export const boxGlow = {
  // ── None ──────────────────────────────────────────────────────────────────
  none: 'none',

  // ── Green box glows ───────────────────────────────────────────────────────
  /** Faint — panel borders, resting state */
  greenFaint:   '0 0 0 1px rgba(0, 255, 65, 0.08)',

  /** Subtle — focused input fields (inset) */
  greenSubtle:  '0 0 8px rgba(0, 255, 65, 0.20)',

  /** Default — primary button resting state */
  greenDefault: '0 0 14px rgba(0, 255, 65, 0.25)',

  /** Hover — primary button hovered */
  greenHover:   '0 0 20px rgba(0, 255, 65, 0.40)',

  /** Active/Focus — input focused, button active */
  greenActive:  '0 0 24px rgba(0, 255, 65, 0.55)',

  /** Strong — selected repo left border glow */
  greenStrong:  '0 0 12px rgba(0, 255, 65, 0.70)',

  /** Inner focus ring — input focus state (inset) */
  greenFocusRing: '0 0 0 1px #00ff41, 0 0 8px rgba(0, 255, 65, 0.30)',

  // ── Cyan box glows ────────────────────────────────────────────────────────
  cyanDefault:   '0 0 14px rgba(0, 204, 204, 0.22)',
  cyanHover:     '0 0 22px rgba(0, 204, 204, 0.40)',
  cyanActive:    '0 0 24px rgba(0, 204, 204, 0.55)',
  cyanFocusRing: '0 0 0 1px #00cccc, 0 0 8px rgba(0, 204, 204, 0.30)',

  // ── Danger ────────────────────────────────────────────────────────────────
  dangerDefault:   '0 0 10px rgba(255, 68, 68, 0.20)',
  dangerHover:     '0 0 18px rgba(255, 68, 68, 0.40)',
  dangerFocusRing: '0 0 0 1px #ff4444, 0 0 8px rgba(255, 68, 68, 0.30)',

  // ── Window / structural shadows ───────────────────────────────────────────
  /** Separator line at bottom of panels (replaces border-bottom) */
  panelSeam:  '0 1px 0 rgba(0, 255, 65, 0.08)',

  /** Window drop shadow (for frameless Electron window) */
  window:     '0 25px 60px rgba(0, 0, 0, 0.90), 0 0 80px rgba(0, 255, 65, 0.04)',

} as const

export type BoxGlow = keyof typeof boxGlow


// ─────────────────────────────────────────────
// CRT EFFECTS
// CSS filters and overlays that create screen-like effects.
// These are applied as overlay divs or CSS backdrop-filter.
// ─────────────────────────────────────────────

export const crtEffects = {
  /**
   * Scanlines — horizontal dark bands mimicking CRT scan lines.
   * Applied as a fixed-position overlay div with pointer-events: none.
   */
  scanlines: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.09) 2px,
    rgba(0, 0, 0, 0.09) 4px
  )`,

  /**
   * Vignette — darkening towards edges, like a CRT screen bezel.
   * Applied as a radial-gradient overlay div.
   */
  vignette: `radial-gradient(
    ellipse at 50% 50%,
    transparent 55%,
    rgba(0, 0, 0, 0.75) 100%
  )`,

  /**
   * Phosphor bloom — subtle green glow across the entire screen.
   * Applied as a semi-transparent radial overlay.
   */
  phosphorBloom: `radial-gradient(
    ellipse at 50% 40%,
    rgba(0, 255, 65, 0.015) 0%,
    transparent 70%
  )`,

} as const


// ─────────────────────────────────────────────
// CSS CUSTOM PROPERTIES
// ─────────────────────────────────────────────

export function generateShadowCSSVariables(): string {
  return `
    /* MatrixUI Shadow & Glow Tokens */
    --mx-glow-text-green-subtle:  ${textGlow.greenSubtle};
    --mx-glow-text-green-soft:    ${textGlow.greenSoft};
    --mx-glow-text-green-primary: ${textGlow.greenPrimary};
    --mx-glow-text-green-max:     ${textGlow.greenMax};
    --mx-glow-text-cyan-primary:  ${textGlow.cyanPrimary};

    --mx-glow-box-green-default:  ${boxGlow.greenDefault};
    --mx-glow-box-green-hover:    ${boxGlow.greenHover};
    --mx-glow-box-green-active:   ${boxGlow.greenActive};
    --mx-glow-box-green-focus:    ${boxGlow.greenFocusRing};
    --mx-glow-box-cyan-default:   ${boxGlow.cyanDefault};
    --mx-glow-box-cyan-focus:     ${boxGlow.cyanFocusRing};
    --mx-glow-window:             ${boxGlow.window};
  `
}
