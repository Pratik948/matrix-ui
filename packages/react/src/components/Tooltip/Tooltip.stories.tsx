import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'MatrixUI/Tooltip',
  component: Tooltip,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Push to remote">
        <Button>Push</Button>
      </Tooltip>
    </div>
  ),
}

export const AllPlacements: Story = {
  render: () => (
    <div style={{ padding: '80px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
}
