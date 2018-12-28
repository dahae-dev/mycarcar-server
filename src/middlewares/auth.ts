import { Request, Response } from "express";
import { NextFunction } from "connect";

export const authMiddlemare = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers["x-access-token"];
  const hasToken: boolean = !!token;

  console.log(token);

  if (hasToken) {
    next();
  } else {
    res.redirect("/api/login");
  }
};
