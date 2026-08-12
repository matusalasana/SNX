import { db } from "../../db";
import { categories } from "../../db/schema/categories";

import {
  asc,
  eq,
} from "drizzle-orm";

import {
  CreateCategoryInput,
} from "./categories.validation";

const findAll = async () => {
  return db
    .select()
    .from(categories)
    .orderBy(
      asc(categories.name)
    );
};

const findById = async (
  id: string
) => {
  const result = await db
    .select()
    .from(categories)
    .where(
      eq(categories.id, id)
    );

  return result[0] ?? null;
};

const create = async (
  data: CreateCategoryInput
) => {
  const result = await db
    .insert(categories)
    .values({
      name: data.name,
    })
    .returning();

  return result[0];
};

const deleteOne = async (
  id: string
) => {
  const result = await db
    .delete(categories)
    .where(
      eq(categories.id, id)
    )
    .returning();

  return result.length > 0;
};

export const CategoriesRepository = {
  findAll,
  findById,
  create,
  deleteOne,
};