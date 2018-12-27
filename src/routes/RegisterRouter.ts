import { Router } from "express";
import registerController from "../controllers/RegisterController";

class RegisterRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", registerController.registerRequest);
  }
}

const registerRouter = new RegisterRouter();

export default registerRouter.router;
