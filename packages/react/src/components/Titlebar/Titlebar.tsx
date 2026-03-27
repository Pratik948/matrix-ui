import React, { useState } from 'react'
import { colors, textGlow, transitions } from '@matrixui/tokens'
import { MatrixRain } from '../MatrixRain'
import type { TitlebarProps } from './Titlebar.types'

interface WinControlProps {
  symbol:       string
  onClick?:     () => void
  hoverColor?:  string
}

function WinControl({ symbol, onClick, hoverColor = colors.text.muted }: WinControlProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        WebkitAppRegion: 'no-drag',
        width:           '11px',
        height:          '11px',
        display:         'inline-flex',
        alignItems:      'center',
        justifyContent:  'center',
        background:      'none',
        border:          `1px solid ${hovered ? hoverColor : colors.border.strong}`,
        borderRadius:    0,
        color:           hovered ? hoverColor : colors.border.strong,
        cursor:          'pointer',
        fontSize:        '8px',
        fontFamily:      'monospace',
        lineHeight:      1,
        padding:         0,
        outline:         'none',
        transition:      transitions.color,
        flexShrink:      0,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {symbol}
    </button>
  )
}

export function Titlebar({
  appName   = 'MATRIXUI',
  version,
  menuItems = [],
  onMinimize,
  onMaximize,
  onClose,
  className,
  style,
}: TitlebarProps) {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null)

  return (
    <div
      data-matrixui-titlebar
      data-tauri-drag-region
      className={className}
      style={{
        position:        'relative',
        overflow:        'hidden',
        height:          '42px',
        background:      colors.bg.overlay,
        borderBottom:    `1px solid ${colors.border.default}`,
        display:         'flex',
        alignItems:      'center',
        WebkitAppRegion: 'drag',
        flexShrink:      0,
        ...style,
      } as React.CSSProperties}
    >
      <MatrixRain preset="titlebar" />

      {/* Content layer */}
      <div
        style={{
          position:   'relative',
          zIndex:     1,
          display:    'flex',
          alignItems: 'center',
          width:      '100%',
          height:     '100%',
          padding:    '0 12px',
          gap:        '8px',
        }}
      >
        {/* App icon + name */}
        <span style={{
          fontSize:      '20px',
          color:         colors.text.primary,
          textShadow:    textGlow.greenMax,
          lineHeight:    1,
          userSelect:    'none',
          WebkitAppRegion: 'no-drag',
        } as React.CSSProperties}>
          ⬡
        </span>
        <span style={{
          fontFamily:    'Share Tech Mono, JetBrains Mono, monospace',
          fontSize:      '18px',
          fontWeight:    700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         colors.text.primary,
          textShadow:    textGlow.greenMax,
          userSelect:    'none',
          lineHeight:    1,
        }}>
          {appName}
        </span>
        {version && (
          <span style={{
            fontFamily:  'JetBrains Mono, monospace',
            fontSize:    '11px',
            color:       colors.text.ghost,
            lineHeight:  1,
            userSelect:  'none',
            letterSpacing: '0.04em',
          }}>
            {version}
          </span>
        )}

        {/* Separator */}
        <div style={{ width: '1px', height: '16px', background: colors.border.subtle, margin: '0 4px' }} />

        {/* Menu items */}
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={item.onClick}
            style={{
              WebkitAppRegion: 'no-drag',
              background:      'none',
              border:          'none',
              color:           hoveredMenu === i ? colors.text.primary : colors.text.muted,
              textShadow:      hoveredMenu === i ? textGlow.greenSoft : textGlow.none,
              fontFamily:      'JetBrains Mono, monospace',
              fontSize:        '11px',
              letterSpacing:   '0.04em',
              cursor:          'pointer',
              padding:         '0 6px',
              height:          '100%',
              outline:         'none',
              transition:      transitions.color,
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredMenu(i)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            {item.label}
          </button>
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Window controls */}
        <div
          style={{
            display:         'flex',
            alignItems:      'center',
            gap:             '6px',
            WebkitAppRegion: 'no-drag',
          } as React.CSSProperties}
        >
          <WinControl symbol="—" {...(onMinimize ? { onClick: onMinimize } : {})} hoverColor={colors.text.muted} />
          <WinControl symbol="□" {...(onMaximize ? { onClick: onMaximize } : {})} hoverColor={colors.text.muted} />
          <WinControl symbol="×" {...(onClose    ? { onClick: onClose }    : {})} hoverColor={colors.status.behind} />
        </div>
      </div>
    </div>
  )
}

Titlebar.displayName = 'Titlebar'
