import { Router } from "express";
import { postRegisterCompanyUserController } from "../controllers/register/company";
import { postRegisterUserController } from "../controllers/register/user";

const router = Router();

router.post("/user", postRegisterUserController);
router.post("/company", postRegisterCompanyUserController);

export default router;
