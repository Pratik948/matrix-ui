import React from 'react'
import { colors, textGlow } from '@matrixui/tokens'
import type { BadgeProps, BadgeVariant } from './Badge.types'

interface BadgeConfig {
  label:      string
  color:      string
  background: string
  glow:       string
}

const badgeConfigs: Record<BadgeVariant, BadgeConfig> = {
  synced: {
    label:      '◉ SYNCED',
    color:      colors.status.synced,
    background: 'rgba(0, 255, 65, 0.08)',
    glow:       textGlow.statusSynced,
  },
  ahead: {
    label:      '↑ AHEAD',
    color:      colors.status.ahead,
    background: 'rgba(0, 204, 204, 0.08)',
    glow:       textGlow.statusAhead,
  },
  modified: {
    label:      '◈ MODIFIED',
    color:      colors.status.modified,
    background: 'rgba(255, 204, 0, 0.08)',
    glow:       textGlow.statusModified,
  },
  behind: {
    label:      '↓ BEHIND',
    color:      colors.status.behind,
    background: 'rgba(255, 68, 68, 0.08)',
    glow:       textGlow.statusBehind,
  },
  count: {
    label:      '',
    color:      colors.text.primary,
    background: 'rgba(0, 255, 65, 0.10)',
    glow:       textGlow.greenSubtle,
  },
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'synced', count, className, style }, ref) => {
    const cfg = badgeConfigs[variant]
    const label = variant === 'count' ? String(count ?? 0) : cfg.label

    const borderColor = (() => {
      switch (variant) {
        case 'synced':   return 'rgba(0, 255, 65, 0.30)'
        case 'ahead':    return 'rgba(0, 204, 204, 0.30)'
        case 'modified': return 'rgba(255, 204, 0, 0.30)'
        case 'behind':   return 'rgba(255, 68, 68, 0.30)'
        case 'count':    return 'rgba(0, 255, 65, 0.30)'
      }
    })()

    return (
      <span
        ref={ref}
        data-matrixui-badge
        className={className}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          padding:        '2px 6px',
          fontFamily:     'JetBrains Mono, monospace',
          fontSize:       '9px',
          fontWeight:     500,
          letterSpacing:  '0.08em',
          textTransform:  'uppercase',
          lineHeight:     1,
          color:          cfg.color,
          background:     cfg.background,
          border:         `1px solid ${borderColor}`,
          borderRadius:   '2px',
          textShadow:     cfg.glow,
          whiteSpace:     'nowrap',
          ...style,
        }}
      >
        {label}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
