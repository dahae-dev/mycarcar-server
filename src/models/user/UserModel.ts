import {
  getSelectUserQuery,
  getInsertUserQuery,
  getUpdateUserQuery,
  getUpdateCompanyUserQuery,
  getInsertComnanyUserQuery
} from "./UserQuery";
import { SelectUser, InsertUser, UpdateUser, InsertCompanyUser, UpdateCompanyUser } from "../../_@types/Models/User";
import { sendQuery } from "../../db";

export const selectUser: SelectUser = (data) => {
  const query = getSelectUserQuery(data);
  return sendQuery(query);
};

export const insertUser: InsertUser = (data) => {
  const query = getInsertUserQuery(data);
  return sendQuery(query);
};

export const insertCompanyUser: InsertCompanyUser = (data) => {
  const query = getInsertComnanyUserQuery(data);
  return sendQuery(query);
};

export const updateUser: UpdateUser = (data) => {
  const query = getUpdateUserQuery(data);
  return sendQuery(query);
};

export const updateCompanyUser: UpdateCompanyUser = (data) => {
  const query = getUpdateCompanyUserQuery(data);
  return sendQuery(query);
};
