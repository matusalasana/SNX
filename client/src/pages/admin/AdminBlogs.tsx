import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";

import { useBlogs } from "../../hooks/blogs/useBlogs";
import { useCreateBlog } from "../../hooks/blogs/useCreateBlog";
import { useUpdateBlog } from "../../hooks/blogs/useUpdateBlog";
import { useDeleteBlog } from "../../hooks/blogs/useDeleteBlog";

import BlogCard from "../../components/admin/BlogCard";
import BlogForm from "../../components/admin/BlogForm";

type Blog = {
  id: string;
} & any;

export default function AdminBlogs() {
  const { data: blogs = [] } = useBlogs();

  const { mutate: createBlog, isPending: creating } = useCreateBlog();
  const { mutate: updateBlog, isPending: updating } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Blog | null>(null);

  const handleSubmit = (data: any) => {
    if (edit) {
      updateBlog({ id: edit.id, data });
    } else {
      createBlog(data);
    }

    setOpen(false);
    setEdit(null);
  };

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-amber-400">
          Blog Admin
        </h1>

        <button
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          New Blog
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog: Blog) => (
          <div key={blog.id} className="relative group">

            <BlogCard 
              blog={blog}
              onDelete={() => deleteBlog(blog.id)}
            />

            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => {
                  setEdit(blog);
                  setOpen(true);
                }}
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
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h2 className="text-amber-400 text-xl mb-4">
              {edit ? "Edit Blog" : "Create Blog"}
            </h2>

            <BlogForm
              initialData={edit || undefined}
              onSubmit={handleSubmit}
              loading={creating || updating}
            />

            <button
              onClick={() => setOpen(false)}
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