import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/assets/scss/main.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/plugins': path.resolve(__dirname, 'src/plugins'),
      '@/views': path.resolve(__dirname, 'src/views'),
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/config': path.resolve(__dirname, 'src/config'),
      '@/models': path.resolve(__dirname, 'src/models'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/mixins': path.resolve(__dirname, 'src/mixins'),
      '@/assets': path.resolve(__dirname, 'src/assets')
    }
  },
})
