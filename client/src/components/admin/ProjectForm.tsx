import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  useCreateProject,
  useUpdateProject,
  useUploadThumbnail 
} from "../../hooks/projects";
import { useCategories } from "../../hooks/categories/useCategories"; 
import { 
  createProjectSchema, 
  updateProjectSchema, 
  type CreateProjectInput,
  type UpdateProjectInput,
  type ProjectFormData,
} from "../../schema/projects";


interface ProjectFormProps {
  project?: ProjectFormData & { id?: string; thumbnail_url?: string };
  mode: "create" | "edit";
  onSuccess?: () => void;
}

const DEFAULT_VALUES: Partial<ProjectFormData> = {
  title: "",
  category_id: "",
  description: "",
  content: "",
  tags: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
};


export default function ProjectForm({
  project,
  mode,
  onSuccess
}: ProjectFormProps) {
  
  // Hooks & Mutations
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { mutateAsync: createProject, isPending: creating } = useCreateProject();
  const { mutateAsync: updateProject, isPending: updating } = useUpdateProject();
  const { mutateAsync: uploadThumbnail, isPending: uploading } = useUploadThumbnail();
  
  // Local states
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  
  // Select schema dynamically
  const schemaToApply = mode === "create" 
    ? createProjectSchema 
    : updateProjectSchema;
  
  // Pending states
  const isPending = creating || updating || uploading;
    
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(schemaToApply),
    defaultValues: DEFAULT_VALUES,
    values: mode === "edit" && project 
      ? (project as ProjectFormData) 
      : undefined,
  });

  const tags = watch("tags") || [];
  
  // File Preview Handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };
  
  // Tags Handler
  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;

    setValue("tags", [...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setValue(
      "tags", 
      newTags, 
      { shouldValidate: true }
    );
  };

  // Submit handler
  const submit = async(data: ProjectFormData) => {
    try{
      let projectId = project?.id;
      
      if (mode === "create") {
        const payload = {
          title: data.title,
          category_id: data.category_id,
          description: data.description,
          content: data.content,
          tags,
          githubUrl: data.githubUrl,
          liveUrl: data.liveUrl,
          featured: data.featured,
        }
        
        const formData = new FormData();
    
        if (thumbnail) {
          formData.append("thumbnail", thumbnail);
        }
        
        formData.append("data", JSON.stringify(payload));
        
        // createProject handles post data + thumbnail simultaneously
        const createdProject = await createProject(formData);
        projectId = createdProject?.id;
      } else if (mode === "edit" && projectId) {
        await updateProject({
          id: projectId, 
          data: data as UpdateProjectInput 
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
            id: projectId, 
            formData 
          });
        }
      }
      reset();
      onSuccess?.();
    }catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(submit)} className="space-y-6">

        {/* TITLE */}
        <div>
          <label className="label">Title</label>
          <input {...register("title")} className="input" />
        </div>
        
        {/* CONTENT */}
        <div>
            <label className="label">Content</label>
            <textarea
              {...register("content")}
              rows={12}
              placeholder="Write about the project ..."
              className="input font-mono text-xs leading-relaxed"
            />
          </div>

        {/* DESCRIPTION */} 
        <div>
          <label className="label">Description</label>
          <textarea {...register("description")} rows={5} className="input" />
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="label">Thumbnail</label>

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
          <label className="label">Category</label>
        
          <select
            className="input"
            disabled={loadingCategories}
            {...register("category_id")}
          >
            <option value="">
              {loadingCategories ? "Loading categories..." : "Select category"}
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
          <input {...register("githubUrl")} placeholder="GitHub URL" className="input" />
          <input {...register("liveUrl")} placeholder="Live URL" className="input" />
        </div>

        {/* TAGS */}
        <div>
          <label className="label">Tags</label>

          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="input"
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
          disabled={isPending}
          className="w-full bg-amber-500 text-white py-3 rounded"
        >
          {isPending
            ? "Saving..."
            : mode === "edit"
            ? "Update Project"
            : "Create Project"}
        </button>
      </form>
    </div>
  );
}