"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface PostHeaderProps {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
}

export function PostHeader({ title, date, readTime, tags }: PostHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    // Set initial scroll state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar - only show after mount to prevent hydration animation */}
      {mounted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-50"
          style={{ scaleX }}
          initial={false}
        />
      )}

      {/* Sticky navbar header - appears on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[2px] left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50"
          >
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
              <h1 className="text-sm font-medium tracking-tight truncate flex-1">
                {title}
              </h1>
              <span className="text-xs text-zinc-500 whitespace-nowrap">
                {readTime}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-full shadow-lg transition-colors duration-200 z-50"
            aria-label="Back to top"
          >
            <svg
              width="20"
              height="20"
              style={{ width: "20px", height: "20px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="text-zinc-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-400 transition-colors duration-200 mb-8"
      >
        <svg
          width="16"
          height="16"
          style={{ width: "16px", height: "16px", flexShrink: 0 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to posts
      </Link>

      {/* Post header */}
      <header className="mb-8 sm:mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-4"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 text-sm text-zinc-500"
        >
          <time>{date}</time>
          <span className="w-1 h-1 bg-zinc-600 rounded-full" />
          <span>{readTime}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs text-zinc-400 bg-zinc-800/50 border border-zinc-700/30 rounded-md"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </header>
    </>
  );
}
