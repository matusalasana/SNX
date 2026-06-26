import { Link } from "react-router-dom";
import { TriangleAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <TriangleAlert className="h-10 w-10 text-amber-500" />
          </div>
        </div>

        {/* Code */}
        <h1 className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Page not found
        </h2>

        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            to="/"
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl
              bg-amber-500
              px-5 py-3
              font-medium text-black
              transition-colors
              hover:bg-amber-400
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>

          <Link
            to="/projects"
            className="
              inline-flex items-center justify-center
              rounded-xl
              border border-zinc-200
              bg-white
              px-5 py-3
              text-zinc-900
              transition-colors
              hover:border-amber-400
              hover:text-amber-500
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-white
              dark:hover:border-amber-500
              dark:hover:text-amber-400
            "
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}