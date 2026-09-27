"use client";

import { motion } from "motion/react";
import Link from "next/link";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogListProps {
  posts: BlogPost[];
  onTagClick?: (tag: string) => void;
}

export function BlogList({ posts, onTagClick }: BlogListProps) {
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    onTagClick?.(tag);
  };

  return (
    <section className="mb-10">
      <div className="border-t border-line">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: "easeOut" }}
            className="border-b border-line"
          >
            <Link
              href={`/post/${post.slug}`}
              className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-[110px_1fr_160px] md:gap-8"
            >
              <time className="text-xs md:pt-2.5">{post.date}</time>

              <div>
                <h3 className="m-0 font-display text-2xl md:text-[28px] font-normal leading-[1.3] tracking-[-0.04em] text-white group-hover:text-brand transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="m-0 mt-3 max-w-[560px]">{post.excerpt}</p>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs md:flex-col md:items-end md:pt-2.5 md:text-right">
                <span>{post.readTime}</span>
                <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => handleTagClick(e, tag)}
                      className="cursor-pointer text-white hover:text-brand transition-colors duration-200"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && <p className="py-12">No posts found.</p>}
    </section>
  );
}
