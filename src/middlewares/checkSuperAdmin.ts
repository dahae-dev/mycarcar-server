import { Request, Response, NextFunction } from "express";

import JwtManager from "../util/JwtManager";
import ResponseManager from "../controllers/util/ResponseManager";
import UserModel from "../models/UserModel/UserModel";

export const checkSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userModel = new UserModel();
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const requestedId = jwtManager.getDecodedToken().id;
  const selectedResult = await userModel.selectUserLevel(requestedId);
  if (!selectedResult.isOk) {
    return responseManager.json(412, "유저정보 읽어오기를 실패하였습니다.");
  }

  const userLevel: number = selectedResult.data[0].mb_level;
  const isSuperAdmin = userLevel === 10;

  if (isSuperAdmin) {
    return next();
  }

  return responseManager.json(412, "접근권한이 없습니다.");
};
