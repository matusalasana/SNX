import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateCategory } from "../../hooks/categories";
import {
  createCategorySchema,
  type CategoryFormData,
} from "../../schema/categories";

type Props = {
  onSuccess?: () => void;
};

export default function CategoryForm({ onSuccess }: Props) {
  const { mutate: createCategory, isPending } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit = (data: CategoryFormData) => {
    createCategory(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-content/40 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-full max-w-md space-y-4"
      >
        <div>
          <h2 className="heading text-lg">Create Category</h2>

          <p className="subheading mt-1 text-sm">
            Add a new category to organize your content.
          </p>
        </div>

        <div>
          <label className="label">Name</label>

          <input
            {...register("name")}
            placeholder="e.g. Node.js, React.js..."
            className="input"
            disabled={isPending}
          />

          {errors.name && (
            <p className="error-text mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onSuccess}
            disabled={isPending}
            className="btn-outline"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}