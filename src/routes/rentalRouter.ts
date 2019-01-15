import { Router } from "express";

import { checkToken } from "../middlewares/checkToken";
import EstimateController from "../controllers/EstimateController/EstimateController";
import RentalController from "../controllers/RentalController/RentalController";

const router = Router();

const estimateController = new EstimateController();
const rentalController = new RentalController();

router.post("/estimate", checkToken, estimateController.postEstimate);

router.get("/capital-profit", rentalController.getCapitalList);

router.get("/:origin", rentalController.getBrandList);
router.get("/:origin/:brand", rentalController.getSeriesList);
router.get("/:origin/:brand/:series", rentalController.getModelList);
router.get("/:origin/:brand/:series/:model", rentalController.getDetailList);
router.get("/:origin/:brand/:series/:model/:detail", rentalController.getGradeList);
router.get("/:origin/:brand/:series/:model/:detail/:grade", rentalController.getOptionList);

export default router;
