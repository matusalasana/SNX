import { useParams, Link } from "react-router-dom";
import { useBlog } from "../../hooks/blogs/useBlog";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Skeleton } from "../../utils/skeleton";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: blog, isLoading } = useBlog(id!);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-6 space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-6 text-center">
        <p className="text-zinc-400">Blog post not found.</p>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 mt-4 text-amber-400 hover:text-amber-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-24 px-6">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to articles
      </Link>

      {/* Meta */}
      <header className="space-y-4 mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          {blog.category && (
            <span className="text-amber-400 uppercase tracking-wider">
              {blog.category}
            </span>
          )}

          {blog.featured && (
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              Featured
            </span>
          )}

          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </span>

          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>

          <span>•</span>

          <span>By {blog.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {blog.title}
        </h1>

        {/* Summary */}
        <p className="text-zinc-400 text-lg leading-relaxed">
          {blog.summary}
        </p>
      </header>

      {/* Thumbnail */}
      {blog.thumbnailUrl && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-zinc-800/60">
          <img
            src={blog.thumbnailUrl}
            alt={blog.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="text-zinc-300 leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      {/* Tags */}
      <div className="mt-10 flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="
              text-xs px-3 py-1
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

      {/* CTA */}
      <div className="mt-16 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <h3 className="text-white font-semibold mb-2">
          Enjoyed this article?
        </h3>

        <p className="text-zinc-400 text-sm mb-4">
          Let’s connect and build something interesting together.
        </p>

        <Link
          to="/contact"
          className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-amber-500
            text-black
            text-sm font-medium
            hover:bg-amber-400
            transition
          "
        >
          Contact Me
        </Link>
      </div>
    </article>
  );
}