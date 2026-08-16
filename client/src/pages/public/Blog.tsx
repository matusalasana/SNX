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
    <section className="container-custom section bg-background text-content">
      <header className="mb-14">
        <div className="flex-start mb-3 gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
          <span className="text-primary text-xs font-medium uppercase tracking-[0.25em]">
            Writing
          </span>
        </div>
        <div className="flex-start mb-4 gap-3">
          <BookOpen className="text-primary h-6 w-6" />
          <h1 className="heading text-3xl">All Articles</h1>
        </div>
        <p className="subheading max-w-2xl text-base">
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
    <h2 className={`mb-6 text-sm font-medium uppercase tracking-widest ${isFeatured ? "text-primary" : "subheading"}`}>
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
  <section className="container-custom section">
    <div className="mb-14 space-y-3">
      <Skeleton className="skeleton h-4 w-24" />
      <Skeleton className="skeleton h-10 w-72" />
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="skeleton h-64 w-full rounded-2xl" />
      ))}
    </div>
  </section>
);
