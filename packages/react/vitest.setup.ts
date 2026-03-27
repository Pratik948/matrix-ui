import '@testing-library/jest-dom'

// Mock HTMLCanvasElement.getContext for jsdom (canvas is not supported)
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = () => null
}

// Mock ResizeObserver — not available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe()    { /* noop */ }
  unobserve()  { /* noop */ }
  disconnect() { /* noop */ }
}

// Mock requestAnimationFrame / cancelAnimationFrame
global.requestAnimationFrame  = (cb: FrameRequestCallback) => setTimeout(cb, 16) as unknown as number
global.cancelAnimationFrame   = (id: number) => clearTimeout(id)
