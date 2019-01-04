import { Request, Response } from "express";
import { Express } from "express";
import { NextFunction } from "connect";

/** 데이터베이스로부터 받은 데이터 객체의 인터페이스 */
export interface IRowDataPacket {
  u_no: number;
  u_id: string;
  u_password: string;
  u_name: string;
  u_email: string;
  u_phone: string;
}

/** 회원가입에 사용될 객체의 인터페이스 */
export interface IRegisterInfomation {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  [key: string]: string;
}

/** 유저 정보 객체의 인터페이스 */
export interface IUserInfomation {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  [key: string]: string;
}

/** 변경된 회원 정보 객체의 인터페이스. */
export interface IChangedRegisterInfomation {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

/** 쿼리문의 WHERE 조건으로 사용될 객체의 인터페이스. */
export interface ISelectKey {
  id: string;
}

/** 로그인 정보를 담은 객체의 인터페이스. */
export interface ISignInInfomation {
  id: string;
  pw: string;
}

/** 복호화된 토큰 객체의 인터페이스. */
export interface IDecodedToken {
  id: string;
  iat: number;
  exp: number;
  iss: string;
}

/** 환경설정 객체의 인터페이스. */
export interface IProcessEnv {
  [key: string]: string;
}

/** 회원정보수정 컨트롤러 비동기 함수의 인터페이스 */
export type AsyncController = (req: Request, res: Response) => Promise<void>;

/** 회원정보수정 컨트롤러 함수의 인터페이스 */
export type Controller = (req: Request, res: Response) => void;

export type AppBase = (app: Express) => void;

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
