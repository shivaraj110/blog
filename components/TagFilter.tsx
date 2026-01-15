"use client";

import { motion } from "motion/react";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500 mr-1">Filter:</span>
        <button
          onClick={() => onTagSelect(null)}
          className={`px-2.5 py-1 text-xs rounded-md transition-all duration-200 ${
            selectedTag === null
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
              : "text-zinc-400 bg-zinc-800/50 border border-zinc-700/30 hover:border-zinc-600/50 hover:text-zinc-300"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-2.5 py-1 text-xs rounded-md transition-all duration-200 ${
              selectedTag === tag
                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                : "text-zinc-400 bg-zinc-800/50 border border-zinc-700/30 hover:border-zinc-600/50 hover:text-zinc-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
