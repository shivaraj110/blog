"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock } from "./Clock";
import { SITE_NAME, nav, socials } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();

  // Determine RSS URL based on current path
  const rssUrl = pathname.startsWith("/post/")
    ? `${pathname.replace(/\/$/, "")}/rss.xml`
    : "/rss.xml";

  const link = "hover:text-white transition-colors duration-200";

  return (
    <footer className="flex flex-col gap-16 pt-[160px] pb-20 sm:flex-row sm:items-start sm:justify-between sm:pt-[240px]">
      <div className="flex flex-col gap-10">
        <Link href="/" className="font-display text-[40px] leading-none tracking-[-0.04em] text-brand">
          {SITE_NAME}
        </Link>
        <Clock />
        <div className="text-base">©{new Date().getFullYear()} Shivaraj</div>
      </div>

      <div className="flex gap-16 text-base sm:gap-20 sm:pt-16">
        <div className="flex flex-col gap-4">
          {nav.map((n) =>
            n.external ? (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className={link}>
                {n.label}
              </a>
            ) : (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            )
          )}
          <a href={rssUrl} className={link}>
            RSS
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
