import { Code2, Rocket, Briefcase, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section className="container-custom section border-t border-border bg-background text-content">
      {/* Header */}
      <div className="mb-16">
        <div className="flex-start mb-3 gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />

          <span className="text-primary text-xs font-medium uppercase tracking-[0.25em]">
            About Me
          </span>
        </div>

        <h1 className="heading text-4xl leading-tight sm:text-5xl">
          Building modern web apps with{" "}
          <span className="text-primary">precision & performance</span>
        </h1>

        <p className="subheading mt-4 max-w-2xl text-base">
          I’m a full-stack developer focused on creating scalable, high-performance
          web applications with clean UI, solid architecture, and great user experience.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="card space-y-3">
            <div className="flex-start text-primary gap-2">
              <Code2 className="h-5 w-5" />
              <h2 className="heading text-base font-semibold">
                Who I Am
              </h2>
            </div>

            <p className="subheading text-sm leading-relaxed">
              I specialize in full-stack development using modern technologies like
              React, Node.js, TypeScript, and PostgreSQL. I enjoy turning complex
              problems into simple, elegant solutions.
            </p>
          </div>

          <div className="card space-y-3">
            <div className="flex-start text-primary gap-2">
              <Briefcase className="h-5 w-5" />
              <h2 className="heading text-base font-semibold">
                What I Do
              </h2>
            </div>

            <p className="subheading text-sm leading-relaxed">
              I build full-stack web applications, REST APIs, dashboards, and
              scalable backend systems. I also care deeply about UI design and
              performance optimization.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="card space-y-3">
            <div className="flex-start text-primary gap-2">
              <Rocket className="h-5 w-5" />
              <h2 className="heading text-base font-semibold">
                My Focus
              </h2>
            </div>

            <ul className="subheading space-y-2 text-sm">
              <li>• Clean, scalable architecture</li>
              <li>• Performance-first development</li>
              <li>• Modern UI/UX design systems</li>
              <li>• API design & backend systems</li>
            </ul>
          </div>

          <div className="card space-y-3">
            <div className="flex-start text-primary gap-2">
              <Sparkles className="h-5 w-5" />
              <h2 className="heading text-base font-semibold">
                Currently
              </h2>
            </div>

            <p className="subheading text-sm leading-relaxed">
              Building production-ready full-stack projects, improving system design
              skills, and exploring advanced backend architectures and deployment strategies.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h3 className="heading mb-3 text-xl">
          Let’s build something great together
        </h3>

        <p className="subheading mb-6">
          I’m open to internships, freelance work, and collaborations.
        </p>

        <a href="/contact" className="btn-primary inline-flex px-6 py-3">
          Contact Me
        </a>
      </div>
    </section>
  );
}
