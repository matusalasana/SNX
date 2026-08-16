import { Router } from "express";
import { AdminController } from "./admin.controller";
import { requireAuth } from "../../middleware/auth.middleware";


const router = Router();


router.get(
  "/blogs",
  requireAuth,
  AdminController.getAllBlogs
);


export default router;