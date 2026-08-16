import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, Plus, Clock } from "lucide-react";

import {
  useCreateBlog,
  useUpdateBlog,
  useUploadThumbnail,
} from "../../hooks/blogs";
import { useCategories } from "../../hooks/categories/useCategories";
import {
  createBlogSchema,
  updateBlogSchema,
  type BlogFormData,
  type UpdateBlogInput,
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
  const { data: categories, isLoading: loadingCategories } = useCategories();

  const { mutateAsync: createBlog, isPending: creating } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: updating } = useUpdateBlog();
  const { mutateAsync: uploadThumbnail, isPending: uploading } =
    useUploadThumbnail();

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    blog?.thumbnail_url || null
  );
  const [tagInput, setTagInput] = useState("");

  const schemaToApply =
    mode === "create" ? createBlogSchema : updateBlogSchema;

  const isPending = creating || updating || uploading;

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
    values: mode === "edit" && blog ? (blog as BlogFormData) : undefined,
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

    setValue("tags", [...tags, value], {
      shouldValidate: true,
    });
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
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

        const createdBlog = await createBlog(formData);
        blogId = createdBlog?.id;
      }

      if (mode === "edit" && blogId) {
        await updateBlog({
          id: blogId,
          data: data as UpdateBlogInput,
        });

        if (thumbnail) {
          const formData = new FormData();
          formData.append("thumbnail", thumbnail);

          await uploadThumbnail({
            id: blogId,
            formData,
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
    <div className="container-custom section">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-8 lg:flex-row lg:items-start"
      >
        {/* Primary Content */}
        <div className="min-w-0 w-full flex-1 space-y-6">
          <div>
            <h2 className="heading text-2xl sm:text-3xl">
              {mode === "edit" ? "Edit Post" : "Create Post"}
            </h2>
            <p className="subheading mt-1 text-sm">
              Draft and details for your next publication.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              {...register("title")}
              placeholder="Post title..."
              className="input"
            />
            {errors.title?.message && (
              <p className="error-text mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="label">Content</label>
            <textarea
              {...register("content")}
              rows={14}
              placeholder="Write your story..."
              className="textarea"
            />
            {errors.content?.message && (
              <p className="error-text mt-1">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Metadata Sidebar */}
        <div className="card w-full shrink-0 space-y-5 lg:w-[320px]">
          <h3 className="text-secondary border-b border-border pb-2 text-xs font-semibold uppercase tracking-wider">
            Metadata
          </h3>

          {/* Thumbnail Upload */}
          <div>
            <label className="label">Cover Thumbnail</label>

            <label
              htmlFor="thumbnail"
              className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-background transition-colors hover:border-primary"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="image-cover"
                />
              ) : (
                <div className="flex-center flex-col p-4 text-center">
                  <Upload className="text-secondary group-hover:text-primary h-6 w-6 transition-colors" />
                  <span className="text-content mt-2 block text-xs font-medium">
                    Upload Cover
                  </span>
                  <span className="text-secondary mt-1 block text-[10px]">
                    PNG, JPG, WEBP
                  </span>
                </div>
              )}
            </label>

            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="label">Read Time</label>
            <div className="relative">
              <Clock className="text-secondary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <input
                {...register("readTime")}
                placeholder="e.g. 5 min"
                className="input pl-10"
              />
            </div>
            {errors.readTime?.message && (
              <p className="error-text mt-1">{errors.readTime.message}</p>
            )}
          </div>

          {/* Category + Status */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <label className="label">Category</label>
              <select
                {...register("category_id")}
                disabled={loadingCategories}
                className="input cursor-pointer"
              >
                <option value="">
                  {loadingCategories ? "Loading..." : "Select category"}
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id?.message && (
                <p className="error-text mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Status</label>
              <select
                {...register("status")}
                className="input cursor-pointer"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="label">Tags</label>
            <div className="flex-start gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="New tag..."
                className="input"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-outline shrink-0 px-3"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="badge flex-start gap-1 transition-colors hover:border-danger hover:text-danger"
                  >
                    <span>{tag}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Featured Checkbox */}
          <label className="flex-start cursor-pointer select-none gap-3">
            <input
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-primary/30"
            />
            <span className="text-content text-sm">
              Feature this post on home
            </span>
          </label>

          <hr className="border-border" />

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full"
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
