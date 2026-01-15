import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadTime } from "./utils";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  wordCount: number;
}

export interface PostWithContent extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Generate excerpt from content (first paragraph)
      const excerptMatch = content.match(/^(.+?)(?:\n\n|$)/s);
      const excerpt = excerptMatch
        ? excerptMatch[1].replace(/^#+\s*/, "").trim().slice(0, 160)
        : "";

      // Calculate word count
      const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;

      return {
        slug: data.slug || slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        excerpt: data.excerpt || excerpt,
        readTime: calculateReadTime(content),
        wordCount,
      };
    });

  // Sort posts by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const posts = getAllPosts();
  const postMeta = posts.find((post) => post.slug === slug);

  if (!postMeta) {
    return null;
  }

  // Find the actual file (might use slug from frontmatter)
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    const fullPath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data.slug === slug || name.replace(/\.mdx$/, "") === slug;
  });

  if (!fileName) {
    return null;
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  return {
    ...postMeta,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
