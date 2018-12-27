import { Router } from "express";
import rootController from "../controllers/RootController";

class RootRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/a", rootController.getRoot);
  }
}

const rootRouter = new RootRouter();

export default rootRouter.router;
