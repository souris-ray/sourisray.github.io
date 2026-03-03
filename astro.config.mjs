import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://souris-ray.github.io',
  base: '/',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    icon({
      include: {
        // Phosphor icons (already used via CDN — having them local too is optional)
        ph: ['*'],
        // Simple Icons: brand logos (GitHub, Discord, X/Twitter, YouTube, etc.)
        'simple-icons': ['*'],
      },
    }),
  ],
});
