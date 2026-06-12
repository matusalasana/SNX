import { motion } from "framer-motion"
import { Globe, Github } from "lucide-react"
import ProjectCard from "../common/ProjectCard.tsx"

const projects = [
  {
    title: "Aura",
    desc: "A full stack hotel booking application which includes facilities like register your hotel, book a hotel, stripe payment gateway, login-signup authentication.",
    image: "https://images.unsplash.com/photo-1743764180148-b712e5293800?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Express", "Stripe", "MongoDB"],
    demo: "https://hb-gs.vercel.app/",
    repo: "https://github.com/matusalasana",
  },
  {
    title: "CashVolt",
    desc: "An employee time-entry management system allowing both employee and manager to enter and only manager can see/edit the working hours of an employee.",
    image: "https://plus.unsplash.com/premium_photo-1681469490618-c24cc20bef1c?q=80&w=1085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Node.js", "Tailwind CSS", "Couchbase"],
    demo: "https://workwave-time.netlify.app/",
    repo: "https://github.com/matusalasana",
  },
  {
    title: "Nutora",
    desc: "An official meeting notes summarizer and sharer via email which summarizes meeting transcripts into different formats as per choice.",
    image: "https://images.unsplash.com/photo-1624684244440-1130c3b65783?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Google AI", "Gmail API", "Tailwind CSS"],
    demo: "https://ai-meeting-notes-summarizer-q2bw.vercel.app/",
    repo: "https://github.com/matusalasana",
  },
  {
    title: "Movie Hub",
    desc: "TinyURL-like service: accept a long URL, return a short slug; redirect when slug is visited; simple analytics and user accounts for managing links.",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Go", "React", "JavaScript"],
    demo: "https://url-shortner-git-main-sahil-khans-projects-35aaf9dc.vercel.app/",
    repo: "https://github.com/matusalasana",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p className="mb-4 text-sm tracking-[0.3em] uppercase text-cyan-400">
          Featured Work
        </p>

        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Selected Projects
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">
          A collection of full-stack applications showcasing my experience in
          backend systems, AI integration, and modern UI design.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {projects.map((project, idx) => (
          <ProjectCard
            i={idx}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}

export default Projects