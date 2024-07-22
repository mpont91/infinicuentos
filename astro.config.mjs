import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel/serverless';
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), db()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});