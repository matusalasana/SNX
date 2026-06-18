import { useBlogs } from "../../hooks/blogs/useBlogs";
import BlogCard from "../common/BlogCard";
import { Skeleton } from "../../utils/skeleton";

export default function RecentBlogs() {
  const { data: blogs = [], isLoading } = useBlogs();

  // sort newest first
  const recentBlogs = [...blogs]
    .filter((b) => b.status === "published")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-24 border-t border-zinc-900">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 overflow-hidden"
            >
              <Skeleton className="aspect-[16/9] w-full" />

              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-6 w-14 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-lg" />
                  <Skeleton className="h-6 w-12 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!recentBlogs.length) {
    return (
      <section className="max-w-6xl mx-auto py-24 border-t border-zinc-900 text-center">
        <p className="text-zinc-500">No blog posts yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-24 border-t border-zinc-900">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />

          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Writing
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white tracking-tight">
          Recent Articles
        </h2>

        <p className="mt-3 text-zinc-400 max-w-2xl">
          Thoughts, notes, and lessons learned while building modern
          full-stack applications and APIs.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}