import { Router } from "express";
import { postUser } from "../controllers/LoginController";

const router = Router();

router.post("/", postUser);

export default router;
