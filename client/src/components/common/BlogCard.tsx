import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Blog } from "../../types/blogs";

interface BlogProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border border-zinc-200
        bg-white
        transition-all duration-300
        hover:-translate-y-1
        hover:border-amber-400
        dark:border-zinc-800
        dark:bg-zinc-900
        dark:hover:border-amber-500
      "
    >
      <Link to={`/blogs/${blog.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-950">
          {blog.thumbnailUrl ? (
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="
                h-full w-full object-cover
                opacity-90
                transition-all duration-500
                group-hover:scale-105
                group-hover:opacity-100
              "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-500">
              No Preview
            </div>
          )}

          {/* Featured badge */}
          {blog.featured && (
            <div className="absolute left-4 top-4">
              <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-xs text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            {blog.category && (
              <span className="font-medium uppercase tracking-wider text-amber-500 dark:text-amber-400">
                {blog.category}
              </span>
            )}

            <span>•</span>

            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {blog.readTime}
            </span>

            <span>•</span>

            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-amber-500 dark:text-white dark:group-hover:text-amber-400">
            {blog.title}
          </h3>

          {/* Summary */}
          <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {blog.summary}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-lg
                  border border-zinc-200
                  bg-zinc-100
                  px-2 py-1
                  text-[10px]
                  text-zinc-600
                  dark:border-zinc-700
                  dark:bg-zinc-800
                  dark:text-zinc-300
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}