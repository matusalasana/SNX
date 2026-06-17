import { SkillsRepository }
from "./skills.repository";

import {
  CreateSkillInput,
} from "./skills.validation";

const getAllSkills =
  async () => {
    return SkillsRepository.findAll();
  };

const createNewSkill =
  async (
    data: CreateSkillInput
  ) => {
    return SkillsRepository.create(data);
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

    return SkillsRepository.deleteOne(id);
  };

export const SkillsService = {
  getAllSkills,
  createNewSkill,
  deleteSkill,
};