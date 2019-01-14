import path from "path";
import { Request, Response } from "express";

export const appEndPoint = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
};
