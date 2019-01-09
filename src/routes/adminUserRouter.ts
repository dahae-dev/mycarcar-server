import { Router } from "express";
import { getUserListController } from "../controllers/admin/adminUserController";

const router = Router();

router.get("/", getUserListController);

export default router;
