import { getAllPosts, getAllTags } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { HomeClient } from "./HomeClient";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  // Format posts for the client component
  const formattedPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: formatDate(post.date),
    readTime: post.readTime,
    tags: post.tags,
  }));

  return <HomeClient posts={formattedPosts} tags={tags} />;
}
