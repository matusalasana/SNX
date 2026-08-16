import { useState } from "react";
import { Plus, X, FileText } from "lucide-react";
import BlogForm from "../../components/admin/BlogForm";
import {useDeleteBlog } from "../../hooks/blogs";
import {useBlogs } from "../../hooks/admin/useBlogs";
import { BlogFormData } from "../../schema/blogs";
import BlogCard from "../../components/admin/BlogCard";
import { Skeleton } from "../../utils/skeleton";

export function AdminBlogs() {
  const { data: blogs = [], isLoading } = useBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();

  const [selected, setSelected] = useState<BlogFormData | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);

  const openCreate = () => {
    setSelected(null);
    setFormMode("create");
  };

  const openEdit = (blog: BlogFormData) => {
    setSelected(blog);
    setFormMode("edit");
  };

  const closeModal = () => {
    setSelected(null);
    setFormMode(null);
  };

  if (isLoading) {
    return (
      <main className="container-custom section min-h-screen space-y-8 bg-background text-content">
        <div className="flex-between items-center">
          <Skeleton className="skeleton h-10 w-48" />
          <Skeleton className="skeleton h-10 w-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card space-y-4 p-6">
              <Skeleton className="skeleton aspect-video w-full rounded-xl" />
              <Skeleton className="skeleton h-6 w-3/4" />
              <Skeleton className="skeleton h-4 w-full" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="container-custom section min-h-screen bg-background text-content">
      <div className="mx-auto space-y-8">
        {/* Header */}
        <div className="flex-between items-center">
          <div>
            <h1 className="heading text-3xl sm:text-4xl">Articles</h1>
            <p className="subheading mt-1 text-sm">
              Manage, edit, and publish blog articles.
            </p>
          </div>

          <button onClick={openCreate} className="btn-primary">
            <Plus className="h-4 w-4" />
            <span>New Blog</span>
          </button>
        </div>

        {/* Empty State vs Grid */}
        {blogs.length === 0 ? (
          <div className="card flex-center flex-col p-12 text-center">
            <div className="flex-center mb-4 h-12 w-12 rounded-full bg-muted text-secondary">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="heading text-xl font-semibold">No articles found</h2>
            <p className="subheading mt-1 max-w-sm text-sm">
              You haven't published any articles yet. Create your first post to get started.
            </p>
            <button onClick={openCreate} className="btn-primary mt-6">
              <Plus className="h-4 w-4" />
              <span>Create First Post</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={() => openEdit(blog)}
                onDelete={() => deleteBlog(blog.id)}
              />
            ))}
          </div>
        )}

        {/* Modal Overlay */}
        {formMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm">
            <div className="card relative max-h-[90vh] w-full max-w-4xl overflow-y-auto p-6 sm:p-8 shadow-xl">
              <button
                onClick={closeModal}
                className="btn-ghost absolute right-4 top-4 p-2 text-secondary hover:text-content"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <BlogForm
                mode={formMode}
                onSuccess={closeModal}
                blog={selected ?? undefined}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminBlogs;
