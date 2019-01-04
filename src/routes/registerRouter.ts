import { Router } from "express";
import { postRegister } from "../controllers/RegisterController";

const router = Router();

router.post("/", postRegister);

export default router;
