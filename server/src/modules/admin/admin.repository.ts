import { db } from "../../db";
import { blogs } from "../../db/schema/blogs";
import { categories } from "../../db/schema/categories";

import {
  desc,
  eq,
} from "drizzle-orm";

import {
  CreateBlogInput,
  UpdateBlogInput,
} from "./blogs.validation";

export const AdminRepository = {
  getAllBlogs: async () => {
    const result = await db
      .select({
        blog: blogs,
        category: categories.name
      })
      .from(blogs)
      .innerJoin(
        categories, eq(blogs.categoryId, categories.id)
      );
    
    const finalData = (result ?? []).map((blog) => {
      const formatedData = {
      ...blog.blog,
      category: blog.category
    }
    return formatedData;
    });
    
    return finalData ?? [];
  },
}