import million from 'million/compiler';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
  display: 'standalone',
  display_override: ['window-controls-overlay'],
  orientation: 'portrait',
  lang: 'en',
  name: 'Taskmotion',
  short_name: 'Taskmotion',
  theme_color: '#0f0f0f',
  background_color: '#0f0f0f',
  icons: [
    {
      src: 'favicon-64x64.png',
      sizes: '64x64',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'favicon-128x128.png',
      sizes: '128x128',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'favicon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [react()]
      : [
          million.vite({ auto: true }),
          react(),
          VitePWA({
            manifest,
            registerType: 'autoUpdate',
            workbox: {
              cacheId: 'taskmotionv1.3.2',
              cleanupOutdatedCaches: true,
            },
          }),
        ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
