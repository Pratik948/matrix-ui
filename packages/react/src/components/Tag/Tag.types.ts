export type TagVariant = 'lang' | 'version' | 'branch'

export interface TagProps {
  variant:    TagVariant
  label:      string
  language?:  string
  className?: string
  style?:     React.CSSProperties
}
