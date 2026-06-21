import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Project } from "../../types/projects"

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
  const [preview, setPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<Project>({
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

  useEffect(() => {
    if (project) {
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
        setPreview(project.thumbnailUrl);
      }
    }
  }, [project, reset]);

  const tags = watch("tags") || [];

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

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

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
    };

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    formData.append("data", JSON.stringify(payload));

    onSubmit(formData);
  };

  const label =
    "block text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1";

  const input =
    "w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500";

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className={label}>Title</label>

          <input
            {...register("title")}
            placeholder="Project title"
            className={input}
          />
        </div>

        {/* Description */}
        <div>
          <label className={label}>Description</label>

          <textarea
            {...register("description")}
            rows={5}
            placeholder="Project description..."
            className={input}
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className={label}>Thumbnail</label>

          <label
            htmlFor="thumbnail"
            className="
              flex aspect-video cursor-pointer
              items-center justify-center
              overflow-hidden rounded-lg
              border border-dashed
              border-neutral-300 dark:border-neutral-700
              bg-neutral-50 dark:bg-neutral-800
              hover:border-amber-500
              transition
            "
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
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
            onChange={handleImageChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className={label}>Category</label>

          <input
            {...register("category")}
            placeholder="Web App"
            className={input}
          />
        </div>

        {/* Links */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={label}>GitHub URL</label>

            <input
              {...register("githubUrl")}
              placeholder="https://github.com/..."
              className={input}
            />
          </div>

          <div>
            <label className={label}>Live URL</label>

            <input
              {...register("liveUrl")}
              placeholder="https://..."
              className={input}
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className={label}>Tags</label>

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) =>
                setTagInput(e.target.value)
              }
              placeholder="React"
              className={input}
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
              className="
                shrink-0 rounded-md
                bg-amber-500 px-4
                text-sm font-medium
                text-white
                hover:bg-amber-600
              "
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="
                    rounded-md
                    border border-amber-500/20
                    bg-amber-500/10
                    px-2 py-1
                    text-xs
                    text-amber-600 dark:text-amber-400
                  "
                >
                  {tag} ×
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("featured")}
            className="accent-amber-500"
          />

          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Featured Project
          </span>
        </label>

        {/* Submit */}
        <button
          disabled={loading}
          className="
            w-full rounded-lg
            bg-amber-500 py-3
            text-sm font-medium text-white
            hover:bg-amber-600
            disabled:opacity-50
          "
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