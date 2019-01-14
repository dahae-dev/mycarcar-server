import JwtManager from "../util/JwtManager";
import { selectUserLevel } from "../models/user/AdminModel";
import ResponseManager from "../controllers/util/ResponseManager";
import { Request, Response, NextFunction } from "express";

export const checkSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const requestedId = jwtManager.getDecodedToken().id;
  const userLevel = (await selectUserLevel(requestedId))[0].mb_level;
  const isSuperAdmin = userLevel === 10;

  if (isSuperAdmin) {
    return next();
  }

  return responseManager.json(403, "[-] Forbidden");
};
