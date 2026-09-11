#!/usr/bin/env node
/**
 * Turn a published post into platform-ready versions.
 *
 *   npm run crosspost -- <slug>
 *
 * Writes to out/<slug>/ :
 *   medium.md     — full post, canonical note at top (or just import by URL)
 *   substack.md   — full post, subscribe CTA at the end
 *   linkedin.txt  — short native post with a hook and a link back
 *
 * Nothing is auto-published. You review, then paste.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run crosspost -- <slug>');
  process.exit(1);
}

// Read site URL from src/site.ts without needing a build step.
const siteSrc = readFileSync('src/site.ts', 'utf8');
const SITE_URL = (siteSrc.match(/url:\s*'([^']+)'/) || [])[1] || 'https://example.com';

const path = join('src/content/blog', `${slug}.md`);
if (!existsSync(path)) {
  console.error(`No such post: ${path}`);
  process.exit(1);
}

const raw = readFileSync(path, 'utf8');
const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!m) {
  console.error('Could not parse frontmatter.');
  process.exit(1);
}

const [, fm, rawBody] = m;
// The LinkedIn-only block never appears on the site or in the long-form copies.
const body = rawBody.replace(/<!--\s*linkedin\s*-->[\s\S]*?<!--\s*\/linkedin\s*-->/g, '').trim();
const fullBody = rawBody;
const get = (key) => {
  const hit = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return hit ? hit[1].trim().replace(/^["']|["']$/g, '') : '';
};

const title = get('title');
const description = get('description');
const canonical = `${SITE_URL.replace(/\/$/, '')}/blog/${slug}/`;

const outDir = join('out', slug);
mkdirSync(outDir, { recursive: true });

// ── Medium ────────────────────────────────────────────────
// Best path is Medium's "Import a story" with the canonical URL — it sets the
// canonical tag for you. This file is the fallback for manual paste.
writeFileSync(
  join(outDir, 'medium.md'),
  `# ${title}

*Originally published at [${new URL(canonical).host}](${canonical}).*

${body.trim()}
`
);

// ── Substack ──────────────────────────────────────────────
writeFileSync(
  join(outDir, 'substack.md'),
  `# ${title}

${body.trim()}

---

*This first appeared on [my site](${canonical}). If you'd rather read these in your inbox, subscribe below.*
`
);

// ── LinkedIn ──────────────────────────────────────────────
// If the post contains a hand-written LinkedIn version between
//   <!-- linkedin --> ... <!-- /linkedin -->
// that text is used verbatim. Otherwise we auto-extract a rough draft.
// The hand-written version is always better. Write one.
const authored = fullBody.match(/<!--\s*linkedin\s*-->([\s\S]*?)<!--\s*\/linkedin\s*-->/);

let linkedin;
if (authored) {
  linkedin = `${authored[1].trim()}\n\nFull post: ${canonical}\n`;
} else {
  const paragraphs = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('>'));

  const hook = paragraphs[0] || description;
  const points = paragraphs
    .slice(1, 4)
    .map((p) => `• ${p.split('. ')[0].replace(/[.*_`\[\]]/g, '').trim()}.`);

  linkedin = `${hook}\n\n${points.join('\n\n')}\n\nFull post: ${canonical}\n\n[DRAFT — no <!-- linkedin --> block in the post, so this was auto-extracted. Rewrite the middle before posting.]\n`;
}

writeFileSync(join(outDir, 'linkedin.txt'), linkedin);

console.log(`Wrote:
  ${outDir}/medium.md
  ${outDir}/substack.md
  ${outDir}/linkedin.txt

Canonical URL: ${canonical}

Medium tip: use "Import a story" and paste the canonical URL instead of the
markdown — Medium then sets rel=canonical automatically and Google keeps
crediting your site as the original.`
);
