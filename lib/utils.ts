/**
 * Calculate estimated reading time based on word count
 * Average reading speed is ~200-250 words per minute
 */
export function calculateReadTime(content: string): string {
  // Strip HTML/MDX tags
  const text = content.replace(/<[^>]*>/g, "").replace(/```[\s\S]*?```/g, "");

  // Count words (split by whitespace)
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;

  // Calculate minutes (using 200 WPM for technical content)
  const minutes = Math.ceil(wordCount / 200);

  if (minutes < 1) {
    return "1 min read";
  }

  return `${minutes} min read`;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
