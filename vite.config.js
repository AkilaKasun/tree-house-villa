import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Tells Tailwind to look inside your React components
  ],
  theme: {
    extend: {}, // You can leave this empty since your colors are in index.css!
  },
  plugins: [react(),tailwindcss()],
})
