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
    <div className="group card overflow-hidden p-0 transition-default hover:-translate-y-1 hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden border-b border-border">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="image-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <FolderKanban className="h-10 w-10 text-secondary" />
          </div>
        )}

        {project.featured && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="mb-3">
          <h3 className="heading truncate text-lg">
            {project.title}
          </h3>

          <p className="subheading mt-1 text-sm">
            {project.category}
          </p>
        </div>

        {/* Description */}
        <p className="muted mb-4 line-clamp-3 min-h-[60px] text-sm leading-6">
          {project.description || "No description provided."}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="badge">
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
              className="btn btn-outline px-3 py-2 text-xs"
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
              className="btn btn-primary px-3 py-2 text-xs"
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => onEdit?.(project)}
            className="btn btn-outline flex-1"
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(project.id)}
            className="btn btn-danger flex-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}