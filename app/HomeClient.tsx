"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BlogList, type BlogPost } from "@/components/BlogList";
import { TagFilter } from "@/components/TagFilter";

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
      <section id="posts" className="pt-[120px] sm:pt-[200px] lg:mx-auto lg:max-w-[70%]">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="m-0 font-display text-[40px] font-normal leading-normal tracking-[-0.04em] text-white">
            Posts
          </h2>
          <span className="text-xs">
            {String(filteredPosts.length).padStart(2, "0")} {filteredPosts.length === 1 ? "post" : "posts"}
          </span>
        </div>
        <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        <BlogList posts={filteredPosts} onTagClick={handleTagClick} />
      </section>
    </>
  );
}
