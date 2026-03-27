import React from 'react'
import { colors, textGlow } from '@matrixui/tokens'
import { Panel } from '../Panel'
import type { SidebarProps } from './Sidebar.types'

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ header, footer, children, className, style }, ref) => {
    return (
      <Panel
        rain={{ preset: 'sidebar' }}
        bgOpacity={0.76}
        {...(className !== undefined ? { className } : {})}
        style={{
          width:        '220px',
          height:       '100%',
          borderRight:  `1px solid ${colors.border.subtle}`,
          flexShrink:   0,
          ...style,
        }}
      >
        {/* Outer wrapper with ref */}
        <div
          ref={ref}
          data-matrixui-sidebar
          style={{
            display:       'flex',
            flexDirection: 'column',
            height:        '100%',
          }}
        >
          {/* Header */}
          {header && (
            <div
              style={{
                padding:      '10px 14px',
                borderBottom: `1px solid ${colors.border.subtle}`,
                flexShrink:   0,
                fontFamily:   'Share Tech Mono, JetBrains Mono, monospace',
                fontSize:     '9px',
                fontWeight:   400,
                letterSpacing:'0.14em',
                textTransform:'uppercase',
                color:        colors.text.dim,
                textShadow:   textGlow.none,
                lineHeight:   1,
              }}
            >
              {header}
            </div>
          )}

          {/* Scrollable list area */}
          <div
            style={{
              flex:      1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              style={{
                padding:   '8px 14px',
                borderTop: `1px solid ${colors.border.subtle}`,
                flexShrink:0,
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </Panel>
    )
  },
)

Sidebar.displayName = 'Sidebar'
