import { Link } from "react-router-dom";
import { ExternalLink, Github, Star } from "lucide-react";
import { Project } from "../../types/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Link to={`/projects/${project.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-secondary">
              No Preview
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {project.featured && (
            <div className="absolute left-4 top-4">
              <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Category */}
          <div className="mb-3">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-semibold text-content transition-colors group-hover:text-primary">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-secondary">
            {project.description ??
              "A full-stack project focused on performance, scalability, and user experience."}
          </p>

          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border bg-muted px-2.5 py-1 text-xs text-secondary transition-colors hover:border-primary/30 hover:text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 border-t border-border pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}