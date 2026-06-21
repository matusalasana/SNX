import { useParams, Link } from "react-router-dom";
import { useProject } from "../../hooks/projects/useProject";
import {
  ArrowLeft,
  Star,
  Github,
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "../../utils/skeleton";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading } = useProject(id!);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center">
        <p className="text-zinc-400">Project not found.</p>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mt-4 text-amber-400 hover:text-amber-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-24 px-6">

      {/* BACK */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      {/* HEADER */}
      <header className="space-y-4 mb-10">

        {/* META */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">

          {project.category && (
            <span className="text-amber-400 uppercase tracking-wider">
              {project.category}
            </span>
          )}

          {project.featured && (
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              Featured
            </span>
          )}

          <span>•</span>

          <span>
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {project.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-zinc-400 text-lg leading-relaxed">
          {project.description}
        </p>

        {/* LINKS */}
        <div className="flex flex-wrap gap-3 pt-2">

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-zinc-900
                border border-zinc-800
                text-sm text-zinc-300
                hover:border-amber-500 hover:text-amber-400
                transition
              "
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-xl
                bg-amber-500
                text-black
                text-sm font-medium
                hover:bg-amber-400
                transition
              "
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}

        </div>
      </header>

      {/* THUMBNAIL */}
      {project.thumbnailUrl && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-zinc-800">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {/* SCREENSHOTS */}
      {project.images?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm text-zinc-400 mb-4 uppercase tracking-wider">
            Screenshots
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img: string, index: number) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden border border-zinc-800"
              >
                <img
                  src={img}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAGS */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="
                text-xs px-3 py-1
                rounded-lg
                border border-zinc-800
                bg-zinc-900/40
                text-zinc-400
              "
            >
              {tag}
            </span>
          ))}
        </div>
      )}

    </article>
  );
}