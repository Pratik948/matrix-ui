import type { Meta, StoryObj } from '@storybook/react'
import { Titlebar } from './Titlebar'

const meta: Meta<typeof Titlebar> = {
  title: 'MatrixUI/Titlebar',
  component: Titlebar,
  parameters: { backgrounds: { default: 'matrix' } },
}
export default meta
type Story = StoryObj<typeof Titlebar>

const menuItems = [
  { label: 'File',       onClick: () => undefined },
  { label: 'Repository', onClick: () => undefined },
  { label: 'Branch',     onClick: () => undefined },
  { label: 'View',       onClick: () => undefined },
  { label: 'Help',       onClick: () => undefined },
]

export const Default: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <Titlebar
        appName="GITMATRIX"
        version="v1.0.0"
        menuItems={menuItems}
        onMinimize={() => undefined}
        onMaximize={() => undefined}
        onClose={() => undefined}
      />
    </div>
  ),
}
