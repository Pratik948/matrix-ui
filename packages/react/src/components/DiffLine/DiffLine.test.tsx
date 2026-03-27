import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DiffLine } from './DiffLine'

describe('DiffLine', () => {
  it('renders content', () => {
    render(<DiffLine type="added" content="const x = 1" />)
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('renders + prefix for added', () => {
    render(<DiffLine type="added" content="new line" />)
    expect(screen.getByText('+')).toBeInTheDocument()
  })

  it('renders - prefix for removed', () => {
    render(<DiffLine type="removed" content="old line" />)
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('renders line number when provided', () => {
    render(<DiffLine type="neutral" content="unchanged" lineNo={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('has data-matrixui-diff-line attribute', () => {
    render(<DiffLine type="neutral" content="test" />)
    expect(document.querySelector('[data-matrixui-diff-line]')).toBeInTheDocument()
  })
})
