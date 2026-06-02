import { Request, Response } from 'express';
import { ExperiencesService } from './experiences.service';
import { createExperienceSchema } from './experiences.validation';

const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await ExperiencesService.getAllExperiences();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = createExperienceSchema.safeParse(req.body);
    if (!validated.success) {
      res.status(400).json({ error: 'Validation failed', details: validated.error.format() });
      return;
    }
    const newExp = await ExperiencesService.createNewExperience(validated.data);
    res.status(201).json(newExp);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await ExperiencesService.deleteExperience(id);
    res.json({ message: 'Experience record successfully removed' });
  } catch (err: any) {
    const statusCode = err.message === 'Experience record not found' ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
};

export const ExperiencesController = {
  getExperiences,
  createExperience,
  deleteExperience
};
