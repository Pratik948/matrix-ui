import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'MatrixUI/Tag',
  component: Tag,
  parameters: { backgrounds: { default: 'matrix' } },
  argTypes: {
    variant: { control: 'select', options: ['lang', 'version', 'branch'] },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story    = { args: { variant: 'branch', label: 'main' } }
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '20px' }}>
      <Tag variant="lang"    label="TypeScript" language="TypeScript" />
      <Tag variant="lang"    label="Python"     language="Python" />
      <Tag variant="lang"    label="Rust"       language="Rust" />
      <Tag variant="version" label="1.0.0" />
      <Tag variant="branch"  label="main" />
      <Tag variant="branch"  label="feat/dark-mode" />
    </div>
  ),
}
