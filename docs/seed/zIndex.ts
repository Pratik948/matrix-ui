/**
 * @matrixui/tokens — Z-Index Scale
 *
 * Named layers ensure no z-index wars between components.
 * The rain canvas always sits below content (zIndex.rain).
 * Overlay content always sits above panels.
 *
 * Figma notes:
 *   - Z-index cannot be expressed as Figma Variables — document in layer naming
 *   - Figma layer order (bottom to top): Rain → Panel → Content → Overlay → Modal → Cursor
 */

export const zIndex = {
  rain:         0,    // Canvas rain — always the absolute bottom
  panelBg:      1,    // Panel background color layer
  content:      2,    // All regular content within a panel
  sticky:       10,   // Sticky panel headers
  titlebar:     50,   // Top window bar (above all panel content)
  statusbar:    50,   // Bottom status bar (same level as titlebar)
  dropdown:     100,  // Dropdown menus, select menus
  tooltip:      200,  // Tooltips (above dropdowns)
  toast:        300,  // Toast notifications (always visible)
  modalBackdrop:400,  // Modal scrim
  modal:        500,  // Modal content
  contextMenu:  600,  // Right-click context menus (topmost interactive)
  cursor:       9999, // Custom cursor (if implemented)
} as const

export type ZIndexLayer = keyof typeof zIndex
