import { ExperiencesRepository }
from "./experiences.repository";

import {
  CreateExperienceInput,
} from "./experiences.validation";

const getAllExperiences =
  async () => {
    return ExperiencesRepository.findAll();
  };

const createNewExperience =
  async (
    data: CreateExperienceInput
  ) => {
    return ExperiencesRepository.create(data);
  };

const deleteExperience =
  async (id: string) => {
    const exists =
      await ExperiencesRepository.findById(id);

    if (!exists) {
      throw new Error(
        "Experience record not found"
      );
    }

    return ExperiencesRepository.deleteOne(id);
  };

export const ExperiencesService = {
  getAllExperiences,
  createNewExperience,
  deleteExperience,
};