import { SkillsRepository }
from "./skills.repository";

import type { skills } from "../../db/schema/skills";
import {
  CreateSkillInput,
  UpdateSkillInput,
} from "./skills.validation";

const getSkills =
  async () => {
    return await SkillsRepository.findAll();
  };

const createNewSkill =
  async (
    data: CreateSkillInput
  ) => {
    return await SkillsRepository.create(data);
  };
  
const updateSkill = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateSkillInput;
}) => {
  
  if(!id) throw new Error("Id not provided");
  
  const exists = await SkillsRepository.findById(id);
  if(!exists) throw new Error("Skill not found");
  
  const dataToUpdate: Partial<typeof skills.$inferInsert> = {};
  if(data.name){
    dataToUpdate.name = data.name
  }
  if(data.categoryId){
    dataToUpdate.categoryId = data.categoryId
  }
  if(data.proficiency){
    dataToUpdate.proficiency = data.proficiency
  }
    return await SkillsRepository.updateSkill({
      id,
      skill: dataToUpdate
    });
  };

const deleteSkill =
  async (id: string) => {
    const exists =
      await SkillsRepository.findById(id);

    if (!exists) {
      throw new Error(
        "Skill not found"
      );
    }

    return await SkillsRepository.deleteOne(id);
  };

export const SkillsService = {
  getSkills,
  createNewSkill,
  updateSkill,
  deleteSkill,
};