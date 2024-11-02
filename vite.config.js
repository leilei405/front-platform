import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

export default defineConfig({
  plugins: [vue()],
  // 配置别名
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  }
})
