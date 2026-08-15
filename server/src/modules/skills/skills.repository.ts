import { db } from "../../db";
import { skills } from "../../db/schema/skills";
import { categories } from "../../db/schema/categories";

import {
  asc,
  eq,
} from "drizzle-orm";

import {
  CreateSkillInput,
} from "./skills.validation";

const findAll = async () => {
  const result = await db
    .select({
      skill: skills,
      category: categories.name
    })
    .from(skills)
    .innerJoin(
      categories, eq(categories.id, skills.categoryId)
    );
  
  const finalData = (result ?? []).map((skill) => {
    const formatedData = {
      ...skill.skill,
      category: skill.category
    }
    return formatedData
  })
  
  return finalData ?? [];
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
    .values(data)
    .returning();

  return result[0];
};

const updateSkill = async ({
  id,
  skill
}) => {
  const result = await db
    .update(skills)
    .set(skill)
    .where(eq(skills.id, id))
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
  updateSkill,
  deleteOne,
};