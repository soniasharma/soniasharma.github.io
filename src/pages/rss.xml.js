import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      categories: p.data.tags,
      link: `/blog/${p.slug}/`,
    })),
  });
}
