import type { Meta, StoryObj } from '@storybook/react'
import { ContextMenu } from './ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'MatrixUI/ContextMenu',
  component: ContextMenu,
  parameters: { backgrounds: { default: 'matrix' } },
}
export default meta
type Story = StoryObj<typeof ContextMenu>

const sampleItems = [
  { type: 'action' as const,    label: 'Open in editor', icon: '✎', onClick: () => alert('Open') },
  { type: 'action' as const,    label: 'Copy path',      icon: '⎘', onClick: () => alert('Copy') },
  { type: 'separator' as const },
  { type: 'action' as const,    label: 'Stage file',     icon: '+', onClick: () => alert('Stage') },
  { type: 'action' as const,    label: 'Discard changes',icon: '↩', danger: true, onClick: () => alert('Discard') },
]

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px', color: '#00ff41', fontFamily: 'monospace' }}>
      <ContextMenu items={sampleItems}>
        <div style={{ border: '1px solid #002800', padding: '12px 16px', cursor: 'context-menu', display: 'inline-block' }}>
          Right-click this element
        </div>
      </ContextMenu>
    </div>
  ),
}
