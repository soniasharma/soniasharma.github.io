# Blog setup — zero to live

Everything here is done once. Budget about 30 minutes.

---

## 1. Prerequisites

You need Node 20+ and git. Check:

```bash
node -v    # should be v20 or higher
git --version
```

If Node is missing: install from https://nodejs.org (LTS) or `brew install node` on a Mac.

---

## 2. Create the GitHub repo

Sign in to your **personal** GitHub account (not your work one) and create a new repo.

**Name it `<your-username>.github.io`** — for example `soniasharma.github.io`.

That exact name is special: GitHub serves it at the root of your username, so your
site will be `https://<your-username>.github.io` with no `/blog` suffix. Make it
**public** (Pages is free only for public repos on the free plan). Don't add a
README, .gitignore, or license — this folder already has what it needs.

---

## 3. Fill in your details

Two files have placeholders. Open them and replace `YOUR-GITHUB-USERNAME`:

**`src/site.ts`** — your name, tagline, and links:

```ts
export const site = {
  title: 'Sonia Sharma',
  tagline: '...',
  url: 'https://soniasharma.github.io',   // ← your URL
  links: {
    github: 'https://github.com/soniasharma',
    linkedin: 'https://www.linkedin.com/in/soniasharma',
  },
};
```

**`astro.config.mjs`** — the same URL:

```js
export const SITE = 'https://soniasharma.github.io';
export const BASE = '/';
```

> If you named the repo something other than `<username>.github.io` — say, just
> `blog` — then set `BASE = '/blog'` and leave `SITE` as
> `https://<username>.github.io`.

---

## 4. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:4321. You should see the site with the first post on it.
Edit any file and the browser reloads.

Stop the server with `Ctrl+C`.

---

## 5. Push it up

```bash
git init
git add .
git commit -m "Start the blog"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

---

## 6. Turn on GitHub Pages

In the repo on github.com:

**Settings → Pages → Build and deployment → Source: `GitHub Actions`**

That's the only setting to change. Do *not* pick "Deploy from a branch."

Now go to the **Actions** tab. A workflow should be running. When it goes green
(about a minute), your site is live at `https://<your-username>.github.io`.

If it isn't running, push any small change — the workflow triggers on push to `main`.

---

## 7. Write your next post

```bash
npm run new -- "The Title Of My Post"
```

That creates `src/content/blog/the-title-of-my-post.md` with the frontmatter
filled in and `draft: true`.

Write. When you're ready, set `draft: false`, then:

```bash
git add . && git commit -m "New post" && git push
```

Drafts never appear on the site or in the RSS feed, so you can safely commit
half-finished posts.

---

## 8. Cross-posting

Run this after a post is live:

```bash
npm run crosspost -- the-title-of-my-post
```

It writes three files into `out/the-title-of-my-post/`. Nothing gets published
automatically — you review and paste.

### Medium
Don't paste the markdown. Instead:

1. Go to https://medium.com/p/import
2. Paste your post's URL (`https://<username>.github.io/blog/<slug>/`)
3. Medium pulls the content **and sets the canonical tag back to your site**

That canonical tag is the whole game. Without it, Google may treat Medium's copy
as the original and yours as the duplicate. Use `out/<slug>/medium.md` only if
the importer chokes on something.

### Substack
Paste `out/<slug>/substack.md` into a new Substack post. Then open the post's
settings and set the **canonical URL** field to your site's URL for that post.

If you'd rather not maintain a separate Substack, you can skip it entirely — your
site already publishes an RSS feed at `/rss.xml`, and readers can subscribe to
that.

### LinkedIn
Paste `out/<slug>/linkedin.txt` as a **native post**, not an article.

By default the script auto-extracts a rough draft and labels it as such. To get a
good one, write the LinkedIn version yourself inside the post file, wrapped in
these markers:

```markdown
<!-- linkedin -->
Your hook line goes here.

The three-bullet version of the argument.
<!-- /linkedin -->
```

That block is stripped from the website and from the Medium/Substack copies — it
only ever shows up in `linkedin.txt`. The first post has one you can crib from.

Two things that matter on LinkedIn:
- Put the link on its own line at the very end. The feed suppresses posts that
  lead with an external link.
- The first two lines are all anyone sees before "…see more." Make them earn the
  click.

---

## Optional, later

**Custom domain.** Buy one, add a `public/CNAME` file containing just the domain,
point a CNAME DNS record at `<username>.github.io`, then update `SITE` in
`astro.config.mjs` and `url` in `src/site.ts`. Enable "Enforce HTTPS" in
Settings → Pages.

**Dev.to or Hashnode.** Both can auto-import from your RSS feed with canonical
links intact — genuinely zero-effort cross-posting once configured. Worth adding
if you want reach without more manual steps.

**Comments.** [giscus](https://giscus.app) uses GitHub Discussions and is a
single script tag. Add it if people actually start replying by email.

---

## File map

```
astro.config.mjs              site URL + base path
src/site.ts                   your name, tagline, links
src/content/config.ts         frontmatter schema (what fields a post can have)
src/content/blog/*.md         your posts
src/layouts/Base.astro        page shell, header, footer
src/layouts/Post.astro        post wrapper (title, date, tags)
src/pages/index.astro         homepage
src/pages/blog/index.astro    post archive
src/pages/about.astro         about page — edit this
src/pages/rss.xml.js          RSS feed
src/styles/global.css         all the styling, one file
scripts/new-post.mjs          npm run new
scripts/crosspost.mjs         npm run crosspost
.github/workflows/deploy.yml  build + deploy on push
```
