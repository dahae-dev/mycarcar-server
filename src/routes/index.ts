import express, { Request, Response, Router } from "express";

class Root {
  public router: Router;

  public constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("<h1>Hello</h1>");
    });
  }
}

const rootRoutes = new Root();

export default rootRoutes.router;
