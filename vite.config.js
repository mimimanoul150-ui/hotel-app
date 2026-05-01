import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ou vue, selon ton projet

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'neurotic-neglector-disregard.ngrok-free.dev'
    ]
  }
})