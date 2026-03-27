export type DiffLineType = 'added' | 'removed' | 'neutral'

export interface DiffLineProps {
  type:       DiffLineType
  content:    string
  lineNo?:    number
  className?: string
  style?:     React.CSSProperties
}
