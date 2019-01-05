/** 데이터베이스로부터 받은 유저정보 인터페이스 */
export interface ISelectFromUser {
  mb_no: number;
  mb_id: string;
  mb_password: string;
  mb_name: string;
  mb_email: string;
  mb_phone: string;
  mb_company: string;
  mb_fax: string;
}

/** DB에서 불러온 회원의 모든 정보를 응답으로 보내주기 위한 JSON DATA의 인터페이스. */
export interface IEditAccountForResponse {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

/** 로그인 정보를 담은 객체의 인터페이스. */
export interface ISignInInfomation {
  id: string;
  pw: string;
}

/** DB에서 유저 정보를 읽어오기 위한  */
export interface ISelectingForDB {
  id: string;
}

/** DB에서 유저 정보를 읽는 쿼리문을 만드는 함수의 타입 */
export type GetSelectUserQuery = ({ id }: ISelectingForDB) => string;

/** 모델에서 유저정보를 읽기위한 함수의 타입 */
export type SelectUser = ({ id }: ISelectingForDB) => Promise<any>;

/** DB에서 회원의 모든 정보를 입력하기 위한 인터페이스. */
export interface IInsertForUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

/** DB에서 유저 정보 삽입을 위한 쿼리문을 만드는 함수의 타입 */
export type GetInsertUserQuery = (
  { name, id, pw, email, phone }: IInsertForUser,
) => string;

/** 모델에서 유저정보를 삽입하는 함수의 타입(회원가입) */
export type InsertUser = (
  { name, id, pw, email, phone }: IInsertForUser,
) => Promise<any>;

/** DB에서 캐피탈 관라자의 모든 정보를 입력하기 위한 인터페이스. */
export interface IInsertForCompanyUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

/** DB에서 유저 정보 삽입을 위한 쿼리문을 만드는 함수의 타입 */
export type GetInsertCompanyUserQuery = (
  { name, id, pw, email, phone, company, fax }: IInsertForCompanyUser,
) => string;

/** 모델에서 유저정보를 삽입하는 함수의 타입(회원가입) */
export type InsertCompanyUser = (
  { name, id, pw, email, phone, company, fax }: IInsertForCompanyUser,
) => Promise<any>;

/** DB에서 회원의 모든 정보를 변경하기 위한 인터페이스. */
export interface IUpdateForUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

/** DB에서 유저 정보 업데이트를 위한 쿼리문을 함수의 타입 */
export type GetUpdateUserQuery = (
  { name, id, pw, email, phone }: IUpdateForUser,
) => string;

/** 모델에서 유저정보를 업데이트를 하는 함수의 타입(회원정보 수정) */
export type UpdateUser = (
  { name, id, pw, email, phone }: IUpdateForUser,
) => Promise<any>;

/** DB에서 회원의 모든 정보를 변경하기 위한 인터페이스. */
export interface IUpdateForCompanyUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

/** DB에서 유저 정보 업데이트를 위한 쿼리문을 함수의 타입 */
export type GetUpdateCompanyUserQuery = (
  { name, id, pw, email, phone, company, fax }: IUpdateForCompanyUser,
) => string;

/** 모델에서 유저정보를 업데이트를 하는 함수의 타입(회원정보 수정) */
export type UpdateCompanyUser = (
  { name, id, pw, email, phone, company, fax }: IUpdateForCompanyUser,
) => Promise<any>;
