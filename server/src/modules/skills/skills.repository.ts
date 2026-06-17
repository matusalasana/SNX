import { db } from "../../db";
import { skills } from "../../db/schema/skills";

import {
  asc,
  eq,
} from "drizzle-orm";

import {
  CreateSkillInput,
} from "./skills.validation";

const findAll = async () => {
  return db
    .select()
    .from(skills)
    .orderBy(
      asc(skills.category),
      asc(skills.name)
    );
};

const findById = async (
  id: string
) => {
  const result = await db
    .select()
    .from(skills)
    .where(eq(skills.id, id));

  return result[0] ?? null;
};

const create = async (
  data: CreateSkillInput
) => {
  const result = await db
    .insert(skills)
    .values({
      name: data.name,
      category: data.category,
      proficiency: data.proficiency,
      iconName:
        data.iconName ?? "Code",
    })
    .returning();

  return result[0];
};

const deleteOne = async (
  id: string
) => {
  const result = await db
    .delete(skills)
    .where(eq(skills.id, id))
    .returning();

  return result.length > 0;
};

export const SkillsRepository = {
  findAll,
  findById,
  create,
  deleteOne,
};