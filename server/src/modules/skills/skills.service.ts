import { SkillsRepository } from './skills.repository';
import { CreateSkillInput } from './skills.validation';

const getAllSkills = async () => {
  return SkillsRepository.findAll();
};

const createNewSkill = async (data: CreateSkillInput) => {
  return SkillsRepository.create(data);
};

const deleteSkill = async (id: string) => {
  const success = await SkillsRepository.deleteOne(id);
  if (!success) {
    throw new Error('Skill not found');
  }
  return success;
};

export const SkillsService = {
  getAllSkills,
  createNewSkill,
  deleteSkill
};
