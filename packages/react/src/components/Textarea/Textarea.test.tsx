import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders with data-matrixui-textarea attribute', () => {
    render(<Textarea />)
    expect(document.querySelector('[data-matrixui-textarea]')).toBeInTheDocument()
  })

  it('has resize: none style', () => {
    render(<Textarea />)
    const el = document.querySelector('[data-matrixui-textarea]') as HTMLTextAreaElement
    expect(el.style.resize).toBe('none')
  })

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<Textarea disabled />)
    const textarea = container.querySelector('textarea')
    expect(textarea).toBeDisabled()
  })
})
