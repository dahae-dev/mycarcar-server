import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import EstimateController from "../controllers/EstimateController/EstimateController";

const router = Router();

const estimateController = new EstimateController();

router.get("/list", checkToken, estimateController.getEstimateList);
router.get("/:id", checkToken, estimateController.getEstimate);

export default router;
