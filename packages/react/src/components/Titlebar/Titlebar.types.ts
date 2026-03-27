export interface TitlebarMenuItem {
  label:    string
  onClick?: () => void
}

export interface TitlebarProps {
  appName?:      string
  version?:      string
  menuItems?:    TitlebarMenuItem[]
  onMinimize?:   () => void
  onMaximize?:   () => void
  onClose?:      () => void
  className?:    string
  style?:        React.CSSProperties
}
