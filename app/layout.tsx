import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.shivaraj110.com"),
  title: {
    default: "Blog | Shivaraj",
    template: "%s | Shivaraj's Blog",
  },
  description: "Thoughts, tutorials, and stories about Linux, development, and tech adventures.",
  authors: [{ name: "Shivaraj", url: "https://shivaraj110.com" }],
  creator: "Shivaraj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.shivaraj110.com",
    siteName: "Shivaraj's Blog",
    title: "Blog | Shivaraj",
    description: "Thoughts, tutorials, and stories about Linux, development, and tech adventures.",
    images: [
      {
        url: "https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVR03to18aupHxIdmj9WvyiofM5sPS1gAGDBJ",
        width: 1200,
        height: 630,
        alt: "Shivaraj's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Shivaraj",
    description: "Thoughts, tutorials, and stories about Linux, development, and tech adventures.",
    creator: "@shivaraj_does",
    images: ["https://1d6kykqofq.ufs.sh/f/fVvo0hHNtQOLVR03to18aupHxIdmj9WvyiofM5sPS1gAGDBJ"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
      "application/atom+xml": "/atom.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
