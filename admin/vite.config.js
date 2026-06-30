import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. Import the Tailwind CSS Vite plugin
import tailwindcss from '@tailwindcss/vite' 

// https://vite.dev/config/
export default defineConfig({
  // 2. Add tailwindcss() to the plugins array
  plugins: [react(), tailwindcss()], 
  server :{port:5174}
})