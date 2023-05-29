import { getCollection } from 'astro:content';

export async function getAllPosts() {
  return (await getCollection('posts')).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
}
