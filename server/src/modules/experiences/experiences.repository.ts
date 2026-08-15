import { db } from "../../db";
import { experiences } from "../../db/schema/experiences";

import {
  desc,
  eq,
} from "drizzle-orm";

import {
  CreateExperienceInput,
} from "./experiences.validation";

const findAll = async () => {
  return db
    .select()
    .from(experiences)
    .orderBy(desc(experiences.createdAt));
};

const findById = async (
  id: string
) => {
  const result = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id));

  return result[0] ?? null;
};

const create = async (
  data: CreateExperienceInput
) => {
  const result = await db
    .insert(experiences)
    .values(data)
    .returning();

  return result[0];
};

const updateExperience = async ({
  id,
  experience
}) => {
  const result = await db
    .update(experiences)
    .set(experience)
    .where(eq(experiences.id, id))
    .returning();

  return result[0];
};

const deleteOne = async (
  id: string
) => {
  const result = await db
    .delete(experiences)
    .where(eq(experiences.id, id))
    .returning();

  return result.length > 0;
};

export const ExperiencesRepository = {
  findAll,
  findById,
  create,
  updateExperience,
  deleteOne,
};