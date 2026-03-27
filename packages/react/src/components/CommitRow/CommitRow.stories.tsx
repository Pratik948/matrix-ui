import type { Meta, StoryObj } from '@storybook/react'
import { CommitRow } from './CommitRow'

const meta: Meta<typeof CommitRow> = {
  title: 'MatrixUI/CommitRow',
  component: CommitRow,
  parameters: { backgrounds: { default: 'matrix' } },
}
export default meta
type Story = StoryObj<typeof CommitRow>

export const Default: Story = {
  args: {
    author:    'Linus Torvalds',
    message:   'Initial commit: add kernel panic handler',
    hash:      'c0ffee1234567890',
    time:      '2h ago',
    fileCount: 4,
  },
}

export const CommitList: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <CommitRow author="Linus Torvalds"  message="Fix null pointer in block device driver"   hash="abc1234" time="1h ago"  fileCount={2} />
      <CommitRow author="Ada Lovelace"    message="Add analytical engine integration tests"    hash="def5678" time="3h ago"  fileCount={8} />
      <CommitRow author="Alan Turing"     message="Implement halting problem workaround"       hash="fab9012" time="1d ago"  fileCount={1} />
      <CommitRow author="Grace Hopper"    message="Remove bug (literally found a moth in relay)" hash="345abc" time="2d ago" fileCount={1} />
    </div>
  ),
}
