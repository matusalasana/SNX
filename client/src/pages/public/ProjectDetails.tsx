import { useParams, Link } from "react-router-dom";
import { useProject } from "../../hooks/projects/useProject";
import { ArrowLeft, Star, Github, ExternalLink } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";
import MarkdownContent from "../../utils/MarkdownContent";

export default function ProjectDetails() {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id!);

  if (isLoading) {
    return (
      <div className="container-custom section max-w-4xl space-y-6">
        <Skeleton className="skeleton h-6 w-32" />
        <Skeleton className="skeleton h-10 w-full" />
        <Skeleton className="skeleton aspect-video w-full rounded-2xl" />
        <Skeleton className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="grid-center container-custom section max-w-4xl text-center">
        <p className="subheading">Project not found.</p>

        <Link
          to="/projects"
          className="link flex-start mt-4 justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to projects</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="container-custom section max-w-4xl bg-background text-content">
      <div className="flex-start mb-10 flex-col gap-2 text-xs sm:flex-row sm:gap-4">
        <Link
          to="/projects"
          className="link flex-start gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>
        <span className="subheading">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* HEADER */}
      <header className="mb-10 space-y-4">
        {/* META */}
        <div className="flex-start flex-wrap gap-3 text-xs">
          {project.category && (
            <span className="badge-success uppercase font-medium tracking-wider">
              {project.category}
            </span>
          )}
          {project.featured && (
            <span className="badge-warning flex-start gap-1 font-medium">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* TITLE */}
        <h1 className="heading text-3xl sm:text-4xl">
          {project.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="subheading text-lg leading-relaxed">
          {project.description}
        </p>

        {/* LINKS */}
        <div className="flex-start flex-wrap gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </header>

      {/* THUMBNAIL */}
      {project.thumbnailUrl && (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="image image-cover max-h-[500px]"
        />
      )}

      {/* Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:heading prose-a:link">
        <MarkdownContent content={project.content} />
      </div>

      {/* TAGS */}
      {project.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
