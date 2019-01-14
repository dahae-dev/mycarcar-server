import { Request, Response } from "express";

export type AsyncController = (req: Request, res: Response) => Promise<void>;

export type Controller = (req: Request, res: Response) => void;

export interface IJwtParam {
  HOST: string;
  PORT: string;
  SECRET: string;
  EXPIREIN: string;
  [key: string]: string;
}

export interface IPayload {
  id: string;
}
