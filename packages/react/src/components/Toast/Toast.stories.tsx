import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'
import { Button } from '../Button'

const meta: Meta<typeof ToastProvider> = {
  title: 'MatrixUI/Toast',
  component: ToastProvider,
  parameters: { backgrounds: { default: 'matrix' } },
}
export default meta
type Story = StoryObj<typeof ToastProvider>

function ToastDemo() {
  const { addToast } = useToast()
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '20px' }}>
      <Button variant="primary" onClick={() => addToast({ variant: 'info',    message: 'Fetching from remote…' })}>Info</Button>
      <Button variant="primary" onClick={() => addToast({ variant: 'success', message: 'Push successful.' })}>Success</Button>
      <Button variant="danger"  onClick={() => addToast({ variant: 'error',   message: 'Merge conflict detected.' })}>Error</Button>
      <Button variant="ghost"   onClick={() => addToast({ variant: 'warn',    message: 'Untracked files will be ignored.' })}>Warn</Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
}
