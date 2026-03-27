import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { colors, boxGlow, textGlow } from '@matrixui/tokens'
import { MatrixRain } from '../MatrixRain'
import type { ModalProps, ModalSize } from './Modal.types'

const sizeMap: Record<ModalSize, string> = {
  sm: '360px',
  md: '480px',
  lg: '640px',
}

function ModalInner({ open, onClose, size = 'md', title, children, className, style }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Basic focus trap: focus content on open
  useEffect(() => {
    if (open) {
      const prev = document.activeElement as HTMLElement | null
      contentRef.current?.focus()
      return () => { prev?.focus() }
    }
  }, [open])

  if (!open) return null

  return (
    <div
      data-matrixui-modal
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     500,
        background: 'rgba(0, 0, 0, 0.75)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* MatrixRain backdrop */}
      <MatrixRain preset="modal" style={{ position: 'fixed', inset: 0, zIndex: 0 }} />

      {/* Modal box */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={className}
        style={{
          position:    'relative',
          zIndex:      1,
          width:       sizeMap[size],
          maxWidth:    'calc(100vw - 40px)',
          maxHeight:   'calc(100vh - 80px)',
          background:  colors.bg.modal,
          border:      `1px solid ${colors.border.default}`,
          boxShadow:   boxGlow.window,
          display:     'flex',
          flexDirection: 'column',
          outline:     'none',
          overflowY:   'auto',
          ...style,
        }}
      >
        {title && (
          <div
            style={{
              padding:      '16px 20px',
              borderBottom: `1px solid ${colors.border.subtle}`,
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'space-between',
              flexShrink:   0,
            }}
          >
            <span style={{
              fontFamily:   'Share Tech Mono, JetBrains Mono, monospace',
              fontSize:     '14px',
              fontWeight:   700,
              color:        colors.text.primary,
              textShadow:   textGlow.greenPrimary,
              letterSpacing: '0.04em',
            }}>
              {title}
            </span>
            <button
              onClick={onClose}
              style={{
                background:  'none',
                border:      'none',
                color:       colors.text.muted,
                cursor:      'pointer',
                fontSize:    '16px',
                lineHeight:  1,
                padding:     '0 4px',
                fontFamily:  'monospace',
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function Modal(props: ModalProps) {
  if (typeof document === 'undefined') return null
  return createPortal(<ModalInner {...props} />, document.body)
}

Modal.displayName = 'Modal'
