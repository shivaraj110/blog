import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <h1 className="m-0 font-display text-[120px] sm:text-[200px] font-normal leading-none tracking-[-0.04em] text-brand">
        404
      </h1>
      <p className="mt-10 max-w-[400px] text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-10 text-white hover:text-brand transition-colors duration-200">
        ← Back to posts
      </Link>
    </div>
  );
}
