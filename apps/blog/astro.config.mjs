import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
  outDir: '../../dist/apps/blog',
  integrations: [
    mdx(),
    react(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['typeface-work-sans', 'typeface-quattrocento-sans'],
    },
  },
});
