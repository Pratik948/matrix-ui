import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { colors, duration, easing } from '@matrixui/tokens'
import type { ToastItem, ToastVariant, ToastContextValue, ToastProviderProps } from './Toast.types'

const MAX_VISIBLE = 3
const DEFAULT_DURATION = 4000

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}

interface ToastConfig {
  borderLeft: string
  background: string
}

const toastConfigs: Record<ToastVariant, ToastConfig> = {
  info:    { borderLeft: colors.border.active,   background: colors.bg.surface },
  success: { borderLeft: colors.status.synced,   background: 'rgba(0, 255, 65, 0.06)' },
  error:   { borderLeft: colors.border.danger,   background: 'rgba(255, 68, 68, 0.06)' },
  warn:    { borderLeft: colors.status.modified, background: 'rgba(255, 204, 0, 0.06)' },
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const cfg = toastConfigs[item.variant]
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Enter animation
    const rafId = requestAnimationFrame(() => setVisible(true))

    // Auto-dismiss
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(item.id), 150)
    }, item.duration ?? DEFAULT_DURATION)

    return () => {
      cancelAnimationFrame(rafId)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [item.id, item.duration, onDismiss])

  return (
    <div
      data-matrixui-toast
      data-variant={item.variant}
      style={{
        width:          '320px',
        padding:        '12px 16px',
        background:     cfg.background,
        border:         `1px solid ${colors.border.default}`,
        borderLeft:     `3px solid ${cfg.borderLeft}`,
        fontFamily:     'JetBrains Mono, monospace',
        fontSize:       '11px',
        lineHeight:     1.4,
        letterSpacing:  '0.04em',
        color:          colors.text.secondary,
        opacity:        visible ? 1 : 0,
        transform:      visible ? 'translateY(0)' : 'translateY(8px)',
        transition:     `opacity ${visible ? duration.moderate : duration.normal} ${easing.terminal}, transform ${visible ? duration.moderate : duration.normal} ${easing.terminal}`,
        cursor:         'pointer',
      }}
      onClick={() => {
        setVisible(false)
        setTimeout(() => onDismiss(item.id), 150)
      }}
    >
      {item.message}
    </div>
  )
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [queue, setQueue] = useState<ToastItem[]>([])

  const addToast = useCallback((options: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setQueue(prev => [...prev, { ...options, id }])
  }, [])

  const onDismiss = useCallback((id: string) => {
    setQueue(prev => prev.filter(t => t.id !== id))
  }, [])

  const visible = queue.slice(0, MAX_VISIBLE)

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {typeof document !== 'undefined' && visible.length > 0 && (
        <div
          style={{
            position:   'fixed',
            bottom:     '20px',
            right:      '20px',
            zIndex:     300,
            display:    'flex',
            flexDirection: 'column',
            gap:        '8px',
            pointerEvents: 'none',
          }}
        >
          {visible.map(item => (
            <div key={item.id} style={{ pointerEvents: 'auto' }}>
              <ToastCard item={item} onDismiss={onDismiss} />
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
