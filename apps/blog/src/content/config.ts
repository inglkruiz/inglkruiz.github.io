import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    excerpt: z.string(),
  }),
});

export const collections = {
  posts: blogCollection,
};
