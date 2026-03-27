import type { Meta, StoryObj } from '@storybook/react'
import { DiffLine } from './DiffLine'

const meta: Meta<typeof DiffLine> = {
  title: 'MatrixUI/DiffLine',
  component: DiffLine,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    type: { control: 'select', options: ['added', 'removed', 'neutral'] },
  },
}
export default meta
type Story = StoryObj<typeof DiffLine>

export const Default: Story  = { args: { type: 'added', content: 'const greeting = "hello world"', lineNo: 1 } }
export const AllTypes: Story = {
  render: () => (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <DiffLine type="neutral" content="import React from 'react'"          lineNo={1} />
      <DiffLine type="neutral" content=""                                    lineNo={2} />
      <DiffLine type="removed" content="export const greeting = 'hello'"   lineNo={3} />
      <DiffLine type="added"   content="export const greeting = 'hi there'" lineNo={3} />
      <DiffLine type="neutral" content=""                                    lineNo={4} />
    </div>
  ),
}
