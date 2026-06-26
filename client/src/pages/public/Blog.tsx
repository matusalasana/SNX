import { useMemo } from "react";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import BlogCard from "../../components/common/BlogCard";
import { Skeleton } from "../../utils/skeleton";
import { BookOpen } from "lucide-react";

export default function BlogsPage() {
  const { data: blogs = [], isLoading } = useBlogs();

  const { featured, regular } = useMemo(() => {
    const published = blogs
      .filter((b) => b.status === "published")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      featured: published.filter((b) => b.featured),
      regular: published.filter((b) => !b.featured),
    };
  }, [blogs]);

  if (isLoading) return <BlogsSkeleton />;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-zinc-200 dark:bg-zinc-900">
      <header className="mb-14">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">Writing</span>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-amber-500" />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">All Articles</h1>
        </div>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Thoughts, engineering notes, tutorials, and lessons learned while building full-stack applications.
        </p>
      </header>

      {featured.length > 0 && <BlogSection title="Featured Posts" items={featured} />}
      {regular.length > 0 && <BlogSection title="Latest Posts" items={regular} isFeatured={false} />}
    </section>
  );
}

const BlogSection = ({ title, items, isFeatured = true }: { title: string; items: any[]; isFeatured?: boolean }) => (
  <div className="mb-16">
    <h2 className={`mb-6 text-sm font-medium uppercase tracking-widest ${isFeatured ? "text-amber-500" : "text-zinc-500 dark:text-zinc-400"}`}>
      {title}
    </h2>
    <div className={`grid grid-cols-1 gap-6 ${isFeatured ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
      {items.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  </div>
);

const BlogsSkeleton = () => (
  <section className="mx-auto max-w-6xl px-6 py-24">
    <div className="mb-14 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-72" />
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-2xl" />
      ))}
    </div>
  </section>
);
