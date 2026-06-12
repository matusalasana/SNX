const skills = [
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "ts" },
  { name: "JavaScript", icon: "js" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "Vite", icon: "vite" },
  { name: "HTML", icon: "html" },
  { name: "CSS", icon: "css" },
  { name: "Zustand", icon: "zustand" },
  { name: "Reduc", icon: "redux" },
  { name: "Node", icon: "nodejs" },
  { name: "Express", icon: "express" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Prisma", icon: "prisma" },
  { name: "Drizzle", icon: "drizzle" },
  { name: "Supabase", icon: "supabase" },
  { name: "Firebase", icon: "firebase" },
  { name: "Redis", icon: "redis" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "VS code", icon: "vscode" },
  { name: "Figma", icon: "figma" },
  { name: "Postman", icon: "postman" },
  { name: "Linux", icon: "linux" },
  { name: "Vercel", icon: "vercel" },
  { name: "Netlify", icon: "netlify" },
]

const Skills = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <p className="mb-4 text-sm tracking-[0.3em] uppercase text-cyan-400">
        Tech Stack
      </p>

      <h2 className="mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
        Technologies I Work With
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/10"
          >
            <img
              src={`https://skillicons.dev/icons?i=${skill.icon}`}
              alt={skill.name}
              className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
            />

            <p className="text-sm text-slate-300 group-hover:text-white">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills