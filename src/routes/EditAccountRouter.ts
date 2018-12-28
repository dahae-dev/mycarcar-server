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
      updateAcountInfomation,
      getUserInfomation,
    } = new EditAccountController();

    this.router.get("/", getUserInfomation);
    this.router.post("/", updateAcountInfomation);
  }
}

const editAccountRouter = new EditAccountRouter();

export default editAccountRouter.router;
