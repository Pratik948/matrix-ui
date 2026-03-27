import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Modal } from './Modal'

describe('Modal', () => {
  it('does not render when closed', () => {
    render(<Modal open={false} onClose={() => undefined}><div>Content</div></Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders when open', () => {
    render(<Modal open={true} onClose={() => undefined}><div>Modal content</div></Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Modal open={true} onClose={() => undefined} title="Confirm Merge"><div>Content</div></Modal>)
    expect(screen.getByText('Confirm Merge')).toBeInTheDocument()
  })

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn()
    render(<Modal open={true} onClose={onClose}><div>Content</div></Modal>)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('has data-matrixui-modal attribute', () => {
    render(<Modal open={true} onClose={() => undefined}><div>Content</div></Modal>)
    expect(document.querySelector('[data-matrixui-modal]')).toBeInTheDocument()
  })
})
