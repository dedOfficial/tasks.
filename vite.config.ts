
import preact from '@preact/preset-vite'
import { UserConfig } from 'vite'

// https://vitejs.dev/config/
export default {
  plugins: [preact()],
  resolve: {
    alias: [{find: '@/', replacement: '/src/'}]
  }
} satisfies UserConfig
