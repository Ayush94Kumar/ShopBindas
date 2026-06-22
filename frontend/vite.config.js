import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Add this line. Replace 'shopbindas' with your exact GitHub repository name
  base: '/ShopBindas/', 
})
// export default defineConfig({
//   plugins: [tailwindcss()],
// })