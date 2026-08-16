import {
  Clock,
  Edit3,
  Trash2,
  Star,
  FileText,
} from "lucide-react";
import { Blog } from "../../types/blogs";

type BlogCardProps = {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
};

export default function BlogCard({
  blog,
  onEdit,
  onDelete,
}: BlogCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-border
        bg-card p-5 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/40
      "
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl border border-primary/20
                bg-primary/10
              "
            >
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0">
              <h3 className="line-clamp-1 font-semibold text-content">
                {blog.title}
              </h3>

              <p className="text-xs text-secondary">
                {blog.category || "Uncategorized"}
              </p>
            </div>
          </div>

          {/* Featured */}
          {blog.featured && (
            <span
              className="
                flex shrink-0 items-center gap-1
                rounded-lg border border-primary/20
                bg-primary/10 px-2 py-1
                text-xs text-primary
              "
            >
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <span
            className={`
              rounded-lg border px-2 py-1 text-xs font-medium
              ${
                blog.status === "published"
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-border bg-muted text-secondary"
              }
            `}
          >
            {blog.status}
          </span>
        </div>

        {/* Summary */}
        <p className="mb-4 line-clamp-3 text-sm text-secondary">
          {blog.summary}
        </p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {blog.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="
                rounded-lg border border-border
                bg-muted px-2 py-1
                text-xs text-secondary
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-1 text-xs text-secondary">
            <Clock className="h-3 w-3" />
            {blog.readTime}
          </div>

          <div className="flex items-center gap-2">
            {/* Edit */}
            <button
              type="button"
              onClick={() => onEdit(blog)}
              className="
                flex items-center gap-1 rounded-lg
                border border-primary/20
                bg-primary/10 px-3 py-2
                text-sm text-primary
                transition-colors
                hover:bg-primary/20
              "
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onDelete(blog.id)}
              className="
                flex items-center gap-1 rounded-lg
                border border-danger/20
                bg-danger/10 px-3 py-2
                text-sm text-danger
                transition-colors
                hover:bg-danger/20
              "
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}