import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { useState } from "react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  const projects: Project[] = [
    {
      id: 1,
      title: "Multi Vendor Marketplace",
      category: "Full Stack",
      description:
        "Marketplace platform with vendor management, orders, payments, and analytics dashboard.",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
      ],
      github: "#",
      live: "#",
    },
    {
      id: 2,
      title: "E-Commerce REST API",
      category: "Backend",
      description:
        "Scalable REST API with JWT authentication, RBAC, Redis caching, and PostgreSQL.",
      technologies: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Redis",
      ],
      github: "#",
      live: "#",
    },
    {
      id: 3,
      title: "Task Management Platform",
      category: "Full Stack",
      description:
        "Productivity platform featuring projects, tasks, collaboration, and notifications.",
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
      ],
      github: "#",
      live: "#",
    },
    {
      id: 4,
      title: "Authentication Service",
      category: "Backend",
      description:
        "Reusable authentication service supporting JWT, OAuth, and role permissions.",
      technologies: [
        "Express",
        "TypeScript",
        "PostgreSQL",
      ],
      github: "#",
      live: "#",
    },
    {
      id: 5,
      title: "Portfolio CMS",
      category: "Frontend",
      description:
        "Content management system for managing portfolio content dynamically.",
      technologies: [
        "React",
        "Tailwind",
        "TypeScript",
      ],
      github: "#",
      live: "#",
    },
    {
      id: 6,
      title: "Inventory Management",
      category: "Full Stack",
      description:
        "Warehouse inventory tracking system with reports and analytics.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
      ],
      github: "#",
      live: "#",
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="mb-4 text-cyan-400">
            MY WORK
          </p>

          <h1 className="text-5xl font-black md:text-7xl">
            Projects
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            A collection of applications, APIs, and
            software solutions I've designed and built.
            Each project demonstrates different aspects
            of full-stack development.
          </p>

          {/* Search */}
          <div className="relative mt-12 max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search projects..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 outline-none backdrop-blur focus:border-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-cyan-400"
            >
              {/* Thumbnail */}
              <div className="h-56 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20" />

              <div className="p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                    {project.category}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:text-cyan-400"
                  />
                </div>

                <h2 className="mb-4 text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="mb-6 leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {project.technologies.map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 px-3 py-1 text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 transition hover:border-cyan-400"
                  >
                    <Github size={18} />
                    Code
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-bold">
              No projects found
            </h3>

            <p className="mt-4 text-slate-400">
              Try a different search term.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}