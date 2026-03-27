/**
 * @matrixui/tokens — Spacing System
 *
 * MatrixUI uses a 4px base grid. All spacing values are multiples of 4px.
 * The system is intentionally dense — no consumer-SaaS-style large padding.
 *
 * Naming convention: t-shirt sizes (xs → 3xl) map to 4px increments.
 * Raw numeric keys (1–20) are also exported for utility use.
 *
 * Figma notes:
 *   - Set Figma's grid to 4px base
 *   - Spacing tokens = Figma Variables > Spacing group
 *   - Component padding uses only these values — never arbitrary px
 *   - Standard component anatomy uses:
 *       Component inset (internal padding):  spacing.xs → spacing.md
 *       Component gap (between elements):    spacing['2'] → spacing['3']
 *       Section separation:                  spacing.lg → spacing.xl
 */

// ─────────────────────────────────────────────
// RAW SCALE (4px grid)
// ─────────────────────────────────────────────

export const space = {
  '0':   '0px',
  px:    '1px',    // Hairline — borders, dividers
  '0.5': '2px',    // Micro inset — badge padding
  '1':   '4px',    // Tight internal padding
  '2':   '8px',    // Default gap between inline elements
  '3':   '12px',   // Standard component inset (horizontal padding in buttons/inputs)
  '4':   '16px',   // Standard section inset (panel horizontal padding)
  '5':   '20px',   // Comfortable panel inset
  '6':   '24px',   // Large component inset
  '8':   '32px',   // Section separation
  '10':  '40px',   // Large section separation
  '12':  '48px',   // Page-level spacing
  '16':  '64px',   // Hero / empty-state spacing
  '20':  '80px',   // Max content centering gutters
} as const

// ─────────────────────────────────────────────
// SEMANTIC SPACING ALIASES
// Named by intent — what components reference
// ─────────────────────────────────────────────

export const spacing = {
  // Micro — badges, chips, tight labels
  micro:    space['0.5'],   // 2px
  xs:       space['1'],     // 4px

  // Component internals
  sm:       space['2'],     // 8px   — gap between icon and label in button
  md:       space['3'],     // 12px  — button/input horizontal padding
  lg:       space['4'],     // 16px  — panel horizontal padding
  xl:       space['5'],     // 20px  — comfortable panel inset

  // Layout
  '2xl':    space['6'],     // 24px  — section-level padding
  '3xl':    space['8'],     // 32px  — large section separation

  // Heights (fixed component heights — these define the grid rhythm)
  heights: {
    titlebar:   '42px',   // Top window bar
    tabBar:     '38px',   // Tab row (Changes / History)
    repoHeader: '52px',   // Repository name + actions bar
    statusBar:  '24px',   // Bottom status bar
    rowSm:      '32px',   // Compact list rows (file list)
    rowMd:      '40px',   // Standard list rows (repo sidebar)
    rowLg:      '56px',   // Spacious rows (commit history)
    inputSm:    '28px',   // Small input / select
    inputMd:    '34px',   // Standard input
    buttonSm:   '26px',   // Small button
    buttonMd:   '32px',   // Standard button
    buttonLg:   '38px',   // Large / primary CTA button
  },

  // Widths
  widths: {
    sidebar:      '220px',  // Left repo list panel
    commitPanel:  '240px',  // Right commit panel
    fileList:     '230px',  // File changes list in center panel
    modalSm:      '360px',
    modalMd:      '480px',
    modalLg:      '640px',
  },

} as const


// ─────────────────────────────────────────────
// BORDER RADIUS
// MatrixUI uses very low or zero radius — terminals have square corners.
// Only inputs and toggles use slight rounding for affordance.
// ─────────────────────────────────────────────

export const radii = {
  none:   '0px',    // Default for almost everything — panels, buttons, rows
  xs:     '2px',    // Badges, chips, code blocks
  sm:     '3px',    // Input fields, textareas
  md:     '4px',    // (reserved)
  full:   '9999px', // Pill-shaped toggle / switch thumb
} as const


// ─────────────────────────────────────────────
// CSS CUSTOM PROPERTIES
// ─────────────────────────────────────────────

export function generateSpacingCSSVariables(): string {
  return `
    /* MatrixUI Spacing Tokens */
    --mx-space-micro: ${spacing.micro};
    --mx-space-xs:    ${spacing.xs};
    --mx-space-sm:    ${spacing.sm};
    --mx-space-md:    ${spacing.md};
    --mx-space-lg:    ${spacing.lg};
    --mx-space-xl:    ${spacing.xl};
    --mx-space-2xl:   ${spacing['2xl']};
    --mx-space-3xl:   ${spacing['3xl']};

    --mx-height-titlebar:   ${spacing.heights.titlebar};
    --mx-height-tabbar:     ${spacing.heights.tabBar};
    --mx-height-statusbar:  ${spacing.heights.statusBar};
    --mx-height-row-sm:     ${spacing.heights.rowSm};
    --mx-height-row-md:     ${spacing.heights.rowMd};
    --mx-height-row-lg:     ${spacing.heights.rowLg};

    --mx-width-sidebar:     ${spacing.widths.sidebar};
    --mx-width-commit:      ${spacing.widths.commitPanel};

    --mx-radius-none: ${radii.none};
    --mx-radius-xs:   ${radii.xs};
    --mx-radius-sm:   ${radii.sm};
    --mx-radius-full: ${radii.full};
  `
}
