import { Router } from "express";

import { getUserCountForAdminController } from "../controllers/admin/getUserCountForAdminController";
import { getUserListForAdminController } from "../controllers/admin/getUserListForAdminController";
import { updateUserForAdminController } from "../controllers/admin/updateUserForAdminController";

const router = Router();

router.get("/", getUserCountForAdminController);
router.get("/:page", getUserListForAdminController);
router.patch("/update", updateUserForAdminController);

export default router;
