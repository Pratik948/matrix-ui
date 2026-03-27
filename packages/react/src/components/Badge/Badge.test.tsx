import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders synced label', () => {
    render(<Badge variant="synced" />)
    expect(screen.getByText(/SYNCED/i)).toBeInTheDocument()
  })

  it('renders count variant with number', () => {
    render(<Badge variant="count" count={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('has data-matrixui-badge attribute', () => {
    render(<Badge />)
    expect(document.querySelector('[data-matrixui-badge]')).toBeInTheDocument()
  })

  it('renders all variants without error', () => {
    const variants = ['synced', 'ahead', 'modified', 'behind'] as const
    for (const variant of variants) {
      render(<Badge variant={variant} />)
    }
    expect(document.querySelectorAll('[data-matrixui-badge]')).toHaveLength(variants.length)
  })
})
