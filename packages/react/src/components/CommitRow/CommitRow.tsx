import React, { useState } from 'react'
import { colors, transitions } from '@matrixui/tokens'
import { Avatar } from '../Avatar'
import type { CommitRowProps } from './CommitRow.types'

export const CommitRow = React.forwardRef<HTMLDivElement, CommitRowProps>(
  ({ author, message, hash, time, fileCount, onClick, className, style }, ref) => {
    const [hovered, setHovered] = useState(false)

    const shortHash = hash.slice(0, 7)
    const meta = [author, time, fileCount !== undefined ? `${fileCount} file${fileCount !== 1 ? 's' : ''}` : undefined]
      .filter(Boolean)
      .join(' · ')

    return (
      <div
        ref={ref}
        data-matrixui-commit-row
        className={className}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:       'flex',
          gap:           '16px',
          alignItems:    'flex-start',
          padding:       '12px 20px',
          minHeight:     '56px',
          borderBottom:  `1px solid ${colors.border.subtle}`,
          background:    hovered ? colors.bg.elevated : 'transparent',
          cursor:        onClick ? 'pointer' : 'default',
          transition:    transitions.background,
          ...style,
        }}
      >
        <Avatar name={author} size="md" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '13px',
              lineHeight:    1.5,
              color:         colors.text.secondary,
              whiteSpace:    'nowrap',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              marginBottom:  '4px',
            }}
          >
            {message}
          </div>
          <div
            style={{
              fontFamily:   'JetBrains Mono, monospace',
              fontSize:     '11px',
              lineHeight:   1.4,
              color:        colors.text.muted,
              letterSpacing:'0.04em',
            }}
          >
            {meta}
          </div>
        </div>
        <span
          style={{
            fontFamily:  'JetBrains Mono, monospace',
            fontSize:    '11px',
            lineHeight:  1,
            color:       colors.text.dim,
            background:  colors.bg.elevated,
            border:      `1px solid ${colors.border.subtle}`,
            padding:     '2px 6px',
            flexShrink:  0,
            marginTop:   '2px',
            letterSpacing:'0',
          }}
        >
          {shortHash}
        </span>
      </div>
    )
  },
)

CommitRow.displayName = 'CommitRow'
