import {
  getSelectUserQuery,
  getInsertUserQuery,
  getUpdateUserQuery,
  getUpdateCompanyUserQuery,
  getInsertComnanyUserQuery
} from "./UserQuery";
import {
  IInsertForUser,
  IInsertForCompanyUser,
  IUpdateForUser,
  IUpdateForCompanyUser
} from "../../_@types/Models/User";
import { sendQuery } from "../../db";

export const selectUser = (data: { id: string }) => {
  const query = getSelectUserQuery(data);
  return sendQuery(query);
};

export const insertUser = (data: IInsertForUser) => {
  const query = getInsertUserQuery(data);
  return sendQuery(query);
};

export const insertCompanyUser = (data: IInsertForCompanyUser) => {
  const query = getInsertComnanyUserQuery(data);
  return sendQuery(query);
};

export const updateUser = (data: IUpdateForUser) => {
  const query = getUpdateUserQuery(data);
  return sendQuery(query);
};

export const updateCompanyUser = (data: IUpdateForCompanyUser) => {
  const query = getUpdateCompanyUserQuery(data);
  return sendQuery(query);
};
