import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
  useCreateCategory,
} from "../../hooks/categories";
import { useCategories } from "../../hooks/categories/useCategories";
import {
  createCategorySchema,
  type CategoryFormData
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
          onSuccess?.()
          reset()
        }
      })
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-[400px] space-y-3"
      >
        <h2 className="text-lg font-bold">
          Create Category
        </h2>

        <div>
          <label className="label">Name</label>
          <input {...register("name")} placeholder="eg. (NodeJs, ReactJs, ...)" className="input" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={isPending}
            type="button"
            onClick={onSuccess}
            className="btn btn-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}