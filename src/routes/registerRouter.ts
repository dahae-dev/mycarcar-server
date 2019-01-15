import { Router } from "express";
import RegisterController from "../controllers/RegisterController/RegisterController";

const router = Router();

const registerController = new RegisterController();

router.post("/user", registerController.postNomalUser);
router.post("/company", registerController.postCompanyUser);

export default router;
