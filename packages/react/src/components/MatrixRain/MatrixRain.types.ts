import type React from 'react'
import type { rainPresets } from '@matrixui/tokens'

export interface MatrixRainProps {
  preset?:      keyof typeof rainPresets  // default: 'diff'
  opacity?:     number
  speed?:       number
  fontSize?:    number
  headColor?:   string
  brightColor?: string
  dimColor?:    string
  fadeAlpha?:   number
  className?:   string
  style?:       React.CSSProperties
}
