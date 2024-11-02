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
  },

  // 代理配置
  server: {
    proxy: {
      // 代理所有 /api 开头的请求
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club',
        // 跨域
        changeOrigin: true
      }
    }
  }
})
