import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Titlebar } from './Titlebar'

describe('Titlebar', () => {
  it('renders app name', () => {
    render(<Titlebar appName="GITMATRIX" />)
    expect(screen.getByText('GITMATRIX')).toBeInTheDocument()
  })

  it('renders version when provided', () => {
    render(<Titlebar version="v1.0.0" />)
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
  })

  it('renders menu items', () => {
    const items = [{ label: 'File' }, { label: 'View' }]
    render(<Titlebar menuItems={items} />)
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('View')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<Titlebar onClose={onClose} />)
    fireEvent.click(screen.getByText('×'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('has data-matrixui-titlebar attribute', () => {
    render(<Titlebar />)
    expect(document.querySelector('[data-matrixui-titlebar]')).toBeInTheDocument()
  })

  it('has data-tauri-drag-region attribute', () => {
    render(<Titlebar />)
    expect(document.querySelector('[data-tauri-drag-region]')).toBeInTheDocument()
  })
})
