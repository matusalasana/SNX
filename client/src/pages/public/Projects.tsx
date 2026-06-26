import { useProjects } from "../../hooks/projects/useProjects";
import ProjectCard from "../../components/common/ProjectCard";
import { Skeleton } from "../../utils/skeleton";
import { FolderKanban } from "lucide-react";

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const featured = sortedProjects.filter((p) => p.featured);
  const regular = sortedProjects.filter((p) => !p.featured);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 dark:border-zinc-800">
        {/* Header skeleton */}
        <div className="mb-14 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <Skeleton className="aspect-[16/10] w-full" />

              <div className="space-y-3 p-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-6 w-14 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-lg" />
                  <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 dark:border-zinc-800">
      {/* Header */}
      <div className="mb-14">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
            Portfolio
          </span>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <FolderKanban className="h-6 w-6 text-amber-500" />

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            All Projects
          </h1>
        </div>

        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          A collection of full-stack applications, APIs, and systems I've built
          using modern web technologies.
        </p>
      </div>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-amber-500">
            Featured Work
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Projects */}
      <div>
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          More Projects
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regular.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}