import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  useCreateBlog,
  useUpdateBlog,
  useUploadThumbnail 
} from "../../hooks/blogs";
import { useCategories } from "../../hooks/categories/useCategories";
import { 
  createBlogSchema, 
  updateBlogSchema, 
  type CreateBlogInput,
  type UpdateBlogInput,
  type BlogFormData
} from "../../schema/blogs";

interface BlogFormProps {
  blog?: BlogFormData & { id?: string; thumbnail_url?: string };
  mode: "create" | "edit";
  onSuccess?: () => void;
}

const DEFAULT_VALUES: Partial<BlogFormData> = {
  title: "",
  content: "",
  category_id: "",
  status: "draft",
  tags: [],
  featured: false,
  readTime: "",
};


const BlogForm = ({ blog, mode, onSuccess }: BlogFormProps) => {
  
  // Hooks & Mutations
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { mutateAsync: createBlog, isPending: creating } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: updating } = useUpdateBlog();
  const { mutateAsync: uploadThumbnail, isPending: uploading } = useUploadThumbnail();

  // Local State
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(blog?.thumbnail_url || null);
  const [tagInput, setTagInput] = useState("");

  // Select schema dynamically
  const schemaToApply = mode === "create" 
    ? createBlogSchema 
    : updateBlogSchema;

  // Pending states
  const isPending = creating || updating || uploading;

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(schemaToApply),
    defaultValues: DEFAULT_VALUES,
    values: mode === "edit" && blog 
      ? (blog as BlogFormData) 
      : undefined,
  });

  const tags = watch("tags") || [];

  // File Preview Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  // Tag Handlers
  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;
    setValue("tags", [...tags, value], { shouldValidate: true });
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setValue(
      "tags", 
      newTags, 
      { shouldValidate: true }
    );
  };

const handleFormSubmit = async (data: BlogFormData) => {
  try {
    let blogId = blog?.id;

    if (mode === "create") {
      const payload = {
        title: data.title,
        content: data.content,
        category_id: data.category_id,
        status: data.status,
        tags,
        featured: data.featured,
        readTime: data.readTime,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // createBlog handles post data + thumbnail simultaneously
      const createdBlog = await createBlog(formData);
      blogId = createdBlog?.id;

    } else if (mode === "edit" && blogId) {
      await updateBlog({
        id: blogId, 
        data: data as UpdateBlogInput 
      }, {
        onSuccess: () => {
          onSuccess?.()
        }
      });

      // Upload thumbnail ONLY if a new file was chosen in edit mode
      if (thumbnail) {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        
        await uploadThumbnail({ 
          id: blogId, 
          formData 
        });
      }
    }

    reset();
    onSuccess?.();
  } catch (error) {
    console.error("Form submission failed:", error);
  }
};



  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 box-border font-sans">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-8 lg:flex-row lg:items-start">
        
        {/* Left Column: Primary Content */}
        <div className="w-full flex-1 space-y-6 min-w-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              {mode === "edit" ? "Edit Post" : "Create Post"}
            </h2>
            <p className="text-sm text-neutral-500 mt-1">Draft and details for your next publication.</p>
          </div>

          <div>
            <label className="label">Title</label>
            <input {...register("title")} placeholder="Post title..." className="input" />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="label">Content</label>
            <textarea
              {...register("content")}
              rows={12}
              placeholder="Write your story..."
              className="textarea"
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
            <label className="label">Thumbnail</label>
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

          {/* Read Time */}
          <div>
            <label className="label">Read Time</label>
            <input placeholder="5 min" {...register("readTime")} className="input" />
            {errors.readTime && <p className="mt-1 text-xs text-red-500">{errors.readTime.message}</p>}
          </div>

          {/* Category & Status */}
          <div className="grid lg:grid-cols-2 gap-3">
            <div>
              <label className="label">Category</label>
              <select className="input" disabled={loadingCategories} {...register("category_id")}>
                <option value="">
                  {loadingCategories ? "Loading..." : "Select category"}
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id.message}</p>}
            </div>

            <div>
              <label className="label">Status</label>
              <select {...register("status")} className="input cursor-pointer">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="label">Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="New tag..."
                className="input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
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
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-100 px-2 py-0.5 text-xs text-amber-800 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    <span>{tag}</span>
                    <span className="font-bold text-[10px]">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Featured Toggle */}
          <label className="flex items-center gap-3 cursor-pointer py-1 select-none">
            <input
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-500 accent-amber-500"
            />
            <span className="text-xs font-medium text-neutral-600">
              Feature this post on home
            </span>
          </label>

          <hr className="border-neutral-100 my-1" />

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-amber-500 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 active:bg-amber-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed shadow-sm"
          >
            {isPending
              ? "Saving..."
              : mode === "edit"
              ? "Update Post"
              : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
