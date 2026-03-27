import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders with role switch', () => {
    render(<Switch checked={false} onChange={() => undefined} />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('has aria-checked=false when unchecked', () => {
    render(<Switch checked={false} onChange={() => undefined} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
  })

  it('has aria-checked=true when checked', () => {
    render(<Switch checked={true} onChange={() => undefined} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange when clicked', () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(<Switch checked={false} onChange={onChange} disabled />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders label when provided', () => {
    render(<Switch checked={true} onChange={() => undefined} label="Dark mode" />)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
  })

  it('has data-matrixui-switch attribute', () => {
    render(<Switch checked={false} onChange={() => undefined} />)
    expect(document.querySelector('[data-matrixui-switch]')).toBeInTheDocument()
  })
})
