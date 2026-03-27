export type ContextMenuItemType = 'action' | 'separator' | 'submenu'

export interface ContextMenuItem {
  type:      ContextMenuItemType
  label?:    string
  icon?:     string
  disabled?: boolean
  danger?:   boolean
  onClick?:  () => void
  items?:    ContextMenuItem[]
}

export interface ContextMenuProps {
  items:     ContextMenuItem[]
  children:  React.ReactElement
  className?: string
}
