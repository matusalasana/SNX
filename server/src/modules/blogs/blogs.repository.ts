import { db } from "@/db";
import { blogs } from "@/db/schema/blogs";

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

  create: async (
    data: CreateBlogInput
  ) => {
    const result = await db
      .insert(blogs)
      .values({
        title: data.title,
        content: data.content,
        summary: data.summary,
        thumbnailUrl:
          data.thumbnailUrl || null,
        status: data.status,
        readTime: data.readTime,
        author: data.author,
        tags: data.tags,
        category:
          data.category || null,
        featured:
          data.featured ?? false,
      })
      .returning();

    return result[0];
  },

  update: async (
    id: string,
    data: UpdateBlogInput
  ) => {
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