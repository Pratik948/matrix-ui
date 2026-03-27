import type { Preview } from '@storybook/react'
import { injectMatrixUITokens } from '@matrixui/tokens'

// Inject all CSS custom properties into Storybook
injectMatrixUITokens()

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'matrix',
      values: [{ name: 'matrix', value: '#000000' }],
    },
  },
}

export default preview
