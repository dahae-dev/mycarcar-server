import { Router } from "express";
import { getUser } from "../controllers/edit_account/get";
import { updateAccount } from "../controllers/edit_account/post";

const router = Router();

router.get("/", getUser);
router.post("/", updateAccount);

export default router;
