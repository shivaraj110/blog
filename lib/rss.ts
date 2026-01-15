interface PostData {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

interface RSSConfig {
  title: string;
  description: string;
  siteUrl: string;
  authorName: string;
  authorEmail?: string;
}

const defaultConfig: RSSConfig = {
  title: "Shivaraj's Blog",
  description: "Thoughts on Linux, web development, and tech adventures",
  siteUrl: "https://blog.shivaraj110.com",
  authorName: "Shivaraj",
};

/**
 * Generate RSS 2.0 feed XML from blog posts
 */
export function generateRSSFeed(
  posts: PostData[],
  config: Partial<RSSConfig> = {}
): string {
  const cfg = { ...defaultConfig, ...config };

  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const stripMdx = (content: string): string => {
    return content
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/`[^`]*`/g, "") // Remove inline code
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Convert links to text
      .replace(/[#*_~]/g, "") // Remove markdown formatting
      .trim();
  };

  const items = posts
    .map((post) => {
      const description = stripMdx(post.content).slice(0, 300) + "...";
      const link = `${cfg.siteUrl}/post/${post.slug}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(cfg.title)}</title>
    <link>${cfg.siteUrl}</link>
    <description>${escapeXml(cfg.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${cfg.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>${cfg.authorEmail || ""}${cfg.authorName ? ` (${cfg.authorName})` : ""}</managingEditor>
${items}
  </channel>
</rss>`;
}

/**
 * Generate Atom feed XML from blog posts
 */
export function generateAtomFeed(
  posts: PostData[],
  config: Partial<RSSConfig> = {}
): string {
  const cfg = { ...defaultConfig, ...config };

  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const stripMdx = (content: string): string => {
    return content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#*_~]/g, "")
      .trim();
  };

  const entries = posts
    .map((post) => {
      const summary = stripMdx(post.content).slice(0, 300) + "...";
      const link = `${cfg.siteUrl}/post/${post.slug}`;
      const date = new Date(post.date).toISOString();

      return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${link}"/>
    <id>${link}</id>
    <updated>${date}</updated>
    <summary>${escapeXml(summary)}</summary>
    ${post.tags.map((tag) => `<category term="${escapeXml(tag)}"/>`).join("\n    ")}
  </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(cfg.title)}</title>
  <link href="${cfg.siteUrl}"/>
  <link href="${cfg.siteUrl}/atom.xml" rel="self"/>
  <updated>${new Date().toISOString()}</updated>
  <id>${cfg.siteUrl}/</id>
  <author>
    <name>${escapeXml(cfg.authorName)}</name>
  </author>
${entries}
</feed>`;
}
