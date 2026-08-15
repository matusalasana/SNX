import {
  Request,
  Response,
} from "express";

import { CertificationsService }
from "./certifications.service";

const getCertifications = async (
  _: Request,
  res: Response
) => {
  try {
    const certifications =
      await CertificationsService.getAllCertifications();

    res.status(200).json(certifications);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const createCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const certification =
      await CertificationsService.createNewCertification(
        req.body
      );

    res.status(201).json(certification);
  } catch (err: any) {
    console.log(err.cause || err.message)
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const certification =
      await CertificationsService.updateCertification({
        id: req.params.id,
        data: req.body,
      });

    res.status(200).json(certification);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteCertification = async (
  req: Request,
  res: Response
) => {
  try {
    await CertificationsService.deleteCertification(
      req.params.id as string
    );

    res.json({
      message:
        "Certification deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const CertificationsController = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
};