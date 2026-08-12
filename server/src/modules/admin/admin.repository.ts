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

export const AdminRepository = {
  getBlogs: async () => {
    return await db
      .select()
      .from(blogs)
      .where(eq(blogs.status, "published"))
      .orderBy(desc(blogs.createdAt));
  },
}