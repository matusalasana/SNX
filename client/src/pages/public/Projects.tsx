import { useProjects } from "../../hooks/projects/useProjects";
import ProjectCard from "../../components/common/ProjectCard";
import { Skeleton } from "../../utils/skeleton";
import { FolderKanban } from "lucide-react";

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();

  const sortedProjects = [...projects].sort(
    (a, b) => a.order - b.order
  );

  const featured = sortedProjects.filter((p) => p.featured);
  const regular = sortedProjects.filter((p) => !p.featured);

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-24 px-6">
        {/* Header skeleton */}
        <div className="pb-14 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 overflow-hidden"
            >
              <Skeleton className="aspect-[16/10] w-full" />

              <div className="p-6 space-y-3">
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
    <section className="mx-auto py-24 px-6 dark:bg-zinc-900 dark:text-zinc-200">
      {/* Header */}
      <div className="pb-14">
        <div className="flex items-center gap-3 pb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Portfolio
          </span>
        </div>

        <div className="flex items-center gap-3 pb-4">
          <FolderKanban className="w-6 h-6 text-amber-400" />

          <h1 className="text-3xl font-bold text-white">
            All Projects
          </h1>
        </div>

        <p className="text-zinc-400 max-w-2xl">
          A collection of full-stack applications, APIs, and systems
          I've built using modern web technologies.
        </p>
      </div>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <div className="pb-16">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 pb-6">
            Featured Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Projects */}
      <div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}