import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { blogSchema, BlogFormData } from "../../schema/blogs";

type Props = {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => void;
  loading?: boolean;
};

export default function BlogForm({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      readTime: "",
      tags: [],
      featured: false,
      status: "draft",
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-white"
    >

      {/* TITLE */}
      <div>
        <input
          {...register("title")}
          placeholder="Title"
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
        />
        {errors.title && (
          <p className="text-red-400 text-xs mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* SUMMARY */}
      <div>
        <input
          {...register("summary")}
          placeholder="Summary"
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
        />
        {errors.summary && (
          <p className="text-red-400 text-xs mt-1">
            {errors.summary.message}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div>
        <textarea
          {...register("content")}
          placeholder="Content"
          rows={6}
          className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
        />
        {errors.content && (
          <p className="text-red-400 text-xs mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* CATEGORY + READ TIME */}
      <div className="grid grid-cols-2 gap-3">
        <input
          {...register("category")}
          placeholder="Category"
          className="p-3 rounded-xl bg-zinc-950 border border-zinc-800"
        />

        <input
          {...register("readTime")}
          placeholder="Read time (e.g. 5 min)"
          className="p-3 rounded-xl bg-zinc-950 border border-zinc-800"
        />
      </div>

      {/* TAGS (comma separated) */}
      <input
        placeholder="Tags (comma separated)"
        onChange={(e) =>
          reset({
            ...initialData,
            tags: e.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          })
        }
        className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800"
      />

      {/* FEATURED + STATUS */}
      <div className="flex items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("featured")} />
          Featured
        </label>

        <select
          {...register("status")}
          className="bg-zinc-950 border border-zinc-800 p-2 rounded-lg"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-3 rounded-xl
          bg-amber-500 text-black
          hover:bg-amber-400
          transition
        "
      >
        {loading ? "Saving..." : "Save Blog"}
      </button>
    </form>
  );
}