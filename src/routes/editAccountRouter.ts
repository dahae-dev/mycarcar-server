import { Router } from "express";
import { getUserController } from "../controllers/edit_account/get";
import { updateUserController } from "../controllers/edit_account/posts/user";
import { updateCompanyUserController } from "../controllers/edit_account/posts/company";

const router = Router();

router.get("/", getUserController);
router.post("/user", updateUserController);
router.post("/company", updateCompanyUserController);

export default router;
