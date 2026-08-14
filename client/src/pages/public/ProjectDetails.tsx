import { useParams, Link, useNavigate } from "react-router-dom";
import { useProject } from "../../hooks/projects/useProject";
import { ArrowLeft, Star, Github, ExternalLink } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";
import MarkdownContent from "../../utils/MarkdownContent";

export default function ProjectDetails() {
  const { id } = useParams();
  const { data: project = [], isLoading } = useProject(id!);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-6 py-24">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Project not found.
        </p>

        <Link
          to="/projects"
          className="mt-4 inline-flex items-center gap-2 text-amber-500 hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-24 dark:bg-zinc-900">

      <div className="flex flex-col gap-2 mb-10 text-zinc-500 text-sm dark:text-zinc-400">
        <Link to="/projects" className="inline-flex items-center text-sm text-zinc-500 transition hover:text-amber-500 dark:text-zinc-400">
          <ArrowLeft className="h-4 w-4" /> Back to Projects 
        </Link>
        <span>
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
      </div>

      {/* HEADER */}
      <header className="mb-10 space-y-4">

        {/* META */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          {project.category && (
            <span className="font-medium uppercase tracking-wider text-blue-500">
              {project.category}
            </span>
          )}
          {project.featured && (
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              Featured
            </span>
          )}
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl dark:text-white">
          {project.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </header>

      {/* THUMBNAIL */}
      {project.thumbnailUrl && (
        <img src={project.thumbnailUrl} alt={project.title} className="image" />
      )}
      
      {/* Content */}
      <MarkdownContent content={project.content} />

      {/* TAGS */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      )}

    </article>
  );
}