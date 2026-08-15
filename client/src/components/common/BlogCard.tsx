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
        card
        group
        overflow-hidden
        p-0
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary
      "
    >
      <Link to={`/blogs/${blog.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
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
            <div className="flex h-full w-full items-center justify-center text-sm text-secondary">
              No Preview
            </div>
          )}

          {/* Featured */}
          {blog.featured && (
            <div className="absolute left-4 top-4">
              <span className="badge border border-primary/20 bg-primary/10 text-primary">
                <Star className="size-3 fill-current" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-secondary">
            {blog.category && (
              <span className="font-medium uppercase tracking-wider text-primary">
                {blog.category}
              </span>
            )}

            <span>•</span>

            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {blog.readTime}
            </span>

            <span>•</span>

            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
              line-clamp-2
              text-lg font-semibold
              text-content
              transition-colors
              group-hover:text-primary
            "
          >
            {blog.title}
          </h3>

          {/* Summary */}
          <p className="mt-3 line-clamp-3 text-sm text-secondary">
            {blog.summary}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-lg
                  border border-border
                  bg-muted
                  px-2 py-1
                  text-[10px]
                  text-secondary
                  transition-colors
                  hover:border-primary/30
                  hover:text-primary
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