import React from 'react'
import { colors } from '@matrixui/tokens'
import { MatrixRain } from '../MatrixRain'
import type { PanelProps } from './Panel.types'

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ rain, bgOpacity = 0.78, children, style, className }, ref) => {
    const overlayStyle: React.CSSProperties = {
      position:        'relative',
      zIndex:          1,
      height:          '100%',
      display:         'flex',
      flexDirection:   'column',
      backgroundColor: `rgba(0, 10, 0, ${bgOpacity})`,
    }

    return (
      <div
        ref={ref}
        data-matrixui-panel
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: colors.bg.surface,
          ...style,
        }}
      >
        <MatrixRain preset="diff" {...rain} style={{ zIndex: 0, ...rain?.style }} />
        <div style={overlayStyle}>
          {children}
        </div>
      </div>
    )
  },
)

Panel.displayName = 'Panel'
