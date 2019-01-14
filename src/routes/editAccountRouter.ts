import { Router } from "express";
import { getUserController } from "../controllers/edit_account/getUserController";
import { patchUserController } from "../controllers/edit_account/patchUserController";
import { patchCompanyUserController } from "../controllers/edit_account/patchCompanyUserController";

const router = Router();

router.get("/", getUserController);
router.patch("/user", patchUserController);
router.patch("/company", patchCompanyUserController);

export default router;
