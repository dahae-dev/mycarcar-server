import JwtManager from "../util/JwtManager";
import ResponseManager from "../controllers/util/ResponseManager";
import { Request, Response, NextFunction } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const hasEncodedToken = jwtManager.hasEncodedToken();
  if (!hasEncodedToken) {
    return responseManager.json(401, "로그인을 해주세요.");
  }

  const isValidEncodedToken = jwtManager.isValidEncodedToken();
  if (!isValidEncodedToken) {
    return responseManager.json(401, "로그인을 해주세요.");
  }

  const isValidToken = jwtManager.isValidToken();
  if (isValidToken) {
    return next();
  }

  return responseManager.json(401, "로그인을 해주세요.");
};
