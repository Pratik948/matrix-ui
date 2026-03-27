import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'MatrixUI/Badge',
  component: Badge,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    variant: { control: 'select', options: ['synced', 'ahead', 'modified', 'behind', 'count'] },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story   = { args: { variant: 'synced' } }
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '20px' }}>
      <Badge variant="synced" />
      <Badge variant="ahead" />
      <Badge variant="modified" />
      <Badge variant="behind" />
      <Badge variant="count" count={3} />
    </div>
  ),
}
