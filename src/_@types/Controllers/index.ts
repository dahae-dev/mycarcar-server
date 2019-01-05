import { Request, Response } from "express";

/** 컨트롤러 비동기 함수의 타입 */
export type AsyncController = (req: Request, res: Response) => Promise<void>;

/** 컨트롤러 함수의 타입 */
export type Controller = (req: Request, res: Response) => void;
