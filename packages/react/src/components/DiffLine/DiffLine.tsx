import React from 'react'
import { colors, textGlow } from '@matrixui/tokens'
import type { DiffLineProps, DiffLineType } from './DiffLine.types'

interface DiffConfig {
  background:  string
  borderColor: string
  color:       string
  textShadow:  string
  prefix:      string
}

const diffConfigs: Record<DiffLineType, DiffConfig> = {
  added: {
    background:  colors.diff.addedBg,
    borderColor: colors.diff.addedBorder,
    color:       colors.diff.addedText,
    textShadow:  textGlow.diffAdded,
    prefix:      '+',
  },
  removed: {
    background:  colors.diff.removedBg,
    borderColor: colors.diff.removedBorder,
    color:       colors.diff.removedText,
    textShadow:  textGlow.diffRemoved,
    prefix:      '-',
  },
  neutral: {
    background:  'transparent',
    borderColor: 'transparent',
    color:       colors.diff.neutralText,
    textShadow:  textGlow.none,
    prefix:      ' ',
  },
}

export const DiffLine = React.forwardRef<HTMLDivElement, DiffLineProps>(
  ({ type, content, lineNo, className, style }, ref) => {
    const cfg = diffConfigs[type]

    return (
      <div
        ref={ref}
        data-matrixui-diff-line
        data-diff-type={type}
        className={className}
        style={{
          display:         'flex',
          alignItems:      'stretch',
          minHeight:       '28px',
          background:      cfg.background,
          borderLeft:      `3px solid ${cfg.borderColor}`,
          ...style,
        }}
      >
        {lineNo !== undefined && (
          <span
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              minWidth:      '48px',
              padding:       '2px 8px',
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '13px',
              lineHeight:    1.75,
              color:         colors.text.ghost,
              userSelect:    'none',
              flexShrink:    0,
              textAlign:     'right',
              justifyContent:'flex-end',
            }}
          >
            {lineNo}
          </span>
        )}
        <span
          style={{
            display:     'inline-flex',
            alignItems:  'center',
            padding:     '2px 4px 2px 0',
            fontFamily:  'JetBrains Mono, monospace',
            fontSize:    '13px',
            lineHeight:  1.75,
            color:       cfg.color,
            userSelect:  'none',
            flexShrink:  0,
            width:       '16px',
          }}
        >
          {cfg.prefix}
        </span>
        <code
          style={{
            flex:       1,
            padding:    '2px 16px 2px 0',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize:   '13px',
            lineHeight: 1.75,
            color:      cfg.color,
            textShadow: cfg.textShadow,
            whiteSpace: 'pre',
            overflowX:  'auto',
          }}
        >
          {content}
        </code>
      </div>
    )
  },
)

DiffLine.displayName = 'DiffLine'
