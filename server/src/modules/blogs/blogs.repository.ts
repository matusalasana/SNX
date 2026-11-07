import { db } from "../../db";
import { blogs } from "../../db/schema/blogs";
import { categories } from "../../db/schema/categories";

import {
  desc,
  eq,
  and
} from "drizzle-orm";

import type { BlogFilters } from "./blogs.service";

export type BlogInsert = typeof blogs.$inferInsert;

const getBlogs = async (filters: BlogFilters) => {
  const conditions = [
    eq(blogs.status, "published"),
  ];

  if (filters.featured !== undefined) {
    conditions.push(eq(blogs.featured, filters.featured));
  }

  if (filters.category !== undefined) {
    conditions.push(eq(blogs.categoryId, filters.category));
  }

  return db
    .select()
    .from(blogs)
    .where(and(...conditions))
    .orderBy(desc(blogs.createdAt));
};

const getBlogById = async (id: string) => {
  const [result] = await db
    .select({
      blog: blogs,
      category: categories.name
    })
    .from(blogs)
    .innerJoin(
      categories, eq(blogs.categoryId, categories.id)
    )
    .where(eq(blogs.id, id));
  
  const finalData = {
    ...result.blog,
    category: result.category
  }
  return finalData ?? null;
};

const createBlog = async (data: BlogInsert) => {
  const result = await db
    .insert(blogs)
    .values(data)
    .returning();

  return result[0];
};

const update = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<BlogInsert>;
}) => {
  const result = await db
    .update(blogs)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(blogs.id, id))
    .returning();

  return result[0] ?? null;
};

const updateThumbnail = async ({
  id,
  thumbnailUrl,
}: {
  id: string;
  thumbnailUrl: string;
}) => {
  const result = await db
    .update(blogs)
    .set({
      thumbnailUrl
    })
    .where(eq(blogs.id, id))
    .returning();

  return result[0] ?? null;
};

const deleteOne = async (id: string) => {
  const result = await db
    .delete(blogs)
    .where(eq(blogs.id, id))
    .returning();

  return result.length > 0;
};



export const BlogsRepository = {
  getBlogs,
  getBlogById,
  createBlog,
  update,
  updateThumbnail,
  deleteOne
}