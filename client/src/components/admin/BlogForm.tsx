import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema, type BlogFormData } from "../../schema/blogs";
import { useCreateBlog } from "../../hooks/blogs/useCreateBlog";

const BlogForm = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const { mutate: createBlog, isPending } = useCreateBlog();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      thumbnailUrl: "",
      status: "draft",
      readTime: "",
      author: "",
      tags: [],
      category: "",
      featured: false,
    },
  });

  const tags = watch("tags") || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;

    setValue("tags", [...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setValue("tags", tags.filter((t) => t !== tag));
  };

  const onSubmit = (data: BlogFormData) => {
    try {
      const formData = new FormData();
      const payload = {
        title: data.title,
        content: data.content,
        summary: data.summary,
        status: data.status,
        readTime: data.readTime,
        author: data.author,
        category: data.category,
        tags: data.tags,
        featured: data.featured,
      };

      // only file stays separate
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // everything else goes as ONE JSON blob
      formData.append("data", JSON.stringify(payload));
    
      createBlog(formData);
    
    } catch (error) {
      console.error(error);
    }
  };

  // Shared minimal tailwind styles
  const labelStyles = "block text-xs font-medium text-neutral-500 mb-1 tracking-wide uppercase";
  const inputStyles = "w-full bg-neutral-50 border border-neutral-200 rounded-md px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 box-border font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 lg:flex-row lg:items-start"
      >
        {/* Left Column: Primary Content */}
        <div className="w-full flex-1 space-y-6 min-w-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Create Post</h2>
            <p className="text-sm text-neutral-500 mt-1">Draft and details for your next publication.</p>
          </div>

          <div>
            <label className={labelStyles}>Title</label>
            <input 
              {...register("title")} 
              placeholder="Post title..." 
              className={inputStyles}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className={labelStyles}>Summary</label>
            <textarea 
              {...register("summary")} 
              rows={2} 
              placeholder="Brief summary..." 
              className={inputStyles}
            />
            {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary.message}</p>}
          </div>

          <div>
            <label className={labelStyles}>Content</label>
            <textarea 
              {...register("content")} 
              rows={12} 
              placeholder="Write your story..." 
              className={`${inputStyles} font-mono text-xs leading-relaxed`}
            />
            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
          </div>
        </div>

        {/* Right Column: Settings Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-5 rounded-lg border border-neutral-200 bg-white p-5 box-border shadow-sm">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 pb-2">
            Metadata
          </h3>

          {/* Thumbnail */}
          <div>
            <label className={labelStyles}>Thumbnail</label>
            <label 
              htmlFor="thumbnail" 
              className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-neutral-200 bg-neutral-50 transition hover:bg-neutral-100/50 overflow-hidden"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <span className="text-xs font-medium text-neutral-600 block">Upload Cover</span>
                  <span className="mt-0.5 text-[10px] text-neutral-400 block">PNG, JPG, WEBP</span>
                </div>
              )}
            </label>
            <input id="thumbnail" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>

          {/* Author & Read Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelStyles}>Author</label>
              <input {...register("author")} className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Read Time</label>
              <input placeholder="5 min" {...register("readTime")} className={inputStyles} />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelStyles}>Category</label>
              <input {...register("category")} className={inputStyles} />
            </div>
            <div>
              <label className={labelStyles}>Status</label>
              <div className="relative">
                <select {...register("status")} className={`${inputStyles} appearance-none pr-8 cursor-pointer`}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className={labelStyles}>Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="New tag..."
                className={inputStyles}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              />
              <button 
                type="button" 
                onClick={addTag} 
                className="rounded-md border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors shrink-0"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 max-w-full overflow-hidden">
                {tags.map((tag) => (
                  <button 
                    key={tag} 
                    type="button" 
                    onClick={() => removeTag(tag)} 
                    className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-100 pl-2 pr-1.5 py-0.5 text-xs text-amber-800 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors truncate max-w-full"
                  >
                    <span className="truncate">{tag}</span> 
                    <span className="text-amber-400 hover:text-red-50 font-bold text-[10px]">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Featured Toggle */}
          <label className="flex items-center gap-3 cursor-pointer py-1 select-none group">
            <input 
              type="checkbox" 
              {...register("featured")} 
              className="h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-500 accent-amber-500 shrink-0 transition" 
            />
            <span className="text-xs font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
              Feature this post on home
            </span>
          </label>

          <hr className="border-neutral-100 my-1" />

          {/* Submit */}
          <button
            disabled={isPending}
            className="w-full rounded-md bg-amber-500 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 active:bg-amber-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed touch-manipulation shadow-sm"
          >
            {isPending ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;