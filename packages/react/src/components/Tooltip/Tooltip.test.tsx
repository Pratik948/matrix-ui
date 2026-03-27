import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('does not show tooltip content by default', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on mouse enter', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )
    fireEvent.mouseEnter(document.querySelector('[data-matrixui-tooltip]')!)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByText('Tooltip text')).toBeInTheDocument()
  })

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )
    const wrapper = document.querySelector('[data-matrixui-tooltip]')!
    fireEvent.mouseEnter(wrapper)
    fireEvent.mouseLeave(wrapper)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
