import {
  getSelectUserCountForAdminQuery,
  getSelectUserListForAdminQuery,
  getUpdateUserForAdminQuery,
  getUserLevelQuery
} from "./AdminQuery";
import {
  ISelectUserCountForAdmin,
  ISelectUserListForAdmin,
  IUpdateUserForAdmin,
  ISelectUserLevel
} from "../../_@types/Models/User";
import { sendQuery } from "../../db";

export const selectUserCountForAdmin: ISelectUserCountForAdmin = () => {
  const query = getSelectUserCountForAdminQuery();
  return sendQuery(query);
};

export const selectUserListForAdmin: ISelectUserListForAdmin = (page) => {
  const query = getSelectUserListForAdminQuery(page);
  return sendQuery(query);
};

export const updateUserForAdmin: IUpdateUserForAdmin = (updatedData) => {
  const query = getUpdateUserForAdminQuery(updatedData);
  return sendQuery(query);
};

export const selectUserLevel: ISelectUserLevel = (id) => {
  const query = getUserLevelQuery(id);
  return sendQuery(query);
};
