import { CategoriesRepository }
from "./categories.repository";

import {
  CreateCategoryInput,
} from "./categories.validation";

const getAllCategories =
  async () => {
    return await CategoriesRepository.findAll();
  };

const createNewCategory =
  async (
    data: CreateCategoryInput
  ) => {
    return await CategoriesRepository.create(
      data
    );
  };

const deleteCategory =
  async (id: string) => {
    const exists =
      await CategoriesRepository.findById(
        id
      );

    if (!exists) {
      throw new Error(
        "Category not found"
      );
    }

    return await CategoriesRepository.deleteOne(
      id
    );
  };

export const CategoriesService = {
  getAllCategories,
  createNewCategory,
  deleteCategory,
};