import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import { Blog } from "../../types/blogs"

interface BlogProps {
  blog: Blog;
}

export default function BlogCard({blog}: BlogProps) {
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-500/10 blur-3xl" />
      </div>

      <Link to={`/blogs/${blog.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
          {blog.thumbnailUrl ? (
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="
                w-full h-full object-cover
                opacity-80
                group-hover:opacity-100
                group-hover:scale-105
                transition-all duration-500
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm">
              No Preview
            </div>
          )}

          {/* Featured badge */}
          {blog.featured && (
            <div className="absolute top-4 left-4">
              <span className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Star className="w-3 h-3 fill-current" />
                New
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
            {blog.category && (
              <span className="text-amber-400 uppercase tracking-wider">
                {blog.category}
              </span>
            )}

            <span>•</span>

            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {blog.readTime}
            </span>

            <span>•</span>

            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition line-clamp-2">
            {blog.title}
          </h3>

          {/* Summary */}
          <p className="mt-3 text-sm text-zinc-400 line-clamp-3">
            {blog.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  text-[10px]
                  px-2 py-1
                  rounded-lg
                  border border-zinc-800
                  bg-zinc-900/40
                  text-zinc-400
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