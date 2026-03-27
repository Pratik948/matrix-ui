import type React from 'react'

export type InputVariant = 'green' | 'cyan'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  error?:   boolean
}
