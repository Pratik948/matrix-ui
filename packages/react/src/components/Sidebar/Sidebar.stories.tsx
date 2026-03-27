import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { Button } from '../Button'
import { Badge } from '../Badge'

const meta: Meta<typeof Sidebar> = {
  title: 'MatrixUI/Sidebar',
  component: Sidebar,
  parameters: { backgrounds: { default: 'matrix' } },
}
export default meta
type Story = StoryObj<typeof Sidebar>

function RepoRow({ name, status }: { name: string; status: 'synced' | 'ahead' | 'modified' | 'behind' }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:    '10px 14px',
        background: hovered ? '#001200' : 'transparent',
        cursor:     'pointer',
        borderLeft: '2px solid transparent',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize:   '11px',
        color:      '#00cc44',
        letterSpacing: '0.04em',
      }}
    >
      <span>{name}</span>
      <Badge variant={status} />
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <Sidebar header="REPOSITORIES" footer={<Button variant="ghost" size="sm" style={{ width: '100%' }}>+ Add Repository</Button>}>
        <RepoRow name="matrix-ui"      status="synced" />
        <RepoRow name="gitmatrix-app"  status="ahead" />
        <RepoRow name="token-studio"   status="modified" />
        <RepoRow name="old-project"    status="behind" />
      </Sidebar>
    </div>
  ),
}
