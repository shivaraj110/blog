import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-zinc-700 mb-4">404</h1>
      <h2 className="text-xl font-medium text-zinc-400 mb-6">
        Page not found
      </h2>
      <p className="text-zinc-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 text-sm font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors duration-200"
      >
        Back to home
      </Link>
    </div>
  );
}
