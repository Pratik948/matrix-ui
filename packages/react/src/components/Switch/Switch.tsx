import React, { useState } from 'react'
import { colors, boxGlow, transitions } from '@matrixui/tokens'
import type { SwitchProps } from './Switch.types'

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, disabled = false, label, className, style }, ref) => {
    const [focused, setFocused] = useState(false)

    const trackBg     = checked ? 'rgba(0,200,255,0.15)' : 'rgba(0,18,0,0.50)'
    const trackBorder = checked ? colors.border.cyanActive : colors.border.subtle
    const thumbBg     = checked ? colors.text.cyanPrimary  : colors.border.default
    const thumbGlow   = checked ? boxGlow.cyanDefault       : boxGlow.none
    const thumbLeft   = checked ? '19px' : '2px'

    return (
      <div
        data-matrixui-switch
        className={className}
        style={{
          display:    'inline-flex',
          alignItems: 'center',
          gap:        '8px',
          opacity:    disabled ? 0.35 : 1,
          cursor:     disabled ? 'not-allowed' : 'pointer',
          ...style,
        }}
        onClick={() => { if (!disabled) onChange(!checked) }}
      >
        <button
          ref={ref}
          role="switch"
          aria-checked={checked}
          aria-label={label ?? 'Toggle'}
          disabled={disabled}
          style={{
            position:     'relative',
            width:        '34px',
            height:       '17px',
            background:   trackBg,
            border:       `1px solid ${trackBorder}`,
            borderRadius: '9px',
            cursor:       disabled ? 'not-allowed' : 'pointer',
            outline:      'none',
            boxShadow:    focused ? boxGlow.cyanFocusRing : boxGlow.none,
            transition:   transitions.interactive,
            padding:      0,
            flexShrink:   0,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onClick={e => { e.stopPropagation(); if (!disabled) onChange(!checked) }}
        >
          <span
            style={{
              position:     'absolute',
              top:          '2px',
              left:         thumbLeft,
              width:        '11px',
              height:       '11px',
              borderRadius: '50%',
              background:   thumbBg,
              boxShadow:    thumbGlow,
              transition:   transitions.toggle,
              display:      'block',
            }}
          />
        </button>
        {label && (
          <span style={{
            fontFamily:  'JetBrains Mono, monospace',
            fontSize:    '11px',
            color:       checked ? colors.text.cyanPrimary : colors.text.muted,
            letterSpacing: '0.04em',
            userSelect:  'none',
          }}>
            {label}
          </span>
        )}
      </div>
    )
  },
)

Switch.displayName = 'Switch'
