import { Request, Response } from "express";
import { ProjectsService } from "./projects.service";
import {
  createProjectSchema
} from "./projects.validation";

// GET ALL
const getProjects = async (_: Request, res: Response) => {
  try {
    const projects = await ProjectsService.getProjects();
    res.status(200).json(projects);
  } catch (err: any) {
    console.log("Get projects error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await ProjectsService.getProjectById(
      req.params.id as string
    );

    res.status(200).json(project);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// CREATE
const createProject = async (req: Request, res: Response) => {
  try {
  
    const thumbnail = req.file as any;
    const data = JSON.parse(req.body.data);
    console.log("Tis is body:", req.body)
    
    const validatedData = createProjectSchema.parse(data);
    
    const newProj = 
      await ProjectsService.createNewProject({
        validatedData,
        thumbnail: thumbnail?.buffer,
      });

    res.status(201).json(newProj);
  } catch (err: any) {
    console.log("Error:", err.cause || err.message)
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await ProjectsService.updateProject(
      req.params.id as string,
      req.body
    );

    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE THUMBNAIL 
const updateThumbnail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    
    const thumbnail = req.file as any;
    
    const result = 
      await ProjectsService.updateThumbnail({
      id,
      thumbnail_buffer: thumbnail?.buffer
    });

    res.status(200).json(result);
  } catch (err: any) {
    console.log(err.cause || err.message)
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteProject = async (req: Request, res: Response) => {
  try {
    await ProjectsService.deleteProject(req.params.id as string);

    res.json({ message: "Project deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const ProjectsController = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateThumbnail,
  deleteProject,
};