export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content:    React.ReactNode
  children:   React.ReactElement
  placement?: TooltipPlacement
  className?: string
  style?:     React.CSSProperties
}
