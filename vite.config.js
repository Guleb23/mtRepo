import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    outDir: 'dist',  // Явно указываем папку билда
    assetsDir: 'assets',  // Папка для статики
    emptyOutDir: true,  // Очищать папку перед сборкой
  },

})
