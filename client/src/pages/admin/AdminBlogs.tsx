import { Plus, Edit3, Trash2 } from "lucide-react";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import BlogCard from "../../components/admin/BlogCard";
import BlogForm from "../../components/admin/BlogForm";
import { useBlogForm } from "../../hooks/blogs/useBlogForm";

export default function AdminBlogs() {
  const { data: blogs = [] } = useBlogs();

  const {
    modal,
    openCreate,
    openEdit,
    closeModal,
    submitBlog,
    deleteBlog,
    currentBlog,
    isEditing,
    creating,
    updating,
  } = useBlogForm();

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-amber-400">
          Blog Admin
        </h1>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative group">

            <BlogCard
              blog={blog}
              onDelete={() => deleteBlog(blog.id)}
              onEdit={() => openEdit(blog)}
            />

            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => openEdit(blog)}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg"
              >
                <Edit3 className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => deleteBlog(blog.id)}
                className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h2 className="text-amber-400 text-xl mb-4">
              {modal === "create" ? "Create Blog" : "Edit Blog"}
            </h2>

            <BlogForm
              mode={modal === "create" ? "create" : "edit"}
              blog={currentBlog}
              onSubmit={submitBlog}
              loading={creating || updating}
            />

            <button
              onClick={closeModal}
              className="mt-4 text-zinc-400 text-sm"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </section>
  );
}