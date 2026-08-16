import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  env: {
    schema: {
      SOURCE_COMMIT: { type: 'string', context: 'server', access: 'public', default: 'unknown' },
    },
  },
  output: 'static',
  site: 'https://druckersmart.com',
  integrations: [sitemap()],
});
