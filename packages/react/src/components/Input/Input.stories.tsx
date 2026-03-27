import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'MatrixUI/Input',
  component: Input,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    variant: { control: 'select', options: ['green', 'cyan'] },
    error:   { control: 'boolean' },
    disabled:{ control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Type here…', variant: 'green' } }
export const Cyan: Story    = { args: { placeholder: 'Commit message…', variant: 'cyan' } }
export const Error: Story   = { args: { placeholder: 'Invalid value', error: true, value: 'bad input', readOnly: true } }
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } }
