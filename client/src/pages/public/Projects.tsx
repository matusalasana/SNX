import { useMemo } from "react";
import { useProjects } from "../../hooks/projects/useProjects";
import ProjectCard from "../../components/common/ProjectCard";
import { Skeleton } from "../../utils/skeleton";
import { FolderKanban } from "lucide-react";

export default function Projects() {
  const { data: projects = [], isLoading } = useProjects();

  // Memoize sorted and filtered lists to prevent recalculation on every render
  const { featured, regular } = useMemo(() => {
    const sorted = [...projects].sort((a, b) => a.order - b.order);
    return {
      featured: sorted.filter((p) => p.featured),
      regular: sorted.filter((p) => !p.featured),
    };
  }, [projects]);

  if (isLoading) return <ProjectsSkeleton />;

  return (
    <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 px-6 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <header className="mb-14">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">Portfolio</span>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <FolderKanban className="h-6 w-6 text-amber-500" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">All Projects</h1>
        </div>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          A collection of full-stack applications and systems built with modern web technologies.
        </p>
      </header>

      {/* Projects Grid */}
      {featured.length === 0 && regular.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">No projects found.</p>
      ) : (
        <>
          {featured.length > 0 && <ProjectSection title="Featured Work" items={featured} />}
          {regular.length > 0 && <ProjectSection title="More Projects" items={regular} isFeatured={false} />}
        </>
      )}
    </section>
  );
}

// Sub-component for cleaner mapping
const ProjectSection = ({ title, items, isFeatured = true }: { title: string; items: any[]; isFeatured?: boolean }) => (
  <div className="mb-16">
    <h2 className={`mb-6 text-sm font-medium uppercase tracking-widest ${isFeatured ? "text-amber-500" : "text-zinc-500 dark:text-zinc-400"}`}>
      {title}
    </h2>
    <div className={`grid grid-cols-1 gap-6 ${isFeatured ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

// Extracted Skeleton for readability
const ProjectsSkeleton = () => (
  <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 px-6 dark:border-zinc-800">
    <div className="mb-14 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-72" />
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-2xl" />
      ))}
    </div>
  </section>
);
