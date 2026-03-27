import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ToastProvider, useToast } from './Toast'

function ToastTrigger({ message }: { message: string }) {
  const { addToast } = useToast()
  return (
    <button onClick={() => addToast({ variant: 'info', message })}>
      Show Toast
    </button>
  )
}

describe('Toast', () => {
  it('renders children normally', () => {
    render(
      <ToastProvider>
        <div>Hello</div>
      </ToastProvider>
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('shows toast on addToast call', async () => {
    render(
      <ToastProvider>
        <ToastTrigger message="Test notification" />
      </ToastProvider>
    )
    await act(async () => {
      fireEvent.click(screen.getByText('Show Toast'))
    })
    expect(screen.getByText('Test notification')).toBeInTheDocument()
  })

  it('throws when useToast used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<ToastTrigger message="test" />)).toThrow()
    consoleSpy.mockRestore()
  })
})
