import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders children', () => {
    render(<Sidebar><div>Repo list</div></Sidebar>)
    expect(screen.getByText('Repo list')).toBeInTheDocument()
  })

  it('renders header when provided', () => {
    render(<Sidebar header="REPOSITORIES"><div>list</div></Sidebar>)
    expect(screen.getByText('REPOSITORIES')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(<Sidebar footer={<button>Add</button>}><div>list</div></Sidebar>)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('has data-matrixui-sidebar attribute', () => {
    render(<Sidebar><div>list</div></Sidebar>)
    expect(document.querySelector('[data-matrixui-sidebar]')).toBeInTheDocument()
  })
})
