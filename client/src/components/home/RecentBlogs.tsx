import { useBlogs } from "../../hooks/blogs/useBlogs";
import BlogCard from "../common/BlogCard";
import { Skeleton } from "../../utils/skeleton";
import SectionTitle from "../common/SectionTitle";

export default function RecentBlogs() {
  const {
    data: blogs = [],
    isLoading,
  } = useBlogs();

  const recentBlogs = [...blogs]
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  if (isLoading) {
    return (
      <section className="container-custom border-t border-border py-24">
        {/* Header Skeleton */}
        <div className="mb-14 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border"
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
      <section className="container-custom border-t border-border py-24 text-center">
        <p className="text-secondary">
          No blog posts yet.
        </p>
      </section>
    );
  }

  return (
    <section className="container-custom border-t border-border py-24">
      {/* Header */}
      <SectionTitle
        eyebrow="writing"
        title="Recent Articles"
        description="Thoughts, notes, and lessons learned while building modern full-stack applications and APIs."
      />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
}