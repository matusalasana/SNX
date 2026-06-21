import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Project } from "../../types/projects";
import { createProjectSchema } from "../../schema/projects"; 
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
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [images, setImages] = useState<File[]>([]);
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
      category: "",
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

    reset({
      title: project.title,
      category: project.category,
      description: project.description || "",
      tags: project.tags || [],
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
    });

    if (project.thumbnailUrl) {
      setThumbnailPreview(project.thumbnailUrl);
    }

    if (project.images?.length) {
      setImagePreviews(project.images);
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

  // ---------------- IMAGES ----------------
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews((prev) => [...prev, ...urls]);
  };

  // ---------------- SUBMIT ----------------
  const submit = (data: Project) => {
    const formData = new FormData();

    const payload = {
      title: data.title,
      category: data.category,
      description: data.description,
      tags: data.tags,
      githubUrl: data.githubUrl || null,
      liveUrl: data.liveUrl || null,
      featured: data.featured,
      order: 2,
    };

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    images.forEach((img) => {
      formData.append("images", img);
    });

    formData.append("data", JSON.stringify(payload));

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

        {/* IMAGES */}
        <div>
          <label className={label}>Images</label>

          <label
            htmlFor="images"
            className="flex aspect-video cursor-pointer items-center justify-center rounded-lg border border-dashed hover:border-amber-500"
          >
            <span className="text-sm text-neutral-500">
              Upload images
            </span>
          </label>

          <input
            id="images"
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImagesChange}
          />

          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="h-32 w-full object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className={label}>Category</label>
          <input {...register("category")} className={input} />
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
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