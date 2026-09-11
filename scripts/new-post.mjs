#!/usr/bin/env node
// Usage: npm run new -- "My Post Title"
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');

const date = new Date().toISOString().slice(0, 10);
const path = join('src/content/blog', `${slug}.md`);

if (existsSync(path)) {
  console.error(`Already exists: ${path}`);
  process.exit(1);
}

writeFileSync(
  path,
  `---
title: "${title}"
description: "One sentence that makes someone want to read this."
pubDate: ${date}
tags: []
draft: true
crosspost:
  linkedin: true
  medium: true
  substack: true
---

Write here.
`
);

console.log(`Created ${path}`);
console.log('Set draft: false when you are ready to publish.');
