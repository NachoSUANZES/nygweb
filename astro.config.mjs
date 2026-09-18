import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nyginvest.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
});
