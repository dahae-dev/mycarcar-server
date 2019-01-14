import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import { getEstimateController, getEstimateListController } from "../controllers/estimate/estimateController";

const router = Router();

router.get("/list", checkToken, getEstimateListController);
router.get("/:id", checkToken, getEstimateController);

export default router;
