import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'MatrixUI/Button',
  component: Button,
  parameters: {
    backgrounds: { default: 'matrix' },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost', 'danger', 'cyan'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled:{ control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = { args: { children: 'Commit', variant: 'primary', size: 'md' } }

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '20px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="cyan">Cyan</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '20px' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '20px' }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
}
