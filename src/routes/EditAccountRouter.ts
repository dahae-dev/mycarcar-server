import { Router } from "express";
import EditAccountController from "../controllers/EditAccountController";

class EditAccountRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const {
      getUserInfomation,
      updateAccountInfomation,
    } = new EditAccountController();

    this.router.get("/", getUserInfomation);
    this.router.post("/", updateAccountInfomation);
  }
}

const editAccountRouter = new EditAccountRouter();

export default editAccountRouter.router;
