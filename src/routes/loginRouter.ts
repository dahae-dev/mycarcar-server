import { Router } from "express";
import { postUserController } from "../controllers/LoginController";

const router = Router();

router.post("/", postUserController);

export default router;
