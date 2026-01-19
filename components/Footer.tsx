"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Determine RSS URL based on current path
  const rssUrl = pathname.startsWith("/post/")
    ? `${pathname}/rss.xml`
    : "/rss.xml";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="pt-6 sm:pt-8 border-t border-zinc-800/50"
    >
      <div className="flex justify-center gap-4">
        <a
          href="https://shivaraj110.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          aria-label="Portfolio"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-18c2.761 0 5 4.03 5 9s-2.239 9-5 9-5-4.03-5-9 2.239-9 5-9ZM3 12h18"
            />
          </svg>
        </a>
        <a
          href="https://github.com/shivaraj110"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="https://x.com/shivaraj_does"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          aria-label="Twitter"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={rssUrl}
          className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          aria-label="RSS Feed"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
          </svg>
        </a>
      </div>
    </motion.footer>
  );
}
