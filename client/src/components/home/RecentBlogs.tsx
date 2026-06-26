import { useBlogs } from "../../hooks/blogs/useBlogs";
import BlogCard from "../common/BlogCard";
import { Skeleton } from "../../utils/skeleton";
import SectionTitle from "../common/SectionTitle"

export default function RecentBlogs() {
  const { data: blogs = [], isLoading } = useBlogs();

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
      <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 dark:border-zinc-800">
        {/* Header Skeleton */}
        <div className="mb-14 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
            >
              <Skeleton className="aspect-[16/9] w-full" />

              <div className="space-y-4 p-6">
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
      <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 text-center dark:border-zinc-800">
        <p className="text-zinc-500 dark:text-zinc-400">
          No blog posts yet.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl border-t border-zinc-200 py-24 dark:border-zinc-800">
      {/* Header */}
      <SectionTitle
        eyebrow="writing"
        title="Recent Articles"
        description="Thoughts, notes, and lessons learned while building modern full-stack
          applications and APIs."
      />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}