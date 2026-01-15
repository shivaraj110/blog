"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BlogList, type BlogPost } from "@/components/BlogList";
import { TagFilter } from "@/components/TagFilter";
import { Footer } from "@/components/Footer";

interface HomeClientProps {
  posts: BlogPost[];
  tags: string[];
}

export function HomeClient({ posts, tags }: HomeClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return (
    <>
      <Header />
      <TagFilter
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />
      <BlogList posts={filteredPosts} onTagClick={handleTagClick} />
      <Footer />
    </>
  );
}
