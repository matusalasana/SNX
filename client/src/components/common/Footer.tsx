import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const iconClass =
    "group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 text-neutral-500 dark:text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-amber-500/5 hover:text-amber-500 hover:shadow-md hover:shadow-amber-500/10";

  return (
    <footer className="relative border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      {/* subtle amber glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(245,158,11,0.08),transparent_60%)]" />

      {/* top amber line */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
        
        {/* Left content */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sana <span className="text-amber-500">Matusala</span>
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Full-stack developer building modern, fast and scalable web
            experiences with React, TypeScript, Node.js and PostgreSQL.
          </p>

          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/matusalasana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconClass}
          >
            <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <a
            href="https://www.linkedin.com/in/sana-matusala-b111a7366"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconClass}
          >
            <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <a
            href="mailto:matusalasana@gmail.com"
            aria-label="Email"
            className={iconClass}
          >
            <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
}