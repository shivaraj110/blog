"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "Blog",
  subtitle = "Thoughts, tutorials, and stories",
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky navbar header - appears on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50"
          >
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
              </div>
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

      {/* Original header */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12 sm:mb-16"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-2 sm:mb-3">
          {title}
        </h1>

        <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-lg">
          {subtitle}
        </p>
      </motion.header>
    </>
  );
}
