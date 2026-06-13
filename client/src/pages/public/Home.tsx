import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import  Summary  from "../../components/home/Summary";
import  Title  from "../../components/common/Title";
import  Buttons  from "../../components/home/Buttons";
import  SocialMedias  from "../../components/home/SocialMedias";
import  AboutMe  from "../../components/home/AboutMe";
import  Skills  from "../../components/home/Skills";
import  Projects  from "../../components/home/Projects";
import  Services  from "../../components/home/Services";
import  Certifications  from "../../components/home/Certifications";

export default function HomePage() {

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
        <Title />
        <Summary />
        <Buttons />
        <SocialMedias />
      </section>
      
      {/* ABOUT */}
      <section className="relative overflow-hidden">
        <AboutMe />
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="border-y border-white/10 bg-slate-950/50 py-32"
      >
        <Skills />
      </section>
      
      <Services />
      
      {/* PROJECTS */}
      <Projects />
      
      <Certifications />
      

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