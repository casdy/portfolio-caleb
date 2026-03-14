import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/vercel': {
          target: 'https://api.vercel.com',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/vercel/, ''),
          headers: {
            Authorization: `Bearer ${env.VERCEL_ACCESS_TOKEN}`,
          },
        },
      },
    },
  }
})
