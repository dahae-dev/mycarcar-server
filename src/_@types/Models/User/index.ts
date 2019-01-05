/** 데이터베이스로부터 받은 데이터 객체의 인터페이스 */
export interface ISelectFromDB {
  u_no: number;
  u_id: string;
  u_password: string;
  u_name: string;
  u_email: string;
  u_phone: string;
}

/** DB에서 불러온 회원의 모든 정보를 응답으로 보내주기 위한 JSON DATA의 인터페이스. */
export interface IEditAccountForResponse {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

/** DB에서 회원의 모든 정보를 입력하기 위한 인터페이스. */
export interface IInsertForDB {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

/** DB에서 회원의 모든 정보를 변경하기 위한 인터페이스. */
export interface IUpdateForDB {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

/** DB에서 유저 정보를 읽어오기 위한  */
export interface ISelectingForDB {
  id: string;
}

/** 로그인 정보를 담은 객체의 인터페이스. */
export interface ISignInInfomation {
  id: string;
  pw: string;
}

/** 모델에서 유저정보를 읽기위한 함수의 타입 */
export type SelectUser = ({ id }: ISelectingForDB) => Promise<any>;

/** 모델에서 유저정보를 삽입하는 함수의 타입(회원가입) */
export type InsertUser = (
  { name, id, pw, email, phone }: IInsertForDB,
) => Promise<any>;

/** 모델에서 유저정보를 업데이트를 하는 함수의 타입(회원정보 수정) */
export type UpdateUser = (
  { name, id, pw, email, phone }: IUpdateForDB,
) => Promise<any>;

/** DB에서 유저 정보 삽입을 위한 쿼리문을 만드는 함수의 타입 */
export type GetInsertUserQuery = (
  { name, id, pw, email, phone }: IInsertForDB,
) => string;

/** DB에서 유저 정보 업데이트를 위한 쿼리문을 함수의 타입 */
export type GetUpdateUserQuery = (
  { name, id, pw, email, phone }: IUpdateForDB,
) => string;

/** DB에서 유저 정보를 읽는 쿼리문을 만드는 함수의 타입 */
export type GetSelectUserQuery = ({ id }: ISelectingForDB) => string;
