import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories:   ['../packages/react/src/**/*.stories.@(ts|tsx)'],
  addons:    ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@matrixui/tokens': resolve(__dirname, '../packages/tokens/src/index.ts'),
      '@matrixui/react':  resolve(__dirname, '../packages/react/src/index.ts'),
    }
    return config
  },
}

export default config
