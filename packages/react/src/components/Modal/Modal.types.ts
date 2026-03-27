export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  open:       boolean
  onClose:    () => void
  size?:      ModalSize
  title?:     string
  children:   React.ReactNode
  className?: string
  style?:     React.CSSProperties
}
