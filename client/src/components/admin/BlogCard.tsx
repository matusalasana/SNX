import { Clock, Edit3, Trash2, Star, FileText } from "lucide-react";
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
        rounded-2xl
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        shadow-sm dark:shadow-none
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-amber-400/40
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="
                w-10 h-10 rounded-xl
                bg-amber-50 dark:bg-amber-500/10
                border border-amber-200 dark:border-amber-500/20
                flex items-center justify-center
              "
            >
              <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                {blog.title}
              </h3>

              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {blog.category || "Uncategorized"}
              </p>
            </div>
          </div>

          {blog.featured && (
            <div
              className="
                flex items-center gap-1
                text-xs px-2 py-1
                rounded-lg
                bg-amber-50 dark:bg-amber-500/10
                text-amber-700 dark:text-amber-400
                border border-amber-200 dark:border-amber-500/20
              "
            >
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <span
            className={`
              px-2 py-1 rounded-lg text-xs font-medium border
              ${
                blog.status === "published"
                  ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700"
              }
            `}
          >
            {blog.status}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4">
          {blog.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {blog.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="
                px-2 py-1 text-xs rounded-lg
                bg-neutral-100 dark:bg-neutral-800
                text-neutral-600 dark:text-neutral-400
                border border-neutral-200 dark:border-neutral-700
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(blog)}
              className="
                flex items-center gap-1
                px-3 py-2
                rounded-lg text-sm
                bg-amber-50 dark:bg-amber-500/10
                text-amber-700 dark:text-amber-400
                border border-amber-200 dark:border-amber-500/20
                hover:bg-amber-100 dark:hover:bg-amber-500/20
                transition
              "
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>

            <button
              onClick={() => onDelete(blog.id)}
              className="
                flex items-center gap-1
                px-3 py-2
                rounded-lg text-sm
                bg-red-50 dark:bg-red-500/10
                text-red-600 dark:text-red-400
                border border-red-200 dark:border-red-500/20
                hover:bg-red-100 dark:hover:bg-red-500/20
                transition
              "
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}