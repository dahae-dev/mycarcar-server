import { Request, Response, NextFunction } from "express";

import JwtManager from "../util/JwtManager";
import ResponseManager from "../controllers/util/ResponseManager";
import UserModel from "../models/UserModel/UserModel";

export const checkSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userModel = new UserModel();
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const requestedId = jwtManager.getDecodedToken().id;
  const userLevel = (await userModel.selectUserLevel(requestedId))[0].mb_level;
  const isSuperAdmin = userLevel === 10;

  if (isSuperAdmin) {
    return next();
  }

  return responseManager.json(403, "[-] Forbidden");
};
