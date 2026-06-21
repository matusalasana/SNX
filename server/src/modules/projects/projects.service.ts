import { ProjectsRepository } from "./projects.repository";
import {
  CreateProjectInput,
  UpdateProjectInput,
  createProjectSchema
} from "./projects.validation";
import { uploadToCloudinary } from "../../utils/cloudinary"

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
const createNewProject = async ({
  data,
  images,
  thumbnail
}) => {
  if(!data) throw new Error("Body is empty");
  
  if(!images.length) throw new Error("At least 1 image is required");
  
  const validated = createProjectSchema.parse(data)
  const {
    title,
    category,
    description,
    tags,
    githubUrl,
    liveUrl,
    order,
    featured,
  } = validated;
  
  const imagesResult = await Promise.all(
    images.map((buffer) =>
      uploadToCloudinary(buffer, "projects/images")
    )
  );
  
  const thumbnailResult = await uploadToCloudinary(
    thumbnail,
    `projects/thumbnails`
  )
  
  return await ProjectsRepository.create({
    data: {
      title,
      category,
      description,
      tags,
      githubUrl,
      liveUrl,
      featured,
      order,
      thumbnailUrl: thumbnailResult.secure_url,
    },
    images: imagesResult.map((img) => img.secure_url),
  });
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