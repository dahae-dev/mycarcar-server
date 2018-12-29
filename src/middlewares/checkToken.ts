import { Request, Response } from "express";
import { NextFunction } from "connect";

import JwtManager from "../util/JwtManager";

export default (req: Request, res: Response, next: NextFunction): void => {
  const jwtManager = new JwtManager(req);

  const hasNotRawToken = !jwtManager.hasRawToken();
  if (hasNotRawToken) {
    res.statusCode = 401;
    res.statusMessage = "[-] You don't have a token.";
    return res.end();
  }

  const isNotInvalidRawToken = !jwtManager.isInvalidRawToken();
  if (isNotInvalidRawToken) {
    res.statusCode = 401;
    res.statusMessage = "[-] Invalid token.";
    return res.end();
  }

  const isValidToken = jwtManager.isValidToken();
  if (isValidToken) {
    return next();
  }

  res.statusCode = 401;
  res.statusMessage = "[-] Expired token.";
  return res.end();
};
