import { ProjectsRepository } from './projects.repository';
import { CreateProjectInput, UpdateProjectInput } from './projects.validation';

const getAllProjects = async () => {
  return ProjectsRepository.findAll();
};

const getProjectById = async (id: string) => {
  const project = await ProjectsRepository.findById(id);
  if (!project) throw new Error('Project not found');
  return project;
};

const createNewProject = async (data: CreateProjectInput) => {
  return ProjectsRepository.create(data);
};

const updateProject = async (id: string, data: UpdateProjectInput) => {
  const updated = await ProjectsRepository.update(id, data);
  if (!updated) throw new Error('Project to update not found');
  return updated;
};

const deleteProject = async (id: string) => {
  const success = await ProjectsRepository.deleteOne(id);
  if (!success) throw new Error('Project to delete not found');
  return success;
};

export const ProjectsService = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateProject,
  deleteProject
};
