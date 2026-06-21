import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
return (
<footer className="border-t border-neutral-200 dark:border-neutral-800">
<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
<div className="text-center md:text-left">
<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
Sana Matusala
</p>

      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Building modern web experiences with React, TypeScript, Node.js, and PostgreSQL.
      </p>

      <p className="mt-2 text-xs text-neutral-400">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </div>

    <div className="flex items-center gap-3">
      <a
        href="https://github.com/matusalasana"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-500 transition-all hover:border-amber-500/30 hover:text-amber-500"
      >
        <Github className="h-4 w-4" />
      </a>

      <a
        href="https://www.linkedin.com/in/sana-matusala-b111a7366"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-500 transition-all hover:border-amber-500/30 hover:text-amber-500"
      >
        <Linkedin className="h-4 w-4" />
      </a>

      <a
        href="mailto:matusalasana@gmail.com"
        aria-label="Email"
        className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-500 transition-all hover:border-amber-500/30 hover:text-amber-500"
      >
        <Mail className="h-4 w-4" />
      </a>
    </div>
  </div>
</footer>

);
}