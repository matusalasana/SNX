import { ProjectsRepository } from "./projects.repository";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "./projects.validation";

// GET ALL
const getAllProjects = async () => {
  return ProjectsRepository.findAll();
};

// GET ONE
const getProjectById = async (id: string) => {
  const project = await ProjectsRepository.findById(id);

  if (!project) throw new Error("Project not found");

  return project;
};

// CREATE
const createNewProject = async (data: CreateProjectInput) => {
  return ProjectsRepository.create(data);
};

// UPDATE
const updateProject = async (
  id: string,
  data: UpdateProjectInput
) => {
  const exists = await ProjectsRepository.findById(id);

  if (!exists) throw new Error("Project not found");

  return ProjectsRepository.update(id, data);
};

// DELETE
const deleteProject = async (id: string) => {
  const exists = await ProjectsRepository.findById(id);

  if (!exists) throw new Error("Project not found");

  return ProjectsRepository.deleteOne(id);
};

export const ProjectsService = {
  getAllProjects,
  getProjectById,
  createNewProject,
  updateProject,
  deleteProject,
};