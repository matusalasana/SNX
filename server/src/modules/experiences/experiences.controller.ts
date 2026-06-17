import {
  Request,
  Response,
} from "express";

import { ExperiencesService }
from "./experiences.service";

const getExperiences = async (
  _: Request,
  res: Response
) => {
  try {
    const experiences =
      await ExperiencesService.getAllExperiences();

    res.status(200).json(experiences);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const createExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const experience =
      await ExperiencesService.createNewExperience(
        req.body
      );

    res.status(201).json(experience);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteExperience = async (
  req: Request,
  res: Response
) => {
  try {
    await ExperiencesService.deleteExperience(
      req.params.id
    );

    res.json({
      message:
        "Experience deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const ExperiencesController = {
  getExperiences,
  createExperience,
  deleteExperience,
};