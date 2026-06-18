import { Code2, Rocket, Briefcase, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            About Me
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-tight">
          Building modern web apps with
          <span className="text-amber-400"> precision & performance</span>
        </h1>

        <p className="text-zinc-400 mt-4 max-w-2xl">
          I’m a full-stack developer focused on creating scalable,
          high-performance web applications with clean UI, solid
          architecture, and great user experience.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Story */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Code2 className="w-5 h-5" />
              <h2 className="font-semibold">Who I Am</h2>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              I specialize in full-stack development using modern
              technologies like React, Node.js, TypeScript, and
              PostgreSQL. I enjoy turning complex problems into simple,
              elegant solutions.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Briefcase className="w-5 h-5" />
              <h2 className="font-semibold">What I Do</h2>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              I build full-stack web applications, REST APIs, dashboards,
              and scalable backend systems. I also care deeply about UI
              design and performance optimization.
            </p>
          </div>
        </div>

        {/* Right: Highlights */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Rocket className="w-5 h-5" />
              <h2 className="font-semibold">My Focus</h2>
            </div>

            <ul className="space-y-2 text-zinc-400 text-sm">
              <li>• Clean, scalable architecture</li>
              <li>• Performance-first development</li>
              <li>• Modern UI/UX design systems</li>
              <li>• API design & backend systems</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-semibold">Currently</h2>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Building production-ready full-stack projects, improving
              system design skills, and exploring advanced backend
              architectures and deployment strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center">
        <h3 className="text-xl font-semibold mb-3">
          Let’s build something great together
        </h3>

        <p className="text-zinc-400 mb-6">
          I’m open to internships, freelance work, and collaborations.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-medium hover:bg-amber-400 transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}