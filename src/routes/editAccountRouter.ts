import { Router } from "express";
import { updateAccount, getUser } from "../controllers/EditAccountController";

const router = Router();

router.get("/", getUser);
router.post("/", updateAccount);

export default router;
