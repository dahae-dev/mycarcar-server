import { Request, Response } from "express";
import path from "path";

class RootController {
  public getRoot(req: Request, res: Response): void {
    console.log("token :", req.headers);
    res.sendFile(path.join(__dirname, "../views/index.html"));
  }
}

const rootController = new RootController();

export default rootController;
