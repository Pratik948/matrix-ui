import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'MatrixUI/Switch',
  component: Switch,
  parameters: { backgrounds: { default: 'matrix' } },
}
export default meta
type Story = StoryObj<typeof Switch>

const Controlled = (props: { label?: string; disabled?: boolean }) => {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onChange={setChecked} {...props} style={{ padding: '20px' }} />
}

export const Default: Story        = { render: () => <Controlled /> }
export const WithLabel: Story      = { render: () => <Controlled label="Auto-fetch" /> }
export const CheckedState: Story   = { render: () => <Switch checked={true}  onChange={() => undefined} label="Enabled" style={{ padding: '20px' }} /> }
export const UncheckedState: Story = { render: () => <Switch checked={false} onChange={() => undefined} label="Disabled" style={{ padding: '20px' }} /> }
export const Disabled: Story       = { render: () => <Switch checked={false} onChange={() => undefined} disabled label="Cannot toggle" style={{ padding: '20px' }} /> }
