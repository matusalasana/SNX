import { useSkills } from "../../hooks/skills/useSkills";
import { Code2, Server, Database, Cloud, Terminal } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";

const CATEGORIES = [
  { id: "frontend", label: "Frontend", icon: Code2 },
  { id: "backend", label: "Backend", icon: Server },
  { id: "database", label: "Database", icon: Database },
  { id: "devops", label: "DevOps", icon: Cloud },
  { id: "tools", label: "Tools", icon: Terminal },
];

export default function Skills() {
  const { data: skills = [], isLoading } = useSkills();

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
        <div className="mb-14">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <Skeleton className="w-10 h-10 rounded-xl" />

                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-28 rounded-lg" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
      {/* Heading */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Expertise
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white tracking-tight">
          Technical Stack
        </h2>

        <p className="mt-3 text-zinc-400 max-w-2xl">
          Technologies I use to build modern web applications,
          scalable APIs, and production-ready systems.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const categorySkills = skills.filter(
            (skill) => skill.category.toLowerCase() === id
          );

          if (!categorySkills.length) return null;

          return (
            <div
              key={id}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-zinc-800/60
                bg-zinc-900/20
                backdrop-blur-xl
                p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:border-amber-500/30
                hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />
              </div>

              {/* Header */}
              <div className="relative flex items-center gap-3 mb-5">
                <div
                  className="
                    flex items-center justify-center
                    w-10 h-10 rounded-xl
                    bg-amber-500/10
                    border border-amber-500/20
                  "
                >
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {label}
                  </h3>

                  <p className="text-xs text-zinc-500">
                    {categorySkills.length} technologies
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="relative flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="
                      px-3 py-1.5
                      rounded-lg
                      text-xs font-medium
                      border border-zinc-800
                      bg-zinc-900/70
                      text-zinc-300
                      transition-all duration-200
                      hover:border-amber-500/30
                      hover:text-amber-300
                      hover:bg-amber-500/5
                    "
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}