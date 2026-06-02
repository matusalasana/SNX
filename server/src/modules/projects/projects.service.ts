import { ProjectsRepository } from './projects.repository';
import { CreateProjectInput, UpdateProjectInput } from './projects.validation';

// GET ALL
const getAllProjects = async () => {
  return await ProjectsRepository.findAll();
};

// GET ONE
const getProjectById = async (id: string) => {
  const project = await ProjectsRepository.findById(id);
  if (!project) throw new Error('Project not found');
  return project;
};

// CREATE
const createNewProject = async (data: CreateProjectInput) => {
  return ProjectsRepository.create(data);
};

// UPDATE 
const updateProject = async (id: string, data: UpdateProjectInput) => {
  const project = await ProjectsRepository.findById(id);
  if (!project) throw new Error('Project to update not found');
  
  const updated = await ProjectsRepository.update(id, data);
  
  return updated;
};

// DELETE
const deleteProject = async (id: string) => {
  const project = await ProjectsRepository.findById(id);
  if (!project) throw new Error('Project to delete not found');
  
  const success = await ProjectsRepository.deleteOne(id);
};

export const ProjectsService = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateProject,
  deleteProject
};
