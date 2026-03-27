import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="John Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders single initial for single word name', () => {
    render(<Avatar name="Alice" />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('renders image when src is provided', () => {
    render(<Avatar name="John Doe" src="https://example.com/avatar.jpg" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('has data-matrixui-avatar attribute', () => {
    render(<Avatar name="Test User" />)
    expect(document.querySelector('[data-matrixui-avatar]')).toBeInTheDocument()
  })
})
