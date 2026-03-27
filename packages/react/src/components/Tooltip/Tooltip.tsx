import React, { useState } from 'react'
import { colors, boxGlow } from '@matrixui/tokens'
import type { TooltipProps, TooltipPlacement } from './Tooltip.types'

function getTooltipPosition(placement: TooltipPlacement): React.CSSProperties {
  switch (placement) {
    case 'top':    return { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
    case 'bottom': return { top:    'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
    case 'left':   return { right:  'calc(100% + 8px)', top:  '50%', transform: 'translateY(-50%)' }
    case 'right':  return { left:   'calc(100% + 8px)', top:  '50%', transform: 'translateY(-50%)' }
  }
}

function getArrowStyle(placement: TooltipPlacement): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    width:    0,
    height:   0,
  }
  switch (placement) {
    case 'top':    return { ...base, bottom: '-4px', left: '50%', marginLeft: '-4px', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `4px solid ${colors.border.default}` }
    case 'bottom': return { ...base, top:    '-4px', left: '50%', marginLeft: '-4px', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: `4px solid ${colors.border.default}` }
    case 'left':   return { ...base, right:  '-4px', top:  '50%', marginTop:  '-4px', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `4px solid ${colors.border.default}` }
    case 'right':  return { ...base, left:   '-4px', top:  '50%', marginTop:  '-4px', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: `4px solid ${colors.border.default}` }
  }
}

export function Tooltip({ content, children, placement = 'top', className, style }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      data-matrixui-tooltip
      className={className}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          style={{
            position:    'absolute',
            zIndex:      200,
            ...getTooltipPosition(placement),
            background:  colors.bg.surface,
            border:      `1px solid ${colors.border.default}`,
            color:       colors.text.secondary,
            fontFamily:  'JetBrains Mono, monospace',
            fontSize:    '11px',
            lineHeight:  1.4,
            letterSpacing: '0.04em',
            padding:     '6px 8px',
            whiteSpace:  'nowrap',
            boxShadow:   boxGlow.greenFaint,
            borderRadius:0,
            pointerEvents: 'none',
          }}
        >
          <span style={getArrowStyle(placement)} />
          {content}
        </div>
      )}
    </div>
  )
}

Tooltip.displayName = 'Tooltip'
