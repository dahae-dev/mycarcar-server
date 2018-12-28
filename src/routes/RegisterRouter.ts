import { Router } from "express";
import RegisterController from "../controllers/RegisterController";

class RegisterRouter {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    const { registerRequest } = new RegisterController();
    this.router.post("/", registerRequest);
  }
}

const registerRouter = new RegisterRouter();

export default registerRouter.router;
