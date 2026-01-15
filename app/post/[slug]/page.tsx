import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { PostHeader } from "@/components/PostHeader";
import { MDXContent } from "./MDXContent";

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
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Shivaraj"],
      tags: post.tags,
      images: [
        {
          url: "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVR03to18aupHxIdmj9WvyiofM5sPS1gAGDBJ",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@shivaraj_does",
      images: [
        "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVR03to18aupHxIdmj9WvyiofM5sPS1gAGDBJ",
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <PostHeader
        title={post.title}
        date={formatDate(post.date)}
        readTime={post.readTime}
        tags={post.tags}
      />
      <div className="blog-content">
        <MDXContent content={post.content} />
      </div>
    </article>
  );
}
