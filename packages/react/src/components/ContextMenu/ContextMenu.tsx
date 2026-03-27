import React, { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { colors, boxGlow } from '@matrixui/tokens'
import type { ContextMenuProps, ContextMenuItem } from './ContextMenu.types'

interface MenuPosition { x: number; y: number }

function ContextMenuList({
  items,
  position,
  onClose,
}: {
  items: ContextMenuItem[]
  position: MenuPosition
  onClose: () => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const onScroll = () => onClose()
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [onClose])

  return (
    <div
      ref={menuRef}
      data-matrixui-context-menu
      style={{
        position:    'fixed',
        top:         position.y,
        left:        position.x,
        zIndex:      400,
        background:  colors.bg.surface,
        border:      `1px solid ${colors.border.default}`,
        boxShadow:   boxGlow.greenSubtle,
        minWidth:    '160px',
        padding:     '4px 0',
      }}
    >
      {items.map((item, i) => {
        if (item.type === 'separator') {
          return (
            <div
              key={i}
              style={{
                height:     '1px',
                background: colors.border.subtle,
                margin:     '4px 0',
              }}
            />
          )
        }

        return (
          <div
            key={i}
            role="menuitem"
            aria-disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.()
                onClose()
              }
            }}
            style={{
              padding:     '6px 12px',
              fontFamily:  'JetBrains Mono, monospace',
              fontSize:    '11px',
              lineHeight:  1,
              letterSpacing: '0.04em',
              color:       item.danger
                ? colors.text.danger
                : item.disabled
                  ? colors.text.ghost
                  : colors.text.secondary,
              cursor:      item.disabled ? 'not-allowed' : 'pointer',
              display:     'flex',
              alignItems:  'center',
              gap:         '8px',
            }}
            onMouseEnter={e => {
              if (!item.disabled) {
                (e.currentTarget as HTMLDivElement).style.background = colors.bg.elevated
                ;(e.currentTarget as HTMLDivElement).style.color = item.danger ? colors.text.danger : colors.text.primary
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLDivElement).style.color = item.danger
                ? colors.text.danger
                : item.disabled
                  ? colors.text.ghost
                  : colors.text.secondary
            }}
          >
            {item.icon && <span style={{ width: '12px', textAlign: 'center' }}>{item.icon}</span>}
            {item.label}
            {item.type === 'submenu' && <span style={{ marginLeft: 'auto', opacity: 0.5 }}>▶</span>}
          </div>
        )
      })}
    </div>
  )
}

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [position, setPosition] = useState<MenuPosition | null>(null)

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleClose = useCallback(() => setPosition(null), [])

  useEffect(() => {
    if (!position) return
    const onClick = () => handleClose()
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [position, handleClose])

  const child = React.cloneElement(children, {
    onContextMenu: handleContextMenu,
    className,
  })

  return (
    <>
      {child}
      {position && typeof document !== 'undefined' && createPortal(
        <ContextMenuList items={items} position={position} onClose={handleClose} />,
        document.body,
      )}
    </>
  )
}

ContextMenu.displayName = 'ContextMenu'
