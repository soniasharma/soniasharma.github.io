---
title: "How I Built This Blog"
description: "A static site, a GitHub repo, and a rule about where the original lives. Under an hour, and no CMS to babysit."
pubDate: 2026-09-08
tags: ["meta", "writing", "tools"]
draft: false
crosspost:
  linkedin: true
  medium: true
  substack: true
---

I've been meaning to start writing publicly for several years. I had plenty to say about AI and machine learning, health and wellness, spirituality — a broad spectrum of interests that didn't fit neatly into any single platform. What I really wanted was my own home base, with GitHub as the source of truth. But every time I sat down to build it, I'd fall into an afternoon of comparing platforms and tools, and then the afternoon would end and I'd have nothing. Thanks to AI — specifically working with Claude — I finally broke through that analysis paralysis.

So this time I gave myself a simple constraint: build infrastructure so seamless and easy to maintain that I can spend my energy writing, not debugging. Set it up once, then forget about it.

Here's what I landed on and why.

## The one decision that mattered

Not the framework. Not the theme. It was this: **the original version of every post lives in a git repo I own.**

Everything else falls out of that. If the canonical copy is a markdown file in my own repo, then Medium and LinkedIn and a newsletter aren't places I publish — they're places I *echo*. Nothing I write is trapped in someone's editor. If a platform changes its terms, gets acquired, or quietly deletes my drafts, I lose distribution, not work.

That reframe also killed the platform comparison paralysis, because the question stopped being "which one do I commit to" and became "which ones do I bother mirroring to."

## The stack

- **[Astro](https://astro.build)** for the site. It builds markdown into plain HTML and ships almost no JavaScript. A blog is documents, not an application, and Astro is one of the few modern tools that seems to agree.
- **GitHub Pages** for hosting. Free, and the repo is already there.
- **GitHub Actions** to build and deploy on every push to `main`.

The whole publishing flow is now:

```bash
npm run new -- "Some Post Title"   # creates the markdown file
# ...write...
git commit -am "new post" && git push
```

Two minutes later it's live. There's no CMS, no database, no admin login, no dashboard. The failure modes of this setup are "I wrote bad YAML" and "GitHub is down," and I'm at peace with both.

## How the build pipeline actually works

Here's what happens under the hood so you're not confused like I was:

**Astro's job:** It's a *static site generator*. It reads your markdown files and converts them to plain HTML. That's it. No server running, no database queries, no JavaScript overhead — just files.

**The workflow:**

```
1. You write in markdown
       ↓
2. Git push to GitHub
       ↓
3. GitHub Actions triggers automatically
       ↓
4. Astro runs: npm run build
   Converts all .md files to HTML in the /dist folder
       ↓
5. GitHub Pages serves the /dist folder
   Site is live at soniasharma.github.io
```

**Why Astro, not a CMS?** A CMS (WordPress, Ghost, etc.) runs a server that generates pages on-demand. Astro generates all pages *once* at build time. The result is faster, cheaper (free hosting), and simpler — your blog is just static files. It's the right tool when your content doesn't change a thousand times a day.

**The RSS feed, the sitemap, all of it** — Astro generates those too. You push markdown, GitHub Actions runs the build, Astro outputs everything, and GitHub Pages serves it. One command. No thinking required.

## Cross-posting without wrecking your SEO

This is the part I actually had to look up, so I'll save you the search.

If you publish the same text on your site and on Medium, search engines have to decide which one is the real page. Left alone, they'll usually pick the one with more authority — which is Medium, not you. Your own post gets treated as the duplicate. That's a bad trade for the person who did the writing.

The fix is a `rel="canonical"` tag pointing back at your version. It's a one-line signal that says *this is a copy, credit the original*. Handling per platform:

| Platform | How to keep the canonical |
| --- | --- |
| Medium | Use **Import a story** and paste your post's URL. Medium sets the canonical tag for you. Pasting the text manually does not. |
| Substack | Set the canonical URL in the post's SEO settings, or just add a line at the top linking home. |
| LinkedIn | Don't republish the whole thing. LinkedIn articles don't pass canonical properly and native posts outperform links anyway. Write a short native version and link out at the end. |

I wrote a small script that takes a post slug and spits out three files — a Medium version, a Substack version, and a much shorter LinkedIn one with the link at the bottom. It doesn't auto-publish anything. I don't want a robot posting in my name; I want the copy-paste to take ten seconds instead of ten minutes.

**The workflow:**

```bash
npm run crosspost -- post-slug-name
```

This generates three files in `out/post-slug-name/`. Then:

- **Medium:** Go to https://medium.com/p/import, paste your post's URL (`soniasharma.github.io/blog/post-slug-name/`). Medium imports it and sets the canonical tag for you.
- **Substack:** Paste the markdown, then set Canonical URL in post settings.
- **LinkedIn:** Paste as a native post (not an article), include the link at the end.

Each platform sees a canonical tag pointing back to your site. You're in control, you keep the original, and you get the distribution.

## What I deliberately skipped

Comments. Analytics. A newsletter signup form. Tags-as-pages. Dark mode toggle (the CSS just respects your system setting). A photo of me looking thoughtfully off-camera.

Every one of those is a small ongoing obligation, and I have zero posts. The correct amount of infrastructure for zero posts is almost none. I'll add things when something is actually missing, which is a much better signal than "other blogs have it."

## What I'll write about

I'll be writing across the spectrum of what captures my curiosity: the evolving landscape of AI and machine learning, my current area of speaciality; the pursuit of physical well-being through yoga, strength training, and energy work;  the adventures and insights that come from exploring the world around me; and the deeper questions of mind and spirituality. It's an intentionally broad canvas — because the most interesting connections often happen at the intersections.

If that sounds interesting, the [RSS feed](/rss.xml) is right there.
