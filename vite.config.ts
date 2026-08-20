import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static build: the output of `npm run build` is a plain dist/ folder that can be
// uploaded to S3 and served through CloudFront. No server runtime is required.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
