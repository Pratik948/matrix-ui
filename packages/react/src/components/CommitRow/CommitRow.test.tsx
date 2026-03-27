import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CommitRow } from './CommitRow'

const defaultProps = {
  author:    'Linus Torvalds',
  message:   'Initial commit',
  hash:      'abc1234def',
  time:      '2h ago',
  fileCount: 3,
}

describe('CommitRow', () => {
  it('renders commit message', () => {
    render(<CommitRow {...defaultProps} />)
    expect(screen.getByText('Initial commit')).toBeInTheDocument()
  })

  it('renders short hash (7 chars)', () => {
    render(<CommitRow {...defaultProps} />)
    expect(screen.getByText('abc1234')).toBeInTheDocument()
  })

  it('renders author name', () => {
    render(<CommitRow {...defaultProps} />)
    expect(screen.getByText(/Linus Torvalds/)).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<CommitRow {...defaultProps} onClick={onClick} />)
    fireEvent.click(document.querySelector('[data-matrixui-commit-row]')!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has data-matrixui-commit-row attribute', () => {
    render(<CommitRow {...defaultProps} />)
    expect(document.querySelector('[data-matrixui-commit-row]')).toBeInTheDocument()
  })
})
