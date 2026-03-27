import type { Meta, StoryObj } from '@storybook/react'
import { Panel } from './Panel'

const meta: Meta<typeof Panel> = {
  title: 'MatrixUI/Panel',
  component: Panel,
  parameters: {
    backgrounds: { default: 'matrix' },
  },
}
export default meta
type Story = StoryObj<typeof Panel>

export const Default: Story = {
  args: {
    children: <div style={{ padding: 16, color: '#00ff41' }}>Panel content</div>,
    style: { width: 300, height: 200 },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {(['diff', 'sidebar', 'commitPanel', 'modal', 'titlebar', 'history'] as const).map((p) => (
        <Panel key={p} rain={{ preset: p }} style={{ height: 120 }}>
          <div style={{ padding: 12, color: '#00ff41', fontSize: 11 }}>{p}</div>
        </Panel>
      ))}
    </div>
  ),
}

export const LowOpacity: Story = {
  args: {
    bgOpacity: 0.3,
    children: <div style={{ padding: 16, color: '#00ff41' }}>Low bg opacity — rain shows through</div>,
    style: { width: 300, height: 200 },
  },
}
