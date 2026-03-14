import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api/vercel': {
                    target: 'https://api.vercel.com',
                    changeOrigin: true,
                    rewrite: function (path) { return path.replace(/^\/api\/vercel/, ''); },
                    headers: {
                        Authorization: "Bearer ".concat(env.VERCEL_ACCESS_TOKEN),
                    },
                },
            },
        },
    };
});
