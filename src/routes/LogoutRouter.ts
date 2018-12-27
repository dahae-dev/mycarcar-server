import { Router } from "express";
import logoutController from "../controllers/LogoutController";

class LogoutRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", logoutController.logoutRequest);
  }
}

const logoutRouter = new LogoutRouter();

export default logoutRouter.router;
