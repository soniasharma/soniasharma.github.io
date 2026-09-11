import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Cross-posting metadata
    crosspost: z
      .object({
        linkedin: z.boolean().default(true),
        medium: z.boolean().default(true),
        substack: z.boolean().default(true),
      })
      .default({}),
  }),
});

export const collections = { blog };
