import { Router } from "express";
import { getCarListController } from "../controllers/admin/adminCarController";

const router = Router();

router.get("/", getCarListController);

export default router;
