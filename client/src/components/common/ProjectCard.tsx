import { Link } from "react-router-dom";
import { ExternalLink, Github, Star } from "lucide-react";
import { Project } from "../../types/projects";

type ProjectCardProps = {
  project: Project;
};

const linkClass =
  "flex items-center gap-1.5 text-sm font-black uppercase text-content underline-offset-4 hover:text-primary hover:underline";

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col border-4 border-ink bg-card shadow-neo transition-[transform,box-shadow] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg active:translate-x-1 active:translate-y-1 active:shadow-none">
      <Link to={`/projects/${project.id}`} className="flex flex-1 flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden border-b-4 border-ink bg-muted">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="h-full w-full object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-bold uppercase text-secondary">
              No Preview
            </div>
          )}

          {project.featured && (
            <div className="absolute left-4 top-4">
              <span className="flex -rotate-3 items-center gap-1 border-[3px] border-ink bg-accent px-2.5 py-1 text-xs font-black uppercase text-on-accent shadow-neo-sm">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-6">
          <div className="mb-3">
            <span className="border-2 border-ink bg-accent-2 px-2 py-0.5 text-xs font-black uppercase tracking-widest text-on-accent">
              {project.category}
            </span>
          </div>

          <h3 className="mb-3 font-display text-2xl leading-tight font-black uppercase text-content decoration-4 underline-offset-4 group-hover:underline">
            {project.title}
          </h3>

          <p className="mb-5 line-clamp-3 text-sm leading-relaxed font-medium text-secondary">
            {project.description ??
              "A full-stack project focused on performance, scalability, and user experience."}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border-2 border-ink bg-muted px-2 py-0.5 text-xs font-bold text-content transition-colors hover:bg-accent hover:text-on-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 border-t-4 border-ink pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={linkClass}
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
                className={linkClass}
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
