import { NextFunction, Request, Response } from "express";

/** 미들웨어 함수의 타입 */
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
