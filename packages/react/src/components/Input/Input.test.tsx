import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from './Input'

describe('Input', () => {
  it('renders with data-matrixui-input attribute', () => {
    render(<Input />)
    expect(document.querySelector('[data-matrixui-input]')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('calls onChange', () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
