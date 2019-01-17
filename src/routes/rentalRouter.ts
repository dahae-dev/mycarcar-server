import { Router } from "express";

import { checkToken } from "../middlewares/checkToken";
import EstimateController from "../controllers/EstimateController/EstimateController";
import RentalController from "../controllers/RentalController/RentalController";

const router = Router();

const estimateController = new EstimateController();
const rentalController = new RentalController();

router.post("/estimate", checkToken, estimateController.postEstimate);
router.get("/capital-profit", rentalController.getCapitalList);
router.get("/:type/:target", rentalController.getList);

export default router;
