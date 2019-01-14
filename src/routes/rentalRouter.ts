import { Router } from "express";
import {
  getBrandListController,
  getSeriesListController,
  getModelListController,
  getDetailListController,
  getGradeListController,
  getOptionListController,
  getCapitalListController
} from "../controllers/rental/rentalController";
import { checkToken } from "../middlewares/checkToken";
import { postEstimateController } from "../controllers/estimate/estimateController";

const router = Router();

router.post("/estimate", checkToken, postEstimateController);

router.get("/capital-profit", getCapitalListController);

router.get("/:origin", getBrandListController);
router.get("/:origin/:brand", getSeriesListController);
router.get("/:origin/:brand/:series", getModelListController);
router.get("/:origin/:brand/:series/:model", getDetailListController);
router.get("/:origin/:brand/:series/:model/:detail", getGradeListController);
router.get("/:origin/:brand/:series/:model/:detail/:grade", getOptionListController);

export default router;
