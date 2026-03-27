/**
 * @matrixui/tokens
 * Single entry point for all design tokens.
 *
 * Usage:
 *   import { colors, spacing, rainPresets } from '@matrixui/tokens'
 */

export * from './colors'
export * from './typography'
export * from './spacing'
export * from './motion'
export * from './shadows'
export * from './borders'
export * from './zIndex'

// ─────────────────────────────────────────────
// CSS VARIABLE INJECTION UTILITY
// Call this once in your app root to inject all tokens as CSS variables.
// ─────────────────────────────────────────────

import { generateCSSVariables }            from './colors'
import { generateTypographyCSSVariables }  from './typography'
import { generateSpacingCSSVariables }     from './spacing'
import { generateMotionCSSVariables }      from './motion'
import { generateShadowCSSVariables }      from './shadows'

/**
 * Injects all MatrixUI CSS custom properties into a <style> tag in <head>.
 * Call once at app startup, before rendering.
 *
 * @example
 * // In your app's entry point (main.tsx / index.tsx):
 * import { injectMatrixUITokens } from '@matrixui/tokens'
 * injectMatrixUITokens()
 */
export function injectMatrixUITokens(): void {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.id = 'matrixui-tokens'
  style.textContent = `
    :root {
      ${generateCSSVariables()}
      ${generateTypographyCSSVariables()}
      ${generateSpacingCSSVariables()}
      ${generateMotionCSSVariables()}
      ${generateShadowCSSVariables()}

      /* Global resets for MatrixUI apps */
      color-scheme: dark;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar       { width: 3px; background: var(--mx-bg-base); }
    ::-webkit-scrollbar-thumb { background: var(--mx-border-default); border-radius: 0; }
    ::-webkit-scrollbar-thumb:hover { background: var(--mx-text-primary); }

    /* Select option styling */
    select option { background: var(--mx-bg-surface); color: var(--mx-text-primary); }

    /* Text selection */
    ::selection { background: var(--mx-bg-selection); color: var(--mx-text-primary); }
  `

  // Remove any existing injection before re-injecting
  document.getElementById('matrixui-tokens')?.remove()
  document.head.appendChild(style)
}
