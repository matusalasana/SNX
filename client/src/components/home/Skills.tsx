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
      <section className="max-w-5xl mx-auto py-24 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mb-14">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />

                <div className="flex-1 space-y-2">
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
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-200 dark:border-zinc-800">
      {/* Heading */}
      <div className="mb-14">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
            Expertise
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Technical Stack
        </h2>

        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Technologies I use to build modern web applications, scalable APIs,
          and production-ready systems.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ id, label, icon: Icon }) => {
          const categorySkills = skills.filter(
            (skill) => skill.category.toLowerCase() === id
          );

          if (!categorySkills.length) return null;

          return (
            <div
              key={id}
              className="
                rounded-2xl
                border border-zinc-200
                dark:border-zinc-800
                bg-white
                dark:bg-zinc-900
                p-6
                duration-300
                hover:-translate-y-1
                hover:border-amber-400
                dark:hover:border-amber-500
              "
            >
              {/* Header */}
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center rounded-xl
                    border border-amber-200
                    bg-amber-100
                    dark:border-amber-500/20
                    dark:bg-amber-500/10
                  "
                >
                  <Icon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {label}
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {categorySkills.length} technologies
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="
                      rounded-lg
                      border border-zinc-200
                      bg-zinc-100
                      px-3 py-1.5
                      text-xs
                      font-medium
                      text-zinc-700
                      hover:border-amber-400
                      hover:bg-amber-50
                      hover:text-amber-600
                      dark:border-zinc-700
                      dark:bg-zinc-800
                      dark:text-zinc-300
                      dark:hover:border-amber-500
                      dark:hover:bg-amber-500/10
                      dark:hover:text-amber-300
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