import React from 'react'
import { colors, textGlow } from '@matrixui/tokens'
import type { AvatarProps, AvatarSize } from './Avatar.types'

const sizeMap: Record<AvatarSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)
  if (words.length === 0) return '?'
  const first = words[0]?.[0] ?? ''
  const last  = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase() || '?'
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, size = 'md', className, style }, ref) => {
    const px = sizeMap[size]
    const fontSize = size === 'sm' ? '9px' : size === 'md' ? '12px' : '14px'

    const containerStyle: React.CSSProperties = {
      width:           px,
      height:          px,
      borderRadius:    '50%',
      overflow:        'hidden',
      background:      colors.bg.elevated,
      border:          `1px solid ${colors.border.default}`,
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      flexShrink:      0,
      ...style,
    }

    return (
      <div
        ref={ref}
        data-matrixui-avatar
        className={className}
        style={containerStyle}
        aria-label={name}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontSize,
              fontFamily:  'JetBrains Mono, monospace',
              fontWeight:  700,
              color:       colors.text.tertiary,
              textShadow:  textGlow.greenSoft,
              lineHeight:  1,
              letterSpacing: '0.04em',
            }}
          >
            {getInitials(name)}
          </span>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
