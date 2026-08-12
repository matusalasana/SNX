import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Project } from "../../types/projects";
import { createProjectSchema } from "../../schema/projects"; 
import { useCategories } from "../../hooks/categories/useCategories"; 
import { zodResolver } from "@hookform/resolvers/zod";
interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
  loading?: boolean;
  onSubmit: (formData: FormData) => void;
}

export default function ProjectForm({
  project,
  mode,
  loading = false,
  onSubmit,
}: ProjectFormProps) {
  const { data: categories, isLoading } = useCategories();
  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<Project>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      category_id: "",
      description: "",
      tags: [],
      githubUrl: "",
      liveUrl: "",
      featured: false,
    },
  });

  const tags = watch("tags") || [];

  useEffect(() => {
    if (!project) return;

    reset(project);

    if (project.thumbnailUrl) {
      setThumbnailPreview(project.thumbnailUrl);
    }

  }, [project, reset]);

  // ---------------- TAGS ----------------
  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;

    setValue("tags", [...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
  };

  // ---------------- THUMBNAIL ----------------
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // ---------------- SUBMIT ----------------
  const submit = (data: Project) => {
    const formData = new FormData();

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("title", data.title);
    formData.append("category_id", data.category_id);
    formData.append("description", data.description);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("githubUrl", data.githubUrl);
    formData.append("liveUrl", data.liveUrl);
    formData.append("featured", String(data.featured));

    onSubmit(formData);
  };

  const label =
    "block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1";

  const input =
    "w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submit)} className="space-y-6">

        {/* TITLE */}
        <div>
          <label className={label}>Title</label>
          <input {...register("title")} className={input} />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className={label}>Description</label>
          <textarea {...register("description")} rows={5} className={input} />
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className={label}>Thumbnail</label>

          <label
            htmlFor="thumbnail"
            className="flex aspect-video cursor-pointer items-center justify-center rounded-lg border border-dashed hover:border-amber-500"
          >
            {thumbnailPreview ? (
              <img src={thumbnailPreview} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-neutral-500">
                Upload thumbnail
              </span>
            )}
          </label>

          <input
            id="thumbnail"
            type="file"
            hidden
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className={label}>Category</label>
        
          <select
            className={input}
            disabled={isLoading}
            {...register("category_id")}
          >
            <option value="">
              {isLoading ? "Loading categories..." : "Select category"}
            </option>
        
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* LINKS */}
        <div className="grid md:grid-cols-2 gap-4">
          <input {...register("githubUrl")} placeholder="GitHub URL" className={input} />
          <input {...register("liveUrl")} placeholder="Live URL" className={input} />
        </div>

        {/* TAGS */}
        <div>
          <label className={label}>Tags</label>

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className={input}
            />

            <button type="button" onClick={addTag} className="bg-amber-500 text-white px-4 rounded">
              Add
            </button>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded"
              >
                {tag} ×
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED */}
        <label className="flex gap-2 items-center">
          <input type="checkbox" {...register("featured")} />
          Featured Project
        </label>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-amber-500 text-white py-3 rounded"
        >
          {loading
            ? "Saving..."
            : mode === "edit"
            ? "Update Project"
            : "Create Project"}
        </button>
      </form>
    </div>
  );
}