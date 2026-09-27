"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ScrollChrome } from "./ScrollChrome";
import { SITE_NAME, nav } from "@/lib/site";

interface PostHeaderProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function PostHeader({ title, date, readTime, tags }: PostHeaderProps) {
  return (
    <>
      <ScrollChrome title={title} readTime={readTime} progress />

      {/* Top bar: wordmark + nav, like the portfolio's inner pages */}
      <div className="flex items-baseline justify-between gap-6 py-2">
        <Link href="/" className="font-display text-[32px] sm:text-[40px] leading-none tracking-[-0.04em] text-brand">
          {SITE_NAME}
        </Link>
        <nav className="flex gap-4 text-sm">
          {nav.map((n) =>
            n.external ? (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {n.label}
              </a>
            ) : (
              <Link key={n.href} href={n.href} className="hover:text-white transition-colors">
                {n.label}
              </Link>
            )
          )}
        </nav>
      </div>

      <header className="mx-auto max-w-[680px] pt-20 sm:pt-[120px] pb-12">
        <Link href="/" className="inline-block mb-10 text-sm hover:text-white transition-colors duration-200">
          ← All posts
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="m-0 font-display text-[40px] sm:text-[56px] font-normal leading-[1.15] tracking-[-0.04em] text-white"
        >
          {title}
        </motion.h1>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3"
        >
          <div>
            <dt className="text-[10px] uppercase">Published</dt>
            <dd className="m-0 mt-1 text-white">
              <time>{date}</time>
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase">Reading time</dt>
            <dd className="m-0 mt-1 text-white">{readTime}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-[10px] uppercase">Tags</dt>
            <dd className="m-0 mt-1 text-white">{tags.join(", ")}</dd>
          </div>
        </motion.dl>
      </header>
    </>
  );
}
