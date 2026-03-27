import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'MatrixUI/Textarea',
  component: Textarea,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    variant: { control: 'select', options: ['green', 'cyan'] },
    error:   { control: 'boolean' },
    disabled:{ control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story   = { args: { placeholder: 'Enter commit message…', rows: 4 } }
export const Cyan: Story      = { args: { placeholder: 'Commit description…', variant: 'cyan', rows: 4 } }
export const Error: Story     = { args: { error: true, defaultValue: 'Invalid input', rows: 4 } }
export const Disabled: Story  = { args: { disabled: true, placeholder: 'Disabled', rows: 4 } }
