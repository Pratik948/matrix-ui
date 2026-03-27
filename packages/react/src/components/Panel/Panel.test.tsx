import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Panel } from './Panel'

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

describe('Panel', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Panel style={{ width: 200, height: 200 }}>
        <span>hello</span>
      </Panel>,
    )
    expect(getByText('hello')).toBeTruthy()
  })

  it('applies data-matrixui-panel attribute', () => {
    const { container } = render(
      <Panel style={{ width: 200, height: 200 }}>content</Panel>,
    )
    expect(container.querySelector('[data-matrixui-panel]')).toBeTruthy()
  })

  it('renders a MatrixRain canvas', () => {
    const { container } = render(
      <Panel style={{ width: 200, height: 200 }}>content</Panel>,
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })

  it('passes rain preset through to MatrixRain', () => {
    const { container } = render(
      <Panel rain={{ preset: 'sidebar' }} style={{ width: 200, height: 200 }}>
        content
      </Panel>,
    )
    expect(container.querySelector('[data-matrixui-matrix-rain]')).toBeTruthy()
  })
})
