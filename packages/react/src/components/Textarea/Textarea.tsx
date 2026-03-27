import React, { useState } from 'react'
import { colors, boxGlow, transitions } from '@matrixui/tokens'
import type { TextareaProps } from './Textarea.types'

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'green',
      error   = false,
      style,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false)

    const isCyan = variant === 'cyan'

    const borderColor = error
      ? colors.border.danger
      : focused
        ? (isCyan ? colors.border.cyanActive : colors.border.active)
        : (isCyan ? colors.border.cyan : colors.border.default)

    const shadow = error
      ? boxGlow.dangerFocusRing
      : focused
        ? (isCyan ? boxGlow.cyanFocusRing : boxGlow.greenFocusRing)
        : boxGlow.none

    const computedStyle: React.CSSProperties = {
      display:         'block',
      width:           '100%',
      padding:         '10px',
      fontFamily:      'JetBrains Mono, monospace',
      fontSize:        '13px',
      lineHeight:      1.5,
      letterSpacing:   '0.04em',
      color:           focused
        ? (isCyan ? colors.text.cyanPrimary : colors.text.primary)
        : (isCyan ? colors.text.cyanMuted   : colors.text.secondary),
      background:      isCyan ? colors.bg.inputCyan : colors.bg.input,
      border:          `1px solid ${borderColor}`,
      borderRadius:    0,
      outline:         'none',
      boxShadow:       shadow,
      transition:      transitions.interactive,
      caretColor:      isCyan ? colors.text.cyanPrimary : colors.text.primary,
      resize:          'none',
      ...style,
    }

    return (
      <textarea
        ref={ref}
        data-matrixui-textarea
        style={computedStyle}
        onFocus={e => { setFocused(true);  onFocus?.(e) }}
        onBlur={e  => { setFocused(false); onBlur?.(e) }}
        {...rest}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
