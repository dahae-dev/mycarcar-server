import { Router } from "express";
import { postRegisterCompanyUserController } from "../controllers/register/postRegisterCompanyUserController";
import { postRegisterUserController } from "../controllers/register/postRegisterUserController";

const router = Router();

router.post("/user", postRegisterUserController);
router.post("/company", postRegisterCompanyUserController);

export default router;
