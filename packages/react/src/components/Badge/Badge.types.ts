export type BadgeVariant = 'synced' | 'ahead' | 'modified' | 'behind' | 'count'

export interface BadgeProps {
  variant?:   BadgeVariant
  count?:     number
  className?: string
  style?:     React.CSSProperties
}
