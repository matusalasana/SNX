import { Router } from "express";

import {
  CertificationsController,
} from "./certifications.controller";

import {
  requireAuth,
} from "../../middleware/auth.middleware";

import {
  validate,
} from "../../middleware/validation.middleware";

import {
  createCertificationSchema,
  updateCertificationSchema,
} from "./certifications.validation";

const router = Router();

router.get(
  "/",
  CertificationsController.getCertifications
);

router.post(
  "/",
  requireAuth,
  validate(createCertificationSchema),
  CertificationsController.createCertification
);

router.patch(
  "/:id",
  requireAuth,
  validate(updateCertificationSchema),
  CertificationsController.updateCertification
);

router.delete(
  "/:id",
  requireAuth,
  CertificationsController.deleteCertification
);

export default router;