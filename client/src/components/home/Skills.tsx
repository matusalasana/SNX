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
  { name: "Redux", icon: "redux" },
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
  { name: "VS Code", icon: "vscode" },
  { name: "Figma", icon: "figma" },
  { name: "Postman", icon: "postman" },
  { name: "Linux", icon: "linux" },
  { name: "Vercel", icon: "vercel" },
  { name: "Netlify", icon: "netlify" },
];

const Skills = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      {/* background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* header */}
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs tracking-[0.35em] uppercase text-cyan-400/80">
          Tech Stack
        </p>

        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Technologies I Work With
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">
          A curated collection of tools, frameworks, and platforms I use to build
          modern, scalable, and performant applications.
        </p>
      </div>

      {/* grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="
              group relative flex flex-col items-center justify-center gap-3
              rounded-2xl border border-white/10
              bg-white/[0.03]
              p-5
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-2
              hover:border-cyan-400/30
              hover:bg-white/[0.06]
              hover:shadow-[0_8px_30px_rgba(34,211,238,0.08)]
            "
          >
            {/* glow layer */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />
            </div>

            <img
              src={`https://skillicons.dev/icons?i=${skill.icon}`}
              alt={skill.name}
              className="
                h-10 w-10
                transition-transform duration-300
                group-hover:scale-110
              "
            />

            <p className="text-xs text-slate-400 transition-colors group-hover:text-slate-200">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;