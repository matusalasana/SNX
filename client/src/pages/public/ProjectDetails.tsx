import {
  ArrowLeft,
  Calendar,
  Github,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectDetailsPage() {
  const project = {
    title: "Multi Vendor Marketplace",
    category: "Full Stack Application",
    duration: "3 Months",
    status: "Completed",

    description:
      "A modern marketplace platform that connects vendors and customers. The application includes authentication, product management, order processing, analytics dashboards, and role-based permissions.",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Tailwind CSS",
    ],

    features: [
      "JWT Authentication",
      "Role Based Access Control",
      "Vendor Dashboard",
      "Order Management",
      "Product Catalog",
      "Analytics Dashboard",
      "Email Notifications",
      "REST API Architecture",
    ],

    challenges: [
      "Designing scalable vendor-product relationships.",
      "Implementing efficient order processing workflows.",
      "Managing role-based permissions across multiple user types.",
      "Optimizing database queries for large datasets.",
    ],

    learnings: [
      "Advanced PostgreSQL schema design.",
      "Scalable REST API architecture.",
      "Caching strategies with Redis.",
      "Application deployment using Docker.",
    ],
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-cyan-400"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
              {project.category}
            </span>

            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400">
              {project.status}
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-black md:text-7xl">
            {project.title}
          </h1>

          <div className="mt-6 flex items-center gap-2 text-slate-400">
            <Calendar size={18} />
            {project.duration}
          </div>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-400">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-4 transition hover:border-cyan-400"
            >
              <Github size={20} />
              Source Code
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-[500px] rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20" />
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-16">
            {/* Overview */}
            <div>
              <h2 className="mb-6 text-3xl font-bold">
                Project Overview
              </h2>

              <p className="leading-8 text-slate-400">
                This project was built to provide a scalable platform
                where multiple vendors can manage products while
                customers browse, purchase, and track orders.
                The architecture focuses on maintainability,
                performance, and security.
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Key Features
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-cyan-400"
                    />

                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Challenges & Solutions
              </h2>

              <div className="space-y-4">
                {project.challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <p className="text-slate-300">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learnings */}
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                What I Learned
              </h2>

              <div className="space-y-4">
                {project.learnings.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <h2 className="mb-8 text-3xl font-bold">
                Screenshots
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-64 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 text-xl font-bold">
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="mb-4 text-xl font-bold">
                  Project Info
                </h3>

                <div className="space-y-4 text-slate-400">
                  <div>
                    <p className="text-sm uppercase">
                      Status
                    </p>
                    <p className="text-white">
                      {project.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm uppercase">
                      Duration
                    </p>
                    <p className="text-white">
                      {project.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm uppercase">
                      Category
                    </p>
                    <p className="text-white">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}