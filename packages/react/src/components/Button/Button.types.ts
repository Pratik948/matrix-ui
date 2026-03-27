import type React from 'react'

export type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'cyan'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  loading?:  boolean
}
