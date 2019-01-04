import { Request, Response } from "express";
import { Express } from "express";
import { NextFunction } from "connect";

/** 데이터베이스로부터 받은 데이터 객체의 인터페이스 */
export interface IUserData {
  u_no: number;
  u_id: string;
  u_password: string;
  u_name: string;
  u_email: string;
  u_phone: string;
}

/** 회원가입에 사용될 객체의 인터페이스 */
export interface IRegisterData {
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

/** 회원정보수정 컨트롤러 비동기 함수의 타입 */
export type AsyncController = (req: Request, res: Response) => Promise<void>;

/** 회원정보수정 컨트롤러 함수의 타입 */
export type Controller = (req: Request, res: Response) => void;

/** app의 미들웨어, 라우터, 환경설정런처를 위한 함수의 타입 */
export type AppBase = (app: Express) => void;

/** 미들웨어 함수의 타입 */
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

/** 모델에서 유저정보를 읽기위한 함수의 타입 */
export type SelectUser = ({ id }: ISelectKey) => Promise<any>;

/** 모델에서 유저정보를 삽입하는 함수의 타입 */
export type InsertUser = (
  { name, id, pw, email, phone }: IRegisterData,
) => Promise<any>;

/** 모델에서 유저정보를 업데이트를 하는 함수의 타입 */
export type UpdateUser = (
  { name, id, pw, email, phone }: IRegisterData,
) => Promise<any>;

/** 모델에서 DB에 쿼리문을 날리기 위한 함수의 타입 */
export type SendQuery = (query: string) => Promise<any>;

/** DB에서 유저 정보 업데이트를 위한 쿼리문을 함수의 타입 */
export type GetUpdateUserQuery = (
  { name, id, pw, email, phone }: IRegisterData,
) => string;

/** DB에서 유저 정보 삽입을 위한 쿼리문을 만드는 함수의 타입 */
export type GetInsertUserQuery = (
  { name, id, pw, email, phone }: IRegisterData,
) => string;

/** DB에서 유저 정보를 읽는 쿼리문을 만드는 함수의 타입 */
export type GetSelectUserQuery = ({ id }: ISelectKey) => string;
