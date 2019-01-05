import { Router } from "express";
import { postRegisterCompanyUser } from "../controllers/register/company";
import { postRegisterUser } from "../controllers/register/user";

const router = Router();

router.post("/user", postRegisterUser);
router.post("/company", postRegisterCompanyUser);

export default router;
