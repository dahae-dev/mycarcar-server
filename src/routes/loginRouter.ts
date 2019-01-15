import { Router } from "express";
import LoginController from "../controllers/LoginController/LoginController";

const router = Router();

const loginController = new LoginController();

router.post("/", loginController.postUser);

export default router;
