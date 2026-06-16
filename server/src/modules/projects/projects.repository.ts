import { db } from "../../db";
import { projects } from "../../db/schema/projects";
import { desc, eq } from "drizzle-orm";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "./projects.validation";

export const ProjectsRepository = {
  findAll: async () => {
    return db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  },

  findById: async (id: string) => {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));

    return result[0] ?? null;
  },

  create: async (data: CreateProjectInput) => {
    const result = await db
      .insert(projects)
      .values({
        title: data.title,
        category: data.category,
        tags: data.tags,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl || null,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        order: data.order ?? 0,
      })
      .returning();

    return result[0];
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

  deleteOne: async (id: string) => {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();

    return result.length > 0;
  },
};