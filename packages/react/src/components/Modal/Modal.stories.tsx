import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { Button } from '../Button'

const meta: Meta<typeof Modal> = {
  title: 'MatrixUI/Modal',
  component: Modal,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm Merge" {...(size !== undefined ? { size } : {})}>
        <p style={{ color: '#00cc44', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: 1.5 }}>
          Are you sure you want to merge <strong style={{ color: '#00ff41' }}>feat/dark-mode</strong> into <strong style={{ color: '#00ff41' }}>main</strong>?
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Merge</Button>
        </div>
      </Modal>
    </div>
  )
}

export const Default: Story = { render: () => <ModalDemo /> }
export const Large: Story   = { render: () => <ModalDemo size="lg" /> }
export const Small: Story   = { render: () => <ModalDemo size="sm" /> }
