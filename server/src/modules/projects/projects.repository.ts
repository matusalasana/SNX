import { db } from "../../db";
import { projects } from "../../db/schema/projects";
import { projectImages } from "../../db/schema/project_images";
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

  create: async ({
  data,
  images,
}) => {
  return await db.transaction(async (tx) => {
    // 1. Insert project
    const [project] = await tx
      .insert(projects)
      .values(data)
      .returning();

    // 2. Prepare images properly (ARRAY)
    const imagesToInsert = images.map((img) => ({
      projectId: project.id,
      imageUrl: img,
    }));

    // 3. Insert images
    if (imagesToInsert.length > 0) {
      await tx.insert(projectImages).values(imagesToInsert);
    }

    // 4. Return project
    return project;
  });
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