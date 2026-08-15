import { ExperiencesRepository }
from "./experiences.repository";

import {
  CreateExperienceInput,
} from "./experiences.validation";

const getAllExperiences =
  async () => {
    return await ExperiencesRepository.findAll();
  };

const createNewExperience =
  async (
    data: CreateExperienceInput
  ) => {
    return await ExperiencesRepository.create(data);
  };
  
const updateExperience = async ({
    id,
    data
  }) => {
    
    if(!id) throw new Error("Id not provided");
    const exists = await ExperiencesRepository.findById(id);
    if(!exists) throw new Error("Experience not found");
    
    const dataToUpdate = {};
    if(data.company){
      dataToUpdate.company = data.company
    }
    if(data.role){
      dataToUpdate.role = data.role
    }
    if(data.duration){
      dataToUpdate.duration = data.duration
    }
    if(data.description){
      dataToUpdate.description = data.description
    }
    
    return await ExperiencesRepository.updateExperience({id, experience: dataToUpdate});
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

    return await ExperiencesRepository.deleteOne(id);
  };

export const ExperiencesService = {
  getAllExperiences,
  createNewExperience,
  updateExperience,
  deleteExperience,
};