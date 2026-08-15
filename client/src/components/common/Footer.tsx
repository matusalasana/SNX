import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const iconClass = `
    group
    rounded-xl
    border border-border
    bg-card
    p-3
    text-secondary
    transition-all duration-300
    hover:-translate-y-1
    hover:border-primary/40
    hover:bg-primary/5
    hover:text-primary
  `;

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Subtle brand glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          bg-[radial-gradient(circle_at_bottom,var(--color-primary)/8%,transparent_60%)]
        "
      />

      {/* Top accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container-custom flex flex-col items-center justify-between gap-8 py-10 md:flex-row">
        {/* Left */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold tracking-tight text-content">
            Sana <span className="text-primary">Matusala</span>
          </h3>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary">
            Full-stack developer building modern, fast and scalable web
            experiences with React, TypeScript, Node.js and PostgreSQL.
          </p>

          <p className="mt-3 text-xs text-secondary">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/matusalasana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconClass}
          >
            <Github className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <a
            href="https://www.linkedin.com/in/sana-matusala-b111a7366"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconClass}
          >
            <Linkedin className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </a>

          <a
            href="mailto:matusalasana@gmail.com"
            aria-label="Email"
            className={iconClass}
          >
            <Mail className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
}