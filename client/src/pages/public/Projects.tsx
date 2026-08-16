import { useProjects } from "../../hooks/projects/useProjects";
import ProjectCard from "../../components/common/ProjectCard";
import { Skeleton } from "../../utils/skeleton";
import { FolderKanban } from "lucide-react";

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();

  if (isLoading) {
    return (
      <section className="container-custom section space-y-14">
        {/* Header skeleton */}
        <div className="space-y-3">
          <Skeleton className="skeleton h-4 w-24" />
          <Skeleton className="skeleton h-10 w-72" />
          <Skeleton className="skeleton h-4 w-96 max-w-full" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card overflow-hidden p-0">
              <Skeleton className="skeleton aspect-[16/10] w-full" />

              <div className="space-y-3 p-6">
                <Skeleton className="skeleton h-4 w-20" />
                <Skeleton className="skeleton h-6 w-3/4" />
                <Skeleton className="skeleton h-4 w-full" />
                <Skeleton className="skeleton h-4 w-5/6" />

                <div className="flex-start gap-2 pt-2">
                  <Skeleton className="skeleton h-6 w-14 rounded-lg" />
                  <Skeleton className="skeleton h-6 w-16 rounded-lg" />
                  <Skeleton className="skeleton h-6 w-12 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom section bg-background text-content">
      {/* Header */}
      <div className="pb-14">
        <div className="flex-start gap-3 pb-3">
          <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-primary text-xs font-medium uppercase tracking-[0.25em]">
            Portfolio
          </span>
        </div>

        <div className="flex-start gap-3 pb-4">
          <FolderKanban className="text-primary h-6 w-6" />
          <h1 className="heading text-3xl sm:text-4xl">All Projects</h1>
        </div>

        <p className="subheading max-w-2xl text-base">
          A collection of full-stack applications, APIs, and systems I've built
          using modern web technologies.
        </p>
      </div>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
