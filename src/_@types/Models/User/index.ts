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

export interface IInsertForUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

export interface IInsertForCompanyUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
}

export interface IUpdateForUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

export interface IUpdateForCompanyUser {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  company: string;
  fax: string;
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
