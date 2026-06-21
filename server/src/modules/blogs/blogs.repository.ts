import { db } from "../../db";
import { blogs } from "../../db/schema/blogs";

import {
  desc,
  eq,
} from "drizzle-orm";

import {
  CreateBlogInput,
  UpdateBlogInput,
} from "./blogs.validation";

export const BlogsRepository = {
  findAll: async (
    includeDrafts = false
  ) => {
    if (includeDrafts) {
      return db
        .select()
        .from(blogs)
        .orderBy(desc(blogs.createdAt));
    }

    return db
      .select()
      .from(blogs)
      .where(eq(blogs.status, "published"))
      .orderBy(desc(blogs.createdAt));
  },

  findById: async (id: string) => {
    const result = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id));

    return result[0] ?? null;
  },

  create: async (data: CreateBlogInput) => {
    const result = await db
      .insert(blogs)
      .values(data)
      .returning();

    return result[0];
  },

  update: async ({
    id,
    data
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
  },

  deleteOne: async (
    id: string
  ) => {
    const result = await db
      .delete(blogs)
      .where(eq(blogs.id, id))
      .returning();

    return result.length > 0;
  },
};