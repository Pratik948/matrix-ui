export type ToastVariant = 'info' | 'success' | 'error' | 'warn'

export interface ToastItem {
  id:        string
  variant:   ToastVariant
  message:   string
  duration?: number
}

export interface ToastContextValue {
  addToast: (options: Omit<ToastItem, 'id'>) => void
}

export interface ToastProviderProps {
  children: React.ReactNode
}
