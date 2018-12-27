import { Request, Response } from "express";

class LogoutController {
  public logoutRequest(req: Request, res: Response): void {
    res.removeHeader("x-access-token");
    res.json({ isSignedOut: true });
  }
}

const logoutController = new LogoutController();

export default logoutController;
