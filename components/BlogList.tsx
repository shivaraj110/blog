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
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="mb-12 sm:mb-16"
    >
      <div className="space-y-3 sm:space-y-4">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          >
            <Link
              href={`/post/${post.slug}`}
              className="group block p-4 sm:p-5 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/40 hover:border-zinc-700/50 rounded-xl transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                <h3 className="font-medium text-base sm:text-lg text-zinc-200 group-hover:text-white transition-colors duration-200">
                  {post.title}
                </h3>
                <span className="text-xs text-zinc-500 whitespace-nowrap shrink-0">
                  {post.date}
                </span>
              </div>

              <p className="text-sm text-zinc-500 leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => handleTagClick(e, tag)}
                    className="px-2 py-0.5 text-xs text-zinc-400 bg-zinc-800/50 border border-zinc-700/30 rounded-md hover:border-zinc-600/50 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
                <span className="text-xs text-zinc-600 ml-auto">
                  {post.readTime}
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500">No posts found.</p>
        </div>
      )}
    </motion.section>
  );
}
