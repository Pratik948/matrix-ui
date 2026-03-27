import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders lang variant with label', () => {
    render(<Tag variant="lang" label="TypeScript" language="TypeScript" />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders version variant with v prefix', () => {
    render(<Tag variant="version" label="1.0.0" />)
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
  })

  it('renders branch variant with ⎇ prefix', () => {
    render(<Tag variant="branch" label="main" />)
    expect(screen.getByText(/main/)).toBeInTheDocument()
  })

  it('has data-matrixui-tag attribute', () => {
    render(<Tag variant="branch" label="main" />)
    expect(document.querySelector('[data-matrixui-tag]')).toBeInTheDocument()
  })
})
