import { generateRSSFeed, generateAtomFeed } from "./lib/rss";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const config = {
  title: "Shivaraj's Blog",
  description: "Thoughts on Linux, web development, and tech adventures",
  siteUrl: "https://blog.shivaraj110.com",
  authorName: "Shivaraj",
};

async function getPostsFromMDX(): Promise<PostData[]> {
  const postsDir = join(import.meta.dir, "content/posts");
  const files = await readdir(postsDir);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts: PostData[] = [];

  for (const file of mdxFiles) {
    const filePath = join(postsDir, file);
    const content = await Bun.file(filePath).text();
    const { data, content: mdxContent } = matter(content);

    posts.push({
      slug: data.slug || file.replace(".mdx", ""),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      content: mdxContent,
    });
  }

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function generateSitemap(posts: PostData[]): string {
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    // Homepage
    `  <url>
    <loc>${config.siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    // Blog posts
    ...posts.map(
      (post) => `  <url>
    <loc>${config.siteUrl}/post/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

async function generateFeeds() {
  const posts = await getPostsFromMDX();

  const rss = generateRSSFeed(posts, config);
  const atom = generateAtomFeed(posts, config);
  const sitemap = generateSitemap(posts);

  // Write main feeds to public directory
  await Bun.write("./public/rss.xml", rss);
  await Bun.write("./public/atom.xml", atom);
  await Bun.write("./public/sitemap.xml", sitemap);

  // Generate individual RSS feeds for each post
  const { mkdir } = await import("node:fs/promises");

  for (const post of posts) {
    const postDir = join("./public/post", post.slug);
    await mkdir(postDir, { recursive: true });

    // Generate RSS feed for this specific post
    const postRss = generateRSSFeed([post], {
      ...config,
      title: `${post.title} - Shivaraj's Blog`,
      description: post.content.slice(0, 300).replace(/[#*_~`]/g, "").trim() + "...",
    });

    await Bun.write(join(postDir, "rss.xml"), postRss);
  }

  console.log(`Generated RSS, Atom, and Sitemap (${posts.length} posts)`);
  console.log(`Generated ${posts.length} individual post RSS feeds`);
}

generateFeeds();

