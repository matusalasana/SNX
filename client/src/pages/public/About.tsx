import { Code2, Rocket, Briefcase, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section className="mx-auto max-w-6xl border-t text-zinc-200 py-24 dark:bg-zinc-900 px-6">
      {/* Header */}
      <div className="mb-16">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
            About Me
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white">
          Building modern web apps with{" "}
          <span className="text-amber-500">precision & performance</span>
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          I’m a full-stack developer focused on creating scalable, high-performance
          web applications with clean UI, solid architecture, and great user experience.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex items-center gap-2 text-amber-500">
              <Code2 className="h-5 w-5" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">
                Who I Am
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              I specialize in full-stack development using modern technologies like
              React, Node.js, TypeScript, and PostgreSQL. I enjoy turning complex
              problems into simple, elegant solutions.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex items-center gap-2 text-amber-500">
              <Briefcase className="h-5 w-5" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">
                What I Do
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              I build full-stack web applications, REST APIs, dashboards, and
              scalable backend systems. I also care deeply about UI design and
              performance optimization.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex items-center gap-2 text-amber-500">
              <Rocket className="h-5 w-5" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">
                My Focus
              </h2>
            </div>

            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• Clean, scalable architecture</li>
              <li>• Performance-first development</li>
              <li>• Modern UI/UX design systems</li>
              <li>• API design & backend systems</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex items-center gap-2 text-amber-500">
              <Sparkles className="h-5 w-5" />
              <h2 className="font-semibold text-zinc-900 dark:text-white">
                Currently
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Building production-ready full-stack projects, improving system design
              skills, and exploring advanced backend architectures and deployment strategies.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
          Let’s build something great together
        </h3>

        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          I’m open to internships, freelance work, and collaborations.
        </p>

        <a
          href="/contact"
          className="
            inline-flex items-center gap-2
            rounded-xl
            bg-amber-500
            px-6 py-3
            font-medium text-black
            transition-colors
            hover:bg-amber-400
          "
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}