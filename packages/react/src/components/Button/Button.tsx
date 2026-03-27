import React, { useState, useEffect, useRef } from 'react'
import { colors, textGlow, boxGlow, transitions } from '@matrixui/tokens'
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types'

const SPINNER_FRAMES = ['|', '/', '—', '\\']

const sizeMap: Record<ButtonSize, { height: string; paddingInline: string; fontSize: string }> = {
  sm: { height: '26px', paddingInline: '12px', fontSize: '10px' },
  md: { height: '32px', paddingInline: '16px', fontSize: '11px' },
  lg: { height: '38px', paddingInline: '20px', fontSize: '12px' },
}

interface VariantStyle {
  color:            string
  background:       string
  borderColor:      string
  textShadow:       string
  boxShadow:        string
  hoverBackground:  string
  hoverBorder:      string
  hoverShadow:      string
  hoverTextShadow:  string
}

const variantMap: Record<ButtonVariant, VariantStyle> = {
  primary: {
    color:           colors.interactive.primaryText,
    background:      colors.interactive.primaryBg,
    borderColor:     colors.interactive.primaryBorder,
    textShadow:      textGlow.greenSoft,
    boxShadow:       boxGlow.greenDefault,
    hoverBackground: colors.interactive.primaryBgHover,
    hoverBorder:     colors.interactive.primaryBorder,
    hoverShadow:     boxGlow.greenHover,
    hoverTextShadow: textGlow.greenPrimary,
  },
  ghost: {
    color:           colors.interactive.ghostText,
    background:      colors.interactive.ghostBg,
    borderColor:     colors.interactive.ghostBorder,
    textShadow:      textGlow.none,
    boxShadow:       boxGlow.none,
    hoverBackground: colors.interactive.ghostBgHover,
    hoverBorder:     colors.interactive.ghostBorderHover,
    hoverShadow:     boxGlow.greenSubtle,
    hoverTextShadow: textGlow.greenSoft,
  },
  danger: {
    color:           colors.interactive.dangerText,
    background:      colors.interactive.dangerBg,
    borderColor:     colors.interactive.dangerBorder,
    textShadow:      textGlow.none,
    boxShadow:       boxGlow.dangerDefault,
    hoverBackground: colors.interactive.dangerBgHover,
    hoverBorder:     colors.interactive.dangerBorder,
    hoverShadow:     boxGlow.dangerHover,
    hoverTextShadow: textGlow.none,
  },
  cyan: {
    color:           colors.interactive.cyanText,
    background:      colors.interactive.cyanBg,
    borderColor:     colors.interactive.cyanBorder,
    textShadow:      textGlow.cyanSoft,
    boxShadow:       boxGlow.cyanDefault,
    hoverBackground: colors.interactive.cyanBgHover,
    hoverBorder:     colors.interactive.cyanBorder,
    hoverShadow:     boxGlow.cyanHover,
    hoverTextShadow: textGlow.cyanPrimary,
  },
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = 'primary',
      size     = 'md',
      loading  = false,
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [hovered,  setHovered]  = useState(false)
    const [focused,  setFocused]  = useState(false)
    const [spinnerIdx, setSpinnerIdx] = useState(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
      if (loading) {
        intervalRef.current = setInterval(() => {
          setSpinnerIdx(i => (i + 1) % SPINNER_FRAMES.length)
        }, 120)
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [loading])

    const isDisabled = disabled || loading
    const v = variantMap[variant]
    const s = sizeMap[size]

    const computedStyle: React.CSSProperties = {
      display:         'inline-flex',
      alignItems:      'center',
      justifyContent:  'center',
      gap:             '6px',
      height:          s.height,
      paddingInline:   s.paddingInline,
      fontSize:        s.fontSize,
      fontFamily:      'JetBrains Mono, monospace',
      letterSpacing:   '0.08em',
      textTransform:   'uppercase',
      lineHeight:      1,
      border:          `1px solid ${hovered && !isDisabled ? v.hoverBorder : v.borderColor}`,
      borderRadius:    0,
      background:      hovered && !isDisabled ? v.hoverBackground : v.background,
      color:           isDisabled ? colors.text.ghost : v.color,
      textShadow:      isDisabled ? textGlow.none : (hovered ? v.hoverTextShadow : v.textShadow),
      boxShadow:       isDisabled ? boxGlow.none : (focused ? boxGlow.greenFocusRing : (hovered ? v.hoverShadow : v.boxShadow)),
      cursor:          isDisabled ? 'not-allowed' : 'pointer',
      opacity:         isDisabled ? 0.35 : 1,
      transition:      transitions.interactive,
      outline:         'none',
      userSelect:      'none',
      pointerEvents:   loading ? 'none' : undefined,
      ...style,
    }

    return (
      <button
        ref={ref}
        data-matrixui-button
        disabled={isDisabled}
        style={computedStyle}
        onMouseEnter={e => { setHovered(true);  onMouseEnter?.(e) }}
        onMouseLeave={e => { setHovered(false); onMouseLeave?.(e) }}
        onFocus={e      => { setFocused(true);  onFocus?.(e) }}
        onBlur={e       => { setFocused(false); onBlur?.(e) }}
        {...rest}
      >
        {loading ? SPINNER_FRAMES[spinnerIdx] : children}
      </button>
    )
  },
)

Button.displayName = 'Button'
