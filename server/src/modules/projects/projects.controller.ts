import { Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import { createProjectSchema, updateProjectSchema } from './projects.validation';

const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await ProjectsService.getAllProjects();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await ProjectsService.getProjectById(id);
    res.json(project);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = createProjectSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.format() });
      return;
    }
    const newProj = await ProjectsService.createNewProject(result.data);
    res.status(201).json(newProj);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = updateProjectSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: 'Validation failed', details: result.error.format() });
      return;
    }
    const updated = await ProjectsService.updateProject(id, result.data);
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await ProjectsService.deleteProject(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const ProjectsController = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
