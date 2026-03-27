import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MatrixRain } from './MatrixRain'

// jsdom doesn't support canvas — mock it
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    scale:    vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    font:     '',
    fillStyle:   '',
    shadowColor: '',
    shadowBlur:  0,
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext
})

describe('MatrixRain', () => {
  it('renders a canvas element', () => {
    render(
      <div style={{ width: 100, height: 100, position: 'relative' }}>
        <MatrixRain />
      </div>,
    )
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeTruthy()
  })

  it('applies data-matrixui-matrix-rain attribute', () => {
    render(
      <div style={{ width: 100, height: 100, position: 'relative' }}>
        <MatrixRain />
      </div>,
    )
    const canvas = document.querySelector('[data-matrixui-matrix-rain]')
    expect(canvas).toBeTruthy()
  })

  it('accepts className and style props', () => {
    render(
      <div style={{ width: 100, height: 100, position: 'relative' }}>
        <MatrixRain className="test-class" style={{ zIndex: 5 }} />
      </div>,
    )
    const canvas = document.querySelector('canvas')
    expect(canvas?.className).toBe('test-class')
  })

  it('uses correct preset opacity', () => {
    render(
      <div style={{ width: 100, height: 100, position: 'relative' }}>
        <MatrixRain preset="titlebar" />
      </div>,
    )
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    // titlebar preset opacity = 0.22
    expect(canvas.style.opacity).toBe('0.22')
  })

  it('overrides opacity when explicitly passed', () => {
    render(
      <div style={{ width: 100, height: 100, position: 'relative' }}>
        <MatrixRain opacity={0.5} />
      </div>,
    )
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    expect(canvas.style.opacity).toBe('0.5')
  })
})
