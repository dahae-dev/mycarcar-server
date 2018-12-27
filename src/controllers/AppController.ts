import { Request, Response } from "express";
import path from "path";

export default (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../client-lift29-mycarcar-web/build/index.html"),
  );
};
