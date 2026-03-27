import type { Meta, StoryObj } from '@storybook/react'
import { MatrixRain } from './MatrixRain'

const meta: Meta<typeof MatrixRain> = {
  title: 'MatrixUI/MatrixRain',
  component: MatrixRain,
  parameters: {
    backgrounds: { default: 'matrix' },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100%', height: '400px', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof MatrixRain>

export const Default: Story = {
  args: { preset: 'diff' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, height: 400 }}>
      {(['titlebar', 'sidebar', 'diff', 'modal', 'commitPanel', 'history'] as const).map((p) => (
        <div key={p} style={{ position: 'relative', background: '#000', minHeight: 120 }}>
          <MatrixRain preset={p} />
          <span style={{ position: 'absolute', bottom: 4, left: 4, color: '#00ff41', fontSize: 10 }}>{p}</span>
        </div>
      ))}
    </div>
  ),
}

export const Titlebar: Story  = { args: { preset: 'titlebar' } }
export const Sidebar: Story   = { args: { preset: 'sidebar' } }
export const Modal: Story     = { args: { preset: 'modal' } }
export const CommitPanel: Story = { args: { preset: 'commitPanel' } }
