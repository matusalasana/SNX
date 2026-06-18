import { useState } from "react";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import { useDeleteBlog } from "../../hooks/blogs/useDeleteBlog";
import { Skeleton } from "../../utils/skeleton";
import { FileText, Trash2, Edit3 } from "lucide-react";
import BlogCard from "../../components/common/BlogCard";

type Blog = {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  tags: string[];
  createdAt: string;
  featured: boolean;
  status: "published" | "draft";
};

export default function AdminBlogs() {
  const { data: blogs = [], isLoading } = useBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();

  const [selected, setSelected] = useState<Blog | null>(null);

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const featured = sortedBlogs.filter((b) => b.featured);
  const drafts = sortedBlogs.filter((b) => b.status === "draft");
  const published = sortedBlogs.filter((b) => b.status === "published");

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800 p-5 space-y-3"
            >
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">

      {/* HEADER */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-6 h-6 text-amber-400" />
          <h1 className="text-3xl font-bold">Blog Management</h1>
        </div>

        <p className="text-zinc-400">
          Create, edit, publish, or delete blog posts.
        </p>
      </div>

      {/* FEATURED */}
      {featured.length > 0 && (
        <div className="mb-14">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-6">
            Featured Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((blog) => (
              <div key={blog.id} className="relative group">

                <BlogCard blog={blog} />

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/40"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/40"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PUBLISHED */}
      <div className="mb-14">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
          Published
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map((blog) => (
            <div key={blog.id} className="relative group">

              <BlogCard blog={blog} />

              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/40">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                </button>

                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/40"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* DRAFTS */}
      {drafts.length > 0 && (
        <div>
          <h2 className="text-sm uppercase tracking-widest text-zinc-600 mb-6">
            Drafts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((blog) => (
              <div key={blog.id} className="relative group opacity-70">

                <BlogCard blog={blog} />

                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/40">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-red-500/40"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}