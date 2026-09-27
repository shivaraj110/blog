"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FitText } from "./FitText";
import { Clock } from "./Clock";
import { ScrollChrome } from "./ScrollChrome";
import { SITE_NAME, nav } from "@/lib/site";

interface HeaderProps {
  subtitle?: string;
}

export function Header({
  subtitle = "Thoughts, tutorials, and stories about Linux, development, and tech adventures.",
}: HeaderProps) {
  return (
    <>
      <ScrollChrome threshold={400} />

      <header>
        <h1 className="m-0">
          <FitText
            text={SITE_NAME}
            className="w-full font-display text-brand leading-none tracking-[-0.04em]"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-20"
        >
          <div className="flex flex-col gap-10">
            <p className="m-0 max-w-[400px]">{subtitle}</p>
            <Clock />
          </div>
          <nav className="flex gap-6 sm:flex-col sm:items-end sm:gap-4">
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
            <a href="/rss.xml" className="hover:text-white transition-colors">
              RSS
            </a>
          </nav>
        </motion.div>
      </header>
    </>
  );
}
