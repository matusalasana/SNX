import { ExperiencesRepository } from './experiences.repository';
import { CreateExperienceInput } from './experiences.validation';

const getAllExperiences = async () => {
  return ExperiencesRepository.findAll();
};

const createNewExperience = async (data: CreateExperienceInput) => {
  return ExperiencesRepository.create(data);
};

const deleteExperience = async (id: string) => {
  const success = await ExperiencesRepository.deleteOne(id);
  if (!success) {
    throw new Error('Experience record not found');
  }
  return success;
};

export const ExperiencesService = {
  getAllExperiences,
  createNewExperience,
  deleteExperience
};
