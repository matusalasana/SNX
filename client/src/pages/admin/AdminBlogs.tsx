import { useState } from "react";
import BlogForm from "../../components/admin/BlogForm";
import { useBlogs, useDeleteBlog } from "../../hooks/blogs";
import { UpdateBlogInput } from "../../schema/blogs";

type ViewMode = "list" | "create" | "edit";

export function AdminBlogs() {
  // 1. Data Fetching Hooks
  const { data: blogs, isLoading, isError, refetch } = useBlogs();
  const { mutateAsync: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  // 2. Local View & Selection State
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedBlog, setSelectedBlog] = useState<
    (UpdateBlogInput & { id: string; thumbnail_url?: string }) | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Handlers
  const handleOpenCreate = () => {
    setSelectedBlog(null);
    setViewMode("create");
  };

  const handleOpenEdit = (
    blog: UpdateBlogInput & { id: string; thumbnail_url?: string }
  ) => {
    setSelectedBlog(blog);
    setViewMode("edit");
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
    setViewMode("list");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }
    try {
      await deleteBlog(id);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  // Filtered blogs for quick client-side search
  const filteredBlogs = blogs?.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-neutral-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Blog Management
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Create, update, and manage your published articles.
            </p>
          </div>

          {viewMode === "list" ? (
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </button>
          ) : (
            <button
              onClick={handleBackToList}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              ← Back to All Posts
            </button>
          )}
        </div>

        {/* View Switching Logic */}
        {viewMode === "create" || viewMode === "edit" ? (
          <div className="bg-white rounded-xl border border-neutral-200/80 shadow-sm p-2 sm:p-6">
            <BlogForm
              mode={viewMode}
              blog={selectedBlog || undefined}
              onSuccess={() => {
                handleBackToList();
                refetch();
              }}
            />
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl border border-neutral-200/80 shadow-sm overflow-hidden">
            
            {/* Search & Filter Toolbar */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search posts by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-sm rounded-lg border border-neutral-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">
                Total: {filteredBlogs?.length || 0}
              </span>
            </div>

            {/* Table State Handling */}
            {isLoading ? (
              <div className="p-12 text-center text-sm text-neutral-500">Loading blog posts...</div>
            ) : isError ? (
              <div className="p-12 text-center text-sm text-red-500">Failed to load blogs. Please try again.</div>
            ) : filteredBlogs?.length === 0 ? (
              <div className="p-12 text-center text-sm text-neutral-400">
                No blog posts found. Click "Create New Post" to write one!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-neutral-600">
                  <thead className="bg-neutral-50/80 border-b border-neutral-100 text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Article</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Read Time</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredBlogs?.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                        
                        {/* Title & Cover */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {item.thumbnail_url ? (
                              <img
                                src={item.thumbnail_url}
                                alt={item.title}
                                className="w-12 h-12 rounded-md object-cover border border-neutral-200/60 shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-md bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-[10px] text-neutral-400 shrink-0">
                                No Cover
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-neutral-900 truncate max-w-md">
                                {item.title}
                              </p>
                              {item.featured && (
                                <span className="inline-block mt-0.5 rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-semibold text-amber-800">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              item.status === "published"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                            }`}
                          >
                            {item.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>

                        {/* Read Time */}
                        <td className="py-3.5 px-4 text-xs text-neutral-500">
                          {item.readTime || "—"}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(item as any)}
                              className="rounded-md px-2.5 py-1 text-xs font-medium text-neutral-700 border border-neutral-200 hover:bg-neutral-100 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              disabled={isDeleting}
                              className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 border border-red-100 bg-red-50/50 hover:bg-red-100 hover:text-red-700 transition-colors disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlogs;
