import { Router } from "express";
import AdminController from "../controllers/AdminController/AdminController";

const router = Router();

const adminUserRouter = new AdminController();

router.get("/", adminUserRouter.getUserCount);
router.get("/:page", adminUserRouter.getUserList);
router.patch("/update", adminUserRouter.updateUser);

export default router;
