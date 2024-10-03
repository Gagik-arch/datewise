import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
    publicDir: './public',
    server: {
        port: process.env.PORT as unknown as number,
    },
    plugins: [vercel()],
});
