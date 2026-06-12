import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import  Summary  from "../../components/home/Summary";
import  Title  from "../../components/common/Title";
import  Buttons  from "../../components/home/Buttons";
import  SocialMedias  from "../../components/home/SocialMedias";
import  AboutMe  from "../../components/home/AboutMe";

export default function HomePage() {
  const skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Git",
    "Tailwind CSS",
  ];

  const projects = [
    {
      title: "Multi Vendor Marketplace",
      description:
        "A scalable marketplace platform with authentication, order management, payments, and vendor dashboards.",
    },
    {
      title: "E-Commerce REST API",
      description:
        "Production-ready backend API featuring JWT authentication, RBAC, caching, and PostgreSQL.",
    },
    {
      title: "Task Management Platform",
      description:
        "Full-stack productivity application with real-time updates and team collaboration features.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
        
          <div className="max-w-4xl">
            <Title />
            <Summary />
            <Buttons />
            <SocialMedias />
          </div>
          
        </div>
      </section>
      <AboutMe />

      {/* SKILLS */}
      <section
        id="skills"
        className="border-y border-white/10 bg-slate-950/50 py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-cyan-400">TECH STACK</p>

          <h2 className="mb-12 text-4xl font-bold">
            Technologies I Work With
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {skills.map((skill) => (
              <div
                key={skill}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center font-medium backdrop-blur-sm transition hover:border-cyan-400"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-32">
        <p className="mb-4 text-cyan-400">FEATURED WORK</p>

        <h2 className="mb-12 text-4xl font-bold">
          Selected Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-cyan-400"
            >
              <div className="mb-6 h-48 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20" />

              <h3 className="mb-4 text-2xl font-semibold">
                {project.title}
              </h3>

              <p className="mb-6 leading-7 text-slate-400">
                {project.description}
              </p>

              <button className="flex items-center gap-2 text-cyan-400">
                View Details
                <ArrowRight size={18} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-white/10 py-32"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-cyan-400">GET IN TOUCH</p>

          <h2 className="text-5xl font-bold">
            Let's Build Something Amazing
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            I'm currently open to internships, freelance opportunities,
            and full-time roles. Feel free to reach out.
          </p>

          <a
            href="mailto:matusalasala@gmail.com"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Contact Me
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-slate-500">
          © 2026 Sana Matusala. All rights reserved.
        </div>
      </footer>
    </main>
  );
}