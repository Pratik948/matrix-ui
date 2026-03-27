/**
 * @matrixui/tokens — Borders
 *
 * MatrixUI borders are always 1px — no thick borders exist in a real terminal.
 * Border style is always 'solid'.
 * Variation comes entirely from color (see colors.ts border semantic tokens).
 *
 * Figma notes:
 *   - Border widths = Figma Variables > Border > Width
 *   - All stroke styles in Figma: "Inside" alignment, 1px, solid
 *   - The active repo indicator is a LEFT border — 2px, green.100
 *   - Diff line borders (add/remove) are LEFT border only — 3px
 */

export const borderWidths = {
  none:         '0px',
  hairline:     '1px',   // All standard borders — panels, inputs, buttons, dividers
  indicator:    '2px',   // Active item left-border stripe (sidebar selection)
  diffMarker:   '3px',   // Diff line add/remove left border
} as const

export const borderStyles = {
  solid:  'solid',
  dashed: 'dashed',   // Used only for "drop zone" states (drag-to-repo)
  dotted: 'dotted',   // Never used in MatrixUI
} as const

/** Pre-composed border shorthand values */
export const borders = {
  none:       'none',
  subtle:     `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-subtle)`,
  default:    `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-default)`,
  strong:     `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-strong)`,
  active:     `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-active)`,
  cyan:       `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-cyan)`,
  cyanActive: `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-cyanActive)`,
  danger:     `${borderWidths.hairline} ${borderStyles.solid} var(--mx-border-danger)`,
} as const
