export interface ISelectFromUser {
  mb_no: number;
  mb_id: string;
  mb_password: string;
  mb_name: string;
  mb_email: string;
  mb_phone: string;
  mb_company: string;
  mb_fax: string;
  mb_level: string;
}

export interface IEditAccountForResponse {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

export interface ISignInInfomation {
  id: string;
  pw: string;
}

export interface ISelectingForDB {
  id: string;
}

export type GetSelectUserQuery = ({ id }: ISelectingForDB) => string;

export type SelectUser = ({ id }: ISelectingForDB) => Promise<any>;

export interface IInsertForUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

export type GetInsertUserQuery = ({ name, id, pw, email, phone }: IInsertForUser) => string;

export type InsertUser = ({ name, id, pw, email, phone }: IInsertForUser) => Promise<any>;

export interface IInsertForCompanyUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

export type GetInsertCompanyUserQuery = ({ name, id, pw, email, phone, company, fax }: IInsertForCompanyUser) => string;

export type InsertCompanyUser = ({ name, id, pw, email, phone, company, fax }: IInsertForCompanyUser) => Promise<any>;

export interface IUpdateForUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

export type GetUpdateUserQuery = ({ name, id, pw, email, phone }: IUpdateForUser) => string;

export type UpdateUser = ({ name, id, pw, email, phone }: IUpdateForUser) => Promise<any>;

export interface IUpdateForCompanyUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

export type GetUpdateCompanyUserQuery = ({ name, id, pw, email, phone, company, fax }: IUpdateForCompanyUser) => string;

export type UpdateCompanyUser = ({ name, id, pw, email, phone, company, fax }: IUpdateForCompanyUser) => Promise<any>;

export interface IGetSelectUserCountForAdminQuery {
  (): string;
}

export interface IGetSelectUserListForAdminQuery {
  (page: number): string;
}

export interface IGetUpdateUserForAdminQuery {
  (updatedData: IUpdatedData): string;
}

export interface IGetUserLevelQuery {
  (id: string): string;
}

export interface IUpdatedData {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  company: string;
  fax: string;
}

export interface ISelectUserCountForAdmin {
  (): Promise<any>;
}

export interface ISelectUserListForAdmin {
  (page: number): Promise<any>;
}

export interface IUpdateUserForAdmin {
  (updatedData: IUpdatedData): Promise<any>;
}

export interface ISelectUserLevel {
  (id: string): Promise<any>;
}

export interface IUserList {
  mb_id: string;
  mb_name: string;
  mb_email: string;
  mb_phone: string;
  mb_level: string;
  mb_company: string;
  mb_fax: string;
  mb_register_date: string;
}
