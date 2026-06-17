import {
  Request,
  Response,
} from "express";

import { SkillsService }
from "./skills.service";

const getSkills = async (
  _: Request,
  res: Response
) => {
  try {
    const skills =
      await SkillsService.getAllSkills();

    res.status(200).json(skills);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const createSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const skill =
      await SkillsService.createNewSkill(
        req.body
      );

    res.status(201).json(skill);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteSkill = async (
  req: Request,
  res: Response
) => {
  try {
    await SkillsService.deleteSkill(
      req.params.id
    );

    res.json({
      message:
        "Skill successfully removed",
    });
  } catch (err: any) {
    res.status(
      err.message ===
        "Skill not found"
        ? 404
        : 500
    ).json({
      error: err.message,
    });
  }
};

export const SkillsController = {
  getSkills,
  createSkill,
  deleteSkill,
};