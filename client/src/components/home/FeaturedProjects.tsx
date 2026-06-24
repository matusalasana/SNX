import { FolderKanban } from "lucide-react";
import { useProjects } from "../../hooks/projects/useProjects";
import { Skeleton } from "../../utils/skeleton";
import ProjectCard from "../common/ProjectCard";

export default function FeaturedProjects() {
  const { data: projects = [], isLoading } = useProjects();

  const featuredProjects = projects
    .filter((project) => !project.featured)

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl border-t border-zinc-200 py-24 dark:border-zinc-800">
        {/* Heading Skeleton */}
        <div className="mb-14">
          <Skeleton className="mb-4 h-4 w-24" />
          <Skeleton className="mb-4 h-10 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <Skeleton className="aspect-[16/10] w-full" />
              <div className="space-y-4 p-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-16 rounded-lg" />
                  <Skeleton className="h-7 w-20 rounded-lg" />
                  <Skeleton className="h-7 w-14 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!featuredProjects.length) return null;

  return (
    <section className="mx-auto max-w-5xl border-t border-zinc-200 py-24 dark:border-zinc-800">
      {/* Heading */}
      <div className="mb-14">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-500">
            Portfolio
          </span>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <FolderKanban className="h-6 w-6 text-amber-500" />
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Featured Projects
          </h2>
        </div>

        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          A selection of projects that showcase my skills in
          full-stack development, system design, and building
          production-ready applications.
        </p>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
