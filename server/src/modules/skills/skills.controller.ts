import { Request, Response } from 'express';
import { SkillsService } from './skills.service';
import { createSkillSchema } from './skills.validation';

const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await SkillsService.getAllSkills();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = createSkillSchema.safeParse(req.body);
    if (!validated.success) {
      res.status(400).json({ error: 'Validation failed', details: validated.error.format() });
      return;
    }
    const newSkill = await SkillsService.createNewSkill(validated.data);
    res.status(201).json(newSkill);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await SkillsService.deleteSkill(id);
    res.json({ message: 'Skill successfully removed' });
  } catch (err: any) {
    const statusCode = err.message === 'Skill not found' ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
};

export const SkillsController = {
  getSkills,
  createSkill,
  deleteSkill
};
