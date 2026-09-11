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

I've been meaning to start writing publicly for several years. The blocker was never the writing. It was that every time I sat down to start, I'd fall into an afternoon of comparing platforms, and then the afternoon would end and I'd have nothing. Thanks to AI — specifically working with Claude — I finally broke through this analysis paralysis.

So this time I gave myself a constraint: pick the setup I'd have to think about least, get one post out, and never touch the infrastructure again unless it's actually broken.

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

## What I deliberately skipped

Comments. Analytics. A newsletter signup form. Tags-as-pages. Dark mode toggle (the CSS just respects your system setting). A photo of me looking thoughtfully off-camera.

Every one of those is a small ongoing obligation, and I have zero posts. The correct amount of infrastructure for zero posts is almost none. I'll add things when something is actually missing, which is a much better signal than "other blogs have it."

## What I'll write about

I'll be writing across the spectrum of what captures my curiosity: the evolving landscape of AI and machine learning, my current area of speaciality; the pursuit of physical well-being through yoga, strength training, and energy work;  the adventures and insights that come from exploring the world around me; and the deeper questions of mind and spirituality. It's an intentionally broad canvas — because the most interesting connections often happen at the intersections.

If that sounds interesting, the [RSS feed](/rss.xml) is right there.

<!-- linkedin -->
I've been meaning to start writing publicly for about three years. The blocker was never the writing — it was that every attempt turned into an afternoon of comparing blogging platforms, and then the afternoon ended and I had nothing.

This time I gave myself one constraint and it dissolved the whole problem: the original version of every post lives in a git repo I own.

Everything else follows from that.

• Medium, Substack, LinkedIn stop being platforms I commit to and become places I echo. No writing is trapped in someone else's editor.

• The stack gets boring on purpose: markdown files, a static site generator, free hosting, deploy on git push. No CMS to babysit.

• One thing worth getting right: if you republish elsewhere without a canonical link back, search engines may treat the *copy* as the original and your site as the duplicate. Medium's "Import a story" handles this; pasting the text does not.

I shipped it in under an hour, which is roughly 1% of the time I'd already spent thinking about shipping it.
<!-- /linkedin -->
