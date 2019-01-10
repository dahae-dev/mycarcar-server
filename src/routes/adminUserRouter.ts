import { Router } from "express";
import {
  getUserCountForAdminController,
  getUserListForAdminController,
  updateUserForAdminController
} from "../controllers/admin/adminUserController";

const router = Router();

router.get("/", getUserCountForAdminController);
router.get("/:page", getUserListForAdminController);
router.patch("/update", updateUserForAdminController);

export default router;
