import { Link } from "react-router-dom";
import { ExternalLink, Github, Star } from "lucide-react";
import { Project } from "../../types/projects"

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-zinc-800/60
        bg-zinc-900/20
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-amber-500/30
        hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <Link to={`/projects/${project.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="
                h-full w-full object-cover
                transition duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-700">
              No Preview
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-400">
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
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-amber-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-zinc-400">
            {project.description ??
              "A full-stack project focused on performance, scalability, and user experience."}
          </p>

          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-lg
                  border border-zinc-800
                  bg-zinc-900/60
                  px-2.5 py-1
                  text-xs
                  text-zinc-400
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 border-t border-zinc-800/50 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  flex items-center gap-1.5
                  text-sm text-zinc-400
                  transition hover:text-amber-400
                "
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
                className="
                  flex items-center gap-1.5
                  text-sm text-zinc-400
                  transition hover:text-white
                "
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