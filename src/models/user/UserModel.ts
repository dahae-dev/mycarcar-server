import {
  getSelectUserQuery,
  getInsertUserQuery,
  getUpdateUserQuery,
  getUpdateCompanyUserQuery,
  getInsertComnanyUserQuery,
} from "./UserQuery";
import {
  SelectUser,
  InsertUser,
  UpdateUser,
  InsertCompanyUser,
  UpdateCompanyUser,
} from "../../_@types/Models/User";
import { sendQuery } from "../../db";

/** 유저의 정보 불러오기 */
export const selectUser: SelectUser = (data) => {
  const query = getSelectUserQuery(data);
  return sendQuery(query);
};

/** 유저의 정보를 등록. */
export const insertUser: InsertUser = (data) => {
  const query = getInsertUserQuery(data);
  return sendQuery(query);
};

/** 캐피탈 관리자 유저의 정보를 등록. */
export const insertCompanyUser: InsertCompanyUser = (data) => {
  const query = getInsertComnanyUserQuery(data);
  console.log("query :", query);
  return sendQuery(query);
};

/** 유저 정보를 업데이트. */
export const updateUser: UpdateUser = (data) => {
  const query = getUpdateUserQuery(data);
  return sendQuery(query);
};

/** 유저 정보를 업데이트. */
export const updateCompanyUser: UpdateCompanyUser = (data) => {
  const query = getUpdateCompanyUserQuery(data);
  return sendQuery(query);
};
