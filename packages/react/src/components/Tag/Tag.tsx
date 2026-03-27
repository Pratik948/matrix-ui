import React from 'react'
import { colors } from '@matrixui/tokens'
import type { TagProps } from './Tag.types'

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ variant, label, language, className, style }, ref) => {
    const baseStyle: React.CSSProperties = {
      display:       'inline-flex',
      alignItems:    'center',
      gap:           '4px',
      fontFamily:    'JetBrains Mono, monospace',
      fontSize:      '11px',
      lineHeight:    1,
      letterSpacing: '0.04em',
      padding:       '2px 6px',
      borderRadius:  '2px',
    }

    if (variant === 'lang') {
      const langKey = language ?? label
      const langColors = colors.lang as Record<string, string>
      const dotColor = langColors[langKey] ?? colors.lang.default
      return (
        <span
          ref={ref}
          data-matrixui-tag
          className={className}
          style={{ ...baseStyle, color: colors.text.tertiary, ...style }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColor, display: 'inline-block', flexShrink: 0 }} />
          {label}
        </span>
      )
    }

    if (variant === 'version') {
      return (
        <span
          ref={ref}
          data-matrixui-tag
          className={className}
          style={{ ...baseStyle, color: colors.text.cyanPrimary, ...style }}
        >
          v{label}
        </span>
      )
    }

    // branch
    return (
      <span
        ref={ref}
        data-matrixui-tag
        className={className}
        style={{ ...baseStyle, color: colors.text.primary, ...style }}
      >
        ⎇ {label}
      </span>
    )
  },
)

Tag.displayName = 'Tag'
