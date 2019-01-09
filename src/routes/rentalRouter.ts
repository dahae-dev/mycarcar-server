/**
 * 2주차 다해 - 차량 정보 요청을 위한 /api/rental 라우터
 */

import { Router } from "express";
import {
  getBrandListController,
  getSeriesListController,
  getModelListController,
  getDetailListController,
  getGradeListController,
  getOptionListController
} from "../controllers/rental/rentalController";

const router = Router();

router.get("/:origin", getBrandListController);
router.get("/:origin/:brand", getSeriesListController);
router.get("/:origin/:brand/:series", getModelListController);
router.get("/:origin/:brand/:series/:model", getDetailListController);
router.get("/:origin/:brand/:series/:model/:detail", getGradeListController);
router.get("/:origin/:brand/:series/:model/:detail/:grade", getOptionListController);

export default router;
