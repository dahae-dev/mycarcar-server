import { Router } from "express";
import LoginController from "../controllers/LoginController";

class LoginRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const { postUserInfomation } = new LoginController();
    this.router.post("/", postUserInfomation);
  }
}

const loginRouter = new LoginRouter();

export default loginRouter.router;
