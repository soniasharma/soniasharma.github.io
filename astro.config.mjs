import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ── EDIT ME ───────────────────────────────────────────────
// After you create the repo, set these two lines.
//
//  • Repo named  <username>.github.io  → site: 'https://<username>.github.io', base: '/'
//  • Repo named  blog                  → site: 'https://<username>.github.io', base: '/blog'
//  • Custom domain later               → site: 'https://yourdomain.com',       base: '/'
export const SITE = 'https://soniasharma.github.io';
export const BASE = '/';
// ──────────────────────────────────────────────────────────

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark', wrap: true },
  },
});
