import { db } from "../../db";
import { projects } from "../../db/schema/projects";
import { categories } from "../../db/schema/categories";
import { desc, eq } from "drizzle-orm";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "./projects.validation";

export const ProjectsRepository = {
  getProjects: async () => {
    return db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  },

  findById: async (id: string) => {
    const [result] = await db
      .select({
        project: projects,
        category: categories.name,
      })
      .from(projects)
      .innerJoin(
        categories, eq(categories.id, projects.categoryId)
      )
      .where(eq(projects.id, id));
    
    const finalData = {
      ...result.project,
      category: result.category
    }
    
    return finalData ?? null
  },

  create: async (data) => {
  return await db
      .insert(projects)
      .values(data)
      .returning();
},

  update: async (id: string, data: UpdateProjectInput) => {
    const result = await db
      .update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    return result[0] ?? null;
  },
  
  updateThumbnail: async ({
    id, 
    thumbnailUrl 
  }) => {
    const result = await db
      .update(projects)
      .set({
        thumbnailUrl
      })
      .where(eq(projects.id, id))
      .returning();

    return result[0] ?? null;
  },

  deleteOne: async (id: string) => {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();

    return result.length > 0;
  },
};