import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { PostHeader } from "@/components/PostHeader";
import { MDXContent } from "./MDXContent";

const SITE_URL = "https://blog.shivaraj110.com";
const OG_IMAGE = "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVR03to18aupHxIdmj9WvyiofM5sPS1gAGDBJ";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const postUrl = `${SITE_URL}/post/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Shivaraj", url: "https://shivaraj110.com" }],
    creator: "Shivaraj",
    publisher: "Shivaraj",
    keywords: [...post.tags, "blog", "tech", "programming", "Shivaraj"],
    category: post.tags[0] || "Technology",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Shivaraj's Blog",
      locale: "en_US",
      type: "article",
      publishedTime,
      modifiedTime: publishedTime,
      authors: ["Shivaraj"],
      tags: post.tags,
      section: post.tags[0] || "Technology",
      images: [
        {
          url: OG_IMAGE,
          secureUrl: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@shivaraj_does",
      creator: "@shivaraj_does",
      title: post.title,
      description: post.excerpt,
      images: {
        url: OG_IMAGE,
        alt: post.title,
      },
    },
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD structured data for blog post
function generateJsonLd(post: NonNullable<ReturnType<typeof getPostBySlug>>) {
  const postUrl = `${SITE_URL}/post/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  // BlogPosting schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: OG_IMAGE,
    url: postUrl,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Person",
      name: "Shivaraj",
      url: "https://shivaraj110.com",
      sameAs: [
        "https://github.com/shivaraj110",
        "https://x.com/shivaraj_does",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Shivaraj",
      url: "https://shivaraj110.com",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: post.tags[0] || "Technology",
    wordCount: post.wordCount,
    timeRequired: post.readTime.replace(" read", ""),
    inLanguage: "en-US",
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return [blogPostingSchema, breadcrumbSchema];
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateJsonLd(post);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article itemScope itemType="https://schema.org/BlogPosting">
        {/* Hidden semantic metadata for search engines */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={post.excerpt} />
        <meta itemProp="image" content={OG_IMAGE} />
        <meta itemProp="datePublished" content={new Date(post.date).toISOString()} />
        <meta itemProp="dateModified" content={new Date(post.date).toISOString()} />
        <meta itemProp="author" content="Shivaraj" />
        <meta itemProp="publisher" content="Shivaraj" />
        <meta itemProp="keywords" content={post.tags.join(", ")} />

        <PostHeader
          title={post.title}
          date={formatDate(post.date)}
          readTime={post.readTime}
          tags={post.tags}
        />
        <div className="blog-content" itemProp="articleBody">
          <MDXContent content={post.content} />
        </div>
      </article>
    </>
  );
}
