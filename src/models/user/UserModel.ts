import {
  getSelectUserQuery,
  getInsertUserQuery,
  getUpdateUserQuery,
} from "./UserQuery";
import { SelectUser, InsertUser, UpdateUser } from "../../_@types/Models/User";
import { sendQuery } from "../../db";

/** 유저의 정보 불러오기 */
export const selectUser: SelectUser = ({ id }) => {
  const query = getSelectUserQuery({ id });
  return sendQuery(query);
};

/** 유저의 정보를 등록. */
export const insertUser: InsertUser = ({ name, id, pw, email, phone }) => {
  const query = getInsertUserQuery({ name, id, pw, email, phone });
  return sendQuery(query);
};

/** 유저 정보를 업데이트. */
export const updateUser: UpdateUser = ({ name, id, pw, email, phone }) => {
  const query = getUpdateUserQuery({ name, id, pw, email, phone });
  return sendQuery(query);
};
