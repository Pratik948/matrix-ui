import type React from 'react'

export type TextareaVariant = 'green' | 'cyan'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant
  error?:   boolean
}
