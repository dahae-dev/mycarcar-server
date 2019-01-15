import { Router } from "express";
import EditAccountContoller from "../controllers/EditAccountController/EditAccountContoller";

const router = Router();

const editAccountController = new EditAccountContoller();

router.get("/", editAccountController.getUser);
router.patch("/user", editAccountController.patchUserController);
router.patch("/company", editAccountController.patchCompanyUser);

export default router;
