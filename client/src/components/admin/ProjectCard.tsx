import {
  Edit3,
  Trash2,
  Star,
  ExternalLink,
  Github,
  FolderKanban,
} from "lucide-react";
import { Project } from "../../types/projects";

type ProjectCardProps = {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        shadow-sm
        transition-all duration-300
        hover:border-amber-500/30
        hover:-translate-y-1
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            <FolderKanban className="h-10 w-10 text-neutral-400" />
          </div>
        )}

        {project.featured && (
          <div
            className="
              absolute top-3 left-3
              flex items-center gap-1
              rounded-lg
              border border-amber-500/20
              bg-amber-500/10
              px-2 py-1
              text-xs
              text-amber-500
            "
          >
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
            {project.title}
          </h3>

          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {project.category}
          </p>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 min-h-[60px]">
          {project.description || "No description provided."}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-md
                  border border-amber-500/20
                  bg-amber-500/10
                  px-2 py-1
                  text-xs
                  text-amber-600
                  dark:text-amber-400
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mb-5 flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1
                rounded-lg
                border border-neutral-200 dark:border-neutral-700
                px-3 py-2
                text-xs
                text-neutral-700 dark:text-neutral-300
                hover:bg-neutral-100 dark:hover:bg-neutral-800
              "
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1
                rounded-lg
                border border-amber-500/20
                bg-amber-500/10
                px-3 py-2
                text-xs
                text-amber-600 dark:text-amber-400
                hover:bg-amber-500/20
              "
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <button
            onClick={() => onEdit(project)}
            className="
              flex-1
              inline-flex items-center justify-center gap-2
              rounded-lg
              border border-amber-500/20
              bg-amber-500/10
              px-4 py-2
              text-sm
              text-amber-600 dark:text-amber-400
              hover:bg-amber-500/20
              transition-colors
            "
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>

          <button
            onClick={() => onDelete(project.id)}
            className="
              flex-1
              inline-flex items-center justify-center gap-2
              rounded-lg
              border border-red-500/20
              bg-red-500/10
              px-4 py-2
              text-sm
              text-red-600 dark:text-red-400
              hover:bg-red-500/20
              transition-colors
            "
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}