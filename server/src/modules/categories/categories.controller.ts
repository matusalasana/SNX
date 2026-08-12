import {
  Request,
  Response,
} from "express";

import { CategoriesService }
from "./categories.service";

const getCategories = async (
  _: Request,
  res: Response
) => {
  try {
    const categories =
      await CategoriesService
        .getAllCategories();

    res.status(200).json(
      categories
    );
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category =
      await CategoriesService
        .createNewCategory(
          req.body
        );

    res.status(201).json(
      category
    );
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    await CategoriesService
      .deleteCategory(
        req.params.id as string
      );

    res.json({
      message:
        "Category successfully removed",
    });
  } catch (err: any) {
    res.status(
      err.message ===
        "Category not found"
        ? 404
        : 500
    ).json({
      error: err.message,
    });
  }
};

export const CategoriesController = {
  getCategories,
  createCategory,
  deleteCategory,
};