import { Link } from "react-router-dom";
import { Mail, Github, Star, Code2 } from "lucide-react";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-20 dark:bg-zinc-900">
      
      {/* Header */}
      <div className="mx-auto mb-12 max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          UI System Test Page
        </h1>

        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Use this page to verify your design system: colors, cards, buttons, typography, and dark mode.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-2 text-amber-500">
            <Code2 className="h-5 w-5" />
            <h2 className="font-semibold text-zinc-900 dark:text-white">
              Card System
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This card tests border, background, and text consistency.
          </p>
        </div>

        {/* Buttons */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">
            Buttons
          </h2>

          <div className="flex flex-col gap-3">
            <button className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-black hover:bg-amber-400">
              Primary Button
            </button>

            <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 hover:border-amber-400 hover:text-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
              Secondary Button
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">
            Icons + Accent
          </h2>

          <div className="flex items-center gap-3 text-amber-500">
            <Star className="h-5 w-5" />
            <Mail className="h-5 w-5" />
            <Github className="h-5 w-5" />
          </div>

          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Test icon colors and spacing.
          </p>
        </div>

        {/* Typography */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">
            Typography
          </h2>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Small text example
          </p>

          <p className="mt-2 text-base text-zinc-700 dark:text-zinc-300">
            Normal body text example
          </p>

          <p className="mt-2 text-lg text-zinc-900 dark:text-white">
            Large text example
          </p>
        </div>

        {/* Links */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">
            Navigation Links
          </h2>

          <div className="flex flex-col gap-2">
            <Link to="/" className="text-zinc-600 hover:text-amber-500 dark:text-zinc-400">
              Home
            </Link>

            <Link to="/projects" className="text-zinc-600 hover:text-amber-500 dark:text-zinc-400">
              Projects
            </Link>

            <Link to="/blog" className="text-zinc-600 hover:text-amber-500 dark:text-zinc-400">
              Blog
            </Link>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white">
            Status Badge
          </h2>

          <span className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
            <Star className="h-3 w-3" />
            Active System
          </span>
        </div>

      </div>
    </main>
  );
}