import { ProjectsRepository } from "./projects.repository";
import {
  CreateProjectInput,
  UpdateProjectInput,
  createProjectSchema
} from "./projects.validation";
import { uploadToCloudinary } from "../../utils/cloudinary"

// GET ALL
const getProjects = async () => {
  return ProjectsRepository.getProjects();
};

// GET ONE
const getProjectById = async (id: string) => {
  const project = await ProjectsRepository.findById(id);

  if (!project) throw new Error("Project not found");

  return project;
};

// CREATE
const createNewProject = async ({
  validatedData,
  thumbnail
}) => {
  
  if(!validatedData) throw new Error("Body is empty");
  
  const {
    title,
    category_id,
    description,
    tags,
    githubUrl,
    liveUrl,
    order,
    featured,
  } = validatedData;
  
  const thumbnailResult = await uploadToCloudinary(
    thumbnail,
    `projects/thumbnails`
  )
  
  return await ProjectsRepository.create({
    title,
    categoryId: category_id,
    description,
    tags,
    githubUrl,
    liveUrl,
    featured,
    order,
    thumbnailUrl: thumbnailResult.secure_url,
  });
};

// UPDATE
const updateProject = async (
  id: string,
  data: UpdateProjectInput
) => {
  const exists = await ProjectsRepository.findById(id);

  if (!exists) throw new Error("Project not found");
  
  const dataToUpdate = {};
  
  if(data.title){
    dataToUpdate.title=data.title
  }
  if(data.category_id){
    dataToUpdate.category_id=data.category_id
  }
  if(data.description){
    dataToUpdate.description=data.description
  }
  if(data.tags){
    dataToUpdate.tags=data.tags
  }
  if(data.githubUrl){
    dataToUpdate.githubUrl=data.githubUrl
  }
  if(data.liveUrl){
    dataToUpdate.liveUrl=data.liveUrl
  }
  if(data.order){
    dataToUpdate.order=data.order
  }
  if(data.featured){
    dataToUpdate.featured=data.featured
  }

  return ProjectsRepository.update(id, dataToUpdate);
};

// DELETE
const deleteProject = async (id: string) => {
  const exists = await ProjectsRepository.findById(id);

  if (!exists) throw new Error("Project not found");

  return ProjectsRepository.deleteOne(id);
};

export const ProjectsService = {
  getProjects,
  getProjectById,
  createNewProject,
  updateProject,
  deleteProject,
};