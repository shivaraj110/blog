"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

interface ScrollChromeProps {
  // Post pages show the post title + read time and a reading progress line
  title?: string;
  readTime?: string;
  progress?: boolean;
  threshold?: number;
}

export function ScrollChrome({ title, readTime, progress = false, threshold = 150 }: ScrollChromeProps) {
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
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return (
    <>
      {/* Progress line - only after mount to prevent hydration animation */}
      {progress && mounted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-px bg-brand origin-left z-50"
          style={{ scaleX }}
          initial={false}
        />
      )}

      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40 bg-page/85 backdrop-blur-md border-b border-line"
          >
            <div className="px-5 sm:px-10 py-3 flex items-baseline justify-between gap-6">
              <Link
                href="/"
                className="font-display text-xl text-brand tracking-[-0.04em] whitespace-nowrap"
              >
                {SITE_NAME}
              </Link>
              {title && <span className="text-sm text-white truncate flex-1 hidden sm:block">{title}</span>}
              {readTime && <span className="text-xs whitespace-nowrap">{readTime}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-5 sm:bottom-8 sm:right-10 z-50 px-3 py-2 text-xs text-grey bg-card border border-line hover:border-grey hover:text-white transition-colors duration-200"
            aria-label="Back to top"
          >
            Top ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
