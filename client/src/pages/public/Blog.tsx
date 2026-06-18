import { useBlogs } from "../../hooks/blogs/useBlogs";
import BlogCard from "../../components/common/BlogCard";
import { Skeleton } from "../../utils/skeleton";
import { BookOpen } from "lucide-react";

export default function BlogsPage() {
  const { data: blogs = [], isLoading } = useBlogs();

  const publishedBlogs = blogs
    .filter((b) => b.status === "published")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  const featured = publishedBlogs.filter((b) => b.featured);
  const regular = publishedBlogs.filter((b) => !b.featured);

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-24 px-6">
        {/* Header skeleton */}
        <div className="mb-14 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 overflow-hidden"
            >
              <Skeleton className="aspect-[16/9] w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-24 px-6">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Writing
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-amber-400" />

          <h1 className="text-3xl font-bold text-white">
            All Articles
          </h1>
        </div>

        <p className="text-zinc-400 max-w-2xl">
          Thoughts, engineering notes, tutorials, and lessons learned
          while building full-stack applications.
        </p>
      </div>

      {/* Featured Section */}
      {featured.length > 0 && (
        <div className="mb-16">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-6">
            Featured Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
          Latest Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}