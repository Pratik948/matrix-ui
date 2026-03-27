import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'MatrixUI/Avatar',
  component: Avatar,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = { args: { name: 'Linus Torvalds', size: 'md' } }

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '20px' }}>
      <Avatar name="Alan Turing" size="sm" />
      <Avatar name="Alan Turing" size="md" />
      <Avatar name="Alan Turing" size="lg" />
    </div>
  ),
}

export const WithImage: Story = {
  args: { name: 'Linus Torvalds', src: 'https://via.placeholder.com/40', size: 'md' },
}
