import { Request, Response } from "express";
import { NextFunction } from "connect";

import jsonwebtoken from "jsonwebtoken";

export const authMiddlemare = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (process.env.SECRET === undefined) {
    throw new Error("[-] : .env file에 SECRET이 없습니다.");
  }

  if (req.headers["x-access-token"] === undefined) {
    res.statusCode = 401;
    res.statusMessage = "[-] You don't have a token.";
    return res.end();
  }

  if (Array.isArray(req.headers["x-access-token"])) {
    res.statusCode = 401;
    res.statusMessage = "[-] Invalid token.";
    return res.end();
  }

  const secret: string = process.env.SECRET;
  const rawToken: string = req.headers["x-access-token"] as string;
  const decodedToken = jsonwebtoken.verify(rawToken, secret) as IDecodedToken;
  const isValidToken: boolean = decodedToken.exp > decodedToken.iat;

  if (isValidToken) {
    return next();
  }

  res.statusCode = 401;
  res.statusMessage = "[-] Expired token.";
  res.end();
};
