/**
 * @matrixui/tokens — Motion System
 *
 * MatrixUI animations are inspired by three sources:
 *   1. CRT phosphor decay — glows fade out slowly, like a screen losing power
 *   2. Dial-up terminal lag — transitions are snappy but never instant
 *   3. Matrix glitch — occasional hue-shifts and flickers, never decorative
 *
 * Rules:
 *   - No bounce, spring, or elastic easing — too playful for a terminal
 *   - Prefer CSS transitions for hover/focus states (GPU-composited)
 *   - Use requestAnimationFrame loops only for the canvas rain
 *   - Glitch effects are random-interval, never on interaction
 *
 * Figma notes:
 *   - Duration tokens → Figma Variables > Motion > Duration
 *   - Easing tokens → reference in Figma prototype transition settings
 *   - Glitch animation cannot be expressed in Figma — document in spec only
 */

// ─────────────────────────────────────────────
// DURATION
// ─────────────────────────────────────────────

export const duration = {
  instant:   '0ms',    // Immediate — cursor blink, toggle snap
  fastest:   '50ms',   // Glitch on/off pulse
  fast:      '100ms',  // Hover color transitions
  normal:    '150ms',  // Standard state transitions (border color, bg)
  moderate:  '200ms',  // Panel slide-ins, dropdown open
  slow:      '300ms',  // Modal enter/exit
  slower:    '400ms',  // Full-panel transitions (tab switch)
  crawl:     '600ms',  // CRT power-on sweep animation
} as const

export type Duration = keyof typeof duration


// ─────────────────────────────────────────────
// EASING
// All cubic-bezier — no linear (too mechanical), no ease (too consumer)
// ─────────────────────────────────────────────

export const easing = {
  /**
   * snap — for state changes that should feel instantaneous but not jarring
   * Used on: color transitions, border focus ring
   */
  snap:       'cubic-bezier(0.16, 1, 0.3, 1)',

  /**
   * terminal — fast in, slow out; mimics characters appearing on a CRT
   * Used on: dropdown open, panel reveal, toast enter
   */
  terminal:   'cubic-bezier(0.22, 1, 0.36, 1)',

  /**
   * phosphor — slow in, slow out; like phosphor glow fading
   * Used on: glow effects, opacity transitions
   */
  phosphor:   'cubic-bezier(0.4, 0, 0.6, 1)',

  /**
   * exit — fast out; things disappear quickly in a terminal
   * Used on: toast exit, modal dismiss, dropdown close
   */
  exit:       'cubic-bezier(0.7, 0, 1, 1)',

} as const

export type Easing = keyof typeof easing


// ─────────────────────────────────────────────
// TRANSITIONS
// Pre-composed shorthand values for common use cases
// ─────────────────────────────────────────────

export const transitions = {
  // Color / text-color on hover
  color:        `color ${duration.fast} ${easing.snap}`,

  // Border color on focus/hover
  border:       `border-color ${duration.normal} ${easing.snap}`,

  // Background color on hover/active
  background:   `background ${duration.normal} ${easing.snap}`,

  // Box shadow / glow on focus
  glow:         `box-shadow ${duration.moderate} ${easing.phosphor}`,

  // Text shadow changes
  textGlow:     `text-shadow ${duration.moderate} ${easing.phosphor}`,

  // Full interactive state (color + border + bg)
  interactive:  `color ${duration.fast} ${easing.snap},
                 border-color ${duration.normal} ${easing.snap},
                 background ${duration.normal} ${easing.snap},
                 box-shadow ${duration.moderate} ${easing.phosphor}`,

  // Panel/section slide
  panel:        `transform ${duration.moderate} ${easing.terminal},
                 opacity ${duration.moderate} ${easing.terminal}`,

  // Modal
  modal:        `transform ${duration.slow} ${easing.terminal},
                 opacity ${duration.slow} ${easing.terminal}`,

  // Toggle/switch thumb
  toggle:       `left ${duration.normal} ${easing.snap},
                 background ${duration.normal} ${easing.snap},
                 box-shadow ${duration.normal} ${easing.snap}`,
} as const


// ─────────────────────────────────────────────
// MATRIX RAIN ANIMATION PRESETS
// Each panel in the UI has a named preset that defines its rain character.
// These feed directly into the MatrixRain component.
// ─────────────────────────────────────────────

export type RainPreset = {
  /** ms between animation frames — lower = faster rain */
  speed:       number
  /** px font size of glyphs */
  fontSize:    number
  /** 0–1 canvas opacity over the panel */
  opacity:     number
  /** Color of the leading (brightest) glyph at the head of each stream */
  headColor:   string
  /** Color of mid-trail glyphs */
  brightColor: string
  /** Color of trailing / dim glyphs */
  dimColor:    string
  /** Alpha of the black fade-overlay drawn each frame (controls trail length) */
  fadeAlpha:   number
  /** Human description for docs */
  description: string
}

export const rainPresets: Record<string, RainPreset> = {
  /**
   * titlebar — Fast, bright, small font. Frantic header energy.
   * The titlebar gets the fastest rain to signal the "live system" feel.
   */
  titlebar: {
    speed: 22, fontSize: 11, opacity: 0.22,
    headColor: '#ccffdd', brightColor: '#00ff41', dimColor: '#002200',
    fadeAlpha: 0.12,
    description: 'Fast, bright, small. Top bar energy.',
  },

  /**
   * sidebar — Slow, dense, deep forest green. Dark and brooding.
   * Slower rain = more accumulated glyphs = denser, heavier feel.
   */
  sidebar: {
    speed: 65, fontSize: 12, opacity: 0.38,
    headColor: '#66ff88', brightColor: '#006622', dimColor: '#001500',
    fadeAlpha: 0.04,
    description: 'Slow, dense, dark forest green. Repository list.',
  },

  /**
   * header — Medium speed, white heads, classic neon.
   * The repo header bar needs presence without overwhelming the content.
   */
  header: {
    speed: 35, fontSize: 14, opacity: 0.20,
    headColor: '#ffffff', brightColor: '#00ff41', dimColor: '#004400',
    fadeAlpha: 0.08,
    description: 'Medium, white heads. Repository header bar.',
  },

  /**
   * tabs — Tiny font, rapid. Barely-there shimmer.
   */
  tabs: {
    speed: 28, fontSize: 10, opacity: 0.18,
    headColor: '#88ffaa', brightColor: '#00cc33', dimColor: '#002200',
    fadeAlpha: 0.10,
    description: 'Tiny, rapid. Tab navigation strip.',
  },

  /**
   * fileList — Yellow-green tint. Slightly alien hue to distinguish this pane.
   */
  fileList: {
    speed: 48, fontSize: 11, opacity: 0.28,
    headColor: '#eeff88', brightColor: '#99cc00', dimColor: '#1a2200',
    fadeAlpha: 0.055,
    description: 'Yellow-green tint. Changed files list.',
  },

  /**
   * diff — Brightest and most visible. The "active work" zone.
   * Long trails (low fadeAlpha) = more accumulated glyphs visible.
   */
  diff: {
    speed: 42, fontSize: 13, opacity: 0.30,
    headColor: '#ffffff', brightColor: '#00ff41', dimColor: '#003300',
    fadeAlpha: 0.033,
    description: 'Bright, long trails. Diff / code view.',
  },

  /**
   * history — Steady medium-green. Calm archive feel.
   */
  history: {
    speed: 52, fontSize: 13, opacity: 0.32,
    headColor: '#ccffee', brightColor: '#00bb33', dimColor: '#002200',
    fadeAlpha: 0.04,
    description: 'Steady, calm. Commit history list.',
  },

  /**
   * commitPanel — Cyan tint, faster. Totally different color DNA.
   * The commit panel is the one place where you're actively creating, not reading.
   * Cyan signals "input mode".
   */
  commitPanel: {
    speed: 30, fontSize: 12, opacity: 0.35,
    headColor: '#aaffff', brightColor: '#00cccc', dimColor: '#002233',
    fadeAlpha: 0.05,
    description: 'Cyan tint, faster. Active commit area.',
  },

  /**
   * statusBar — Tiny 8px, blazing fast. Pure noise at the edge of perception.
   */
  statusBar: {
    speed: 18, fontSize: 8, opacity: 0.28,
    headColor: '#88ffcc', brightColor: '#00ff41', dimColor: '#002200',
    fadeAlpha: 0.15,
    description: 'Tiny, blazing. Bottom status bar.',
  },

  /**
   * modal — Pulsing, slightly larger. Draws attention to the overlay.
   */
  modal: {
    speed: 35, fontSize: 14, opacity: 0.40,
    headColor: '#ffffff', brightColor: '#00ff41', dimColor: '#003300',
    fadeAlpha: 0.06,
    description: 'Larger, prominent. Modal overlay backgrounds.',
  },
} as const


// ─────────────────────────────────────────────
// GLITCH ANIMATION SPEC
// The random hue-rotate glitch applied to the entire app window.
// This cannot be a CSS transition — it fires via JS interval.
// ─────────────────────────────────────────────

export const glitch = {
  /**
   * How often to CHECK if a glitch should fire (ms).
   * The actual probability of firing is `probability` per check interval.
   */
  checkInterval:  1800,

  /** 0–1 probability of glitch firing on each check */
  probability:    0.08,

  /** Minimum glitch duration (ms) */
  durationMin:    80,

  /** Maximum glitch duration (ms) */
  durationMax:    180,

  /** CSS filter applied during glitch */
  filter: 'hue-rotate(100deg) brightness(1.4) saturate(2)',

  /** CSS filter when not glitching */
  filterNormal: 'none',

  /** CSS transition for entering/exiting glitch state */
  transition: `filter ${duration.fastest} linear`,
} as const


// ─────────────────────────────────────────────
// CSS CUSTOM PROPERTIES
// ─────────────────────────────────────────────

export function generateMotionCSSVariables(): string {
  return `
    /* MatrixUI Motion Tokens */
    --mx-duration-instant:  ${duration.instant};
    --mx-duration-fast:     ${duration.fast};
    --mx-duration-normal:   ${duration.normal};
    --mx-duration-moderate: ${duration.moderate};
    --mx-duration-slow:     ${duration.slow};

    --mx-ease-snap:     ${easing.snap};
    --mx-ease-terminal: ${easing.terminal};
    --mx-ease-phosphor: ${easing.phosphor};
    --mx-ease-exit:     ${easing.exit};
  `
}
