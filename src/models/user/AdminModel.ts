import {
  getSelectUserCountForAdminQuery,
  getSelectUserListForAdminQuery,
  getUpdateUserForAdminQuery,
  getUserLevelQuery
} from "./AdminQuery";
import { IUpdatedData } from "../../_@types/Models/User";
import { sendQuery } from "../../db";

export const selectUserCountForAdmin = () => {
  const query = getSelectUserCountForAdminQuery();
  return sendQuery(query);
};

export const selectUserListForAdmin = (page: number) => {
  const query = getSelectUserListForAdminQuery(page);
  return sendQuery(query);
};

export const updateUserForAdmin = (updatedData: IUpdatedData) => {
  const query = getUpdateUserForAdminQuery(updatedData);
  return sendQuery(query);
};

export const selectUserLevel = (id: string) => {
  const query = getUserLevelQuery(id);
  return sendQuery(query);
};
