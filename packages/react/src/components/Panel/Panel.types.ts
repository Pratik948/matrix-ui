import type React from 'react'
import type { rainPresets } from '@matrixui/tokens'
import type { MatrixRainProps } from '../MatrixRain/MatrixRain.types'

export interface PanelProps {
  rain?:      MatrixRainProps & { preset?: keyof typeof rainPresets }
  bgOpacity?: number          // default: 0.78
  children:   React.ReactNode
  style?:     React.CSSProperties
  className?: string
}
