"use client";

import { motion } from "motion/react";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  if (tags.length === 0) return null;

  const option = (label: string, value: string | null) => (
    <button
      key={label}
      onClick={() => onTagSelect(value)}
      className={`transition-colors duration-200 cursor-pointer ${
        selectedTag === value ? "text-brand" : "text-grey hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
      className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm"
    >
      <span className="text-[10px] uppercase mr-1">Filter</span>
      {option("All", null)}
      {tags.map((tag) => option(tag, tag))}
    </motion.div>
  );
}
