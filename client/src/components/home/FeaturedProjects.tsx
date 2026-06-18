import { FolderKanban } from "lucide-react";
import { useProjects } from "../../hooks/projects/useProjects";
import { Skeleton } from "../../utils/skeleton";
import ProjectCard from "../common/ProjectCard";

export default function FeaturedProjects() {
  const { data: projects = [], isLoading } = useProjects();

  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
        {/* Heading Skeleton */}
        <div className="mb-14">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 overflow-hidden"
            >
              <Skeleton className="aspect-[16/10] w-full" />

              <div className="p-6 space-y-4">
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
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
      {/* Heading */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Portfolio
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <FolderKanban className="w-6 h-6 text-amber-400" />

          <h2 className="text-3xl font-bold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>

        <p className="max-w-2xl text-zinc-400">
          A selection of projects that showcase my skills in
          full-stack development, system design, and building
          production-ready applications.
        </p>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}