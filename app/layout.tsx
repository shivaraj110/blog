import type { Metadata } from "next";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fragment-mono",
});

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
        url: "https://blog.shivaraj110.com/og.jpg",
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
    images: ["https://blog.shivaraj110.com/og.jpg"],
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
    <html lang="en" className={fragmentMono.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap"
        />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="min-h-screen">
        <div className="px-5 pt-5 sm:px-10">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
