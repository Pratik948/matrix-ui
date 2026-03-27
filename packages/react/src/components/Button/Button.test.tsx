import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('has data-matrixui-button attribute', () => {
    render(<Button>Test</Button>)
    expect(document.querySelector('[data-matrixui-button]')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows spinner when loading', () => {
    render(<Button loading>Save</Button>)
    const btn = screen.getByRole('button')
    expect(btn.textContent).toMatch(/[|/—\\]/)
  })

  it('renders all variants without error', () => {
    const variants = ['primary', 'ghost', 'danger', 'cyan'] as const
    for (const variant of variants) {
      render(<Button variant={variant}>{variant}</Button>)
    }
    expect(screen.getAllByRole('button')).toHaveLength(variants.length)
  })
})
