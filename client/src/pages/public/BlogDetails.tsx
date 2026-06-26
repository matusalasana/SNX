import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import { Clock, Calendar, ArrowLeft, Star } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blogs = [], isLoading } = useBlogs();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blog = useMemo(() => blogs.find((b) => b.id === id), [blogs, id]);

  if (isLoading) return <BlogDetailsSkeleton />;

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Blog post not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 inline-flex items-center gap-2 text-amber-500 hover:text-amber-600">
          <ArrowLeft className="h-4 w-4" /> Go back
        </button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 dark:bg-zinc-900 dark:text-zinc-200">
      {/* Back Link */}
      <Link to="/blog" className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-amber-500 dark:text-zinc-400">
        <ArrowLeft className="h-4 w-4" /> Back to articles
      </Link>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          {blog.category && <span className="uppercase tracking-wider text-amber-500">{blog.category}</span>}
          {blog.featured && (
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" /> Featured
            </span>
          )}
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.readTime}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>By {blog.author}</span>
        </div>

        <h1 className="leading-tight text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl">
          {blog.title}
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{blog.summary}</p>
      </header>

      {/* Thumbnail */}
      {blog.thumbnailUrl && (
        <img src={blog.thumbnailUrl} alt={blog.title} className="mb-10 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800" />
      )}

      {/* Content - Replace the div with a Markdown renderer for better experience */}
      <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-amber-500">
        {blog.content}
      </div>

      {/* Tags */}
      <div className="mt-10 flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <span key={tag} className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">Enjoyed this article?</h3>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">Let’s connect and build something interesting together.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-amber-500">
          Contact Me
        </Link>
      </div>
    </article>
  );
}

const BlogDetailsSkeleton = () => (
  <div className="mx-auto max-w-3xl space-y-6 px-6 py-24">
    <Skeleton className="h-6 w-32" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-64 w-full rounded-2xl" />
    <Skeleton className="h-40 w-full" />
  </div>
);
