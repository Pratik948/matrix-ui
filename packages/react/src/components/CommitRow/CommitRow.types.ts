export interface CommitRowProps {
  author:     string
  message:    string
  hash:       string
  time:       string
  fileCount?: number
  onClick?:   () => void
  className?: string
  style?:     React.CSSProperties
}
