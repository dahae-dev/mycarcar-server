import { Router } from "express";
import registerFormController from "../controllers/RegisterFormController";

class RegisterFormRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", registerFormController.registerInfoChangeRequest);
  }
}

const registerFormRouter = new RegisterFormRouter();

export default registerFormRouter.router;
