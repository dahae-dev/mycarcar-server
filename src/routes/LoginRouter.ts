import { Router } from "express";
import loginController from "../controllers/LoginController";

class LoginRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", loginController.postUserInfo);
  }
}

const loginRouter = new LoginRouter();

export default loginRouter.router;
