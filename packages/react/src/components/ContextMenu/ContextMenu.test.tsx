import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ContextMenu } from './ContextMenu'

const items = [
  { type: 'action' as const, label: 'Open', onClick: () => undefined },
  { type: 'separator' as const },
  { type: 'action' as const, label: 'Delete', danger: true, onClick: () => undefined },
]

describe('ContextMenu', () => {
  it('does not show menu by default', () => {
    render(
      <ContextMenu items={items}>
        <div>Right-click me</div>
      </ContextMenu>
    )
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
  })

  it('shows menu on right-click', () => {
    render(
      <ContextMenu items={items}>
        <div>Right-click me</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText('Right-click me'))
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('closes on Escape key', () => {
    render(
      <ContextMenu items={items}>
        <div>Right-click me</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText('Right-click me'))
    expect(screen.getByText('Open')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByText('Open')).not.toBeInTheDocument()
  })
})
