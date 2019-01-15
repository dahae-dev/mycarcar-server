import {
  IInsertForUser,
  IInsertForCompanyUser,
  IUpdateForUser,
  IUpdateForCompanyUser,
  IUpdatedData
} from "../../_@types/Models/User";

import { sendQuery } from "../../db";

import UserQuery from "../../querys/UserQuery/UserQuery";
import AdminQuery from "../../querys/AdminQuery/AdminQuery";

export default class UserModel {
  userQuery: UserQuery;
  adminQuery: AdminQuery;

  constructor() {
    this.userQuery = new UserQuery();
    this.adminQuery = new AdminQuery();
  }

  selectUser(data: { id: string }) {
    const query = this.userQuery.getSelectUser(data);
    return sendQuery(query);
  }

  insertUser(data: IInsertForUser) {
    const query = this.userQuery.getInsertUser(data);
    return sendQuery(query);
  }

  insertCompanyUser(data: IInsertForCompanyUser) {
    const query = this.userQuery.getInsertComnanyUser(data);
    return sendQuery(query);
  }

  updateUser(data: IUpdateForUser) {
    const query = this.userQuery.getUpdateUser(data);
    return sendQuery(query);
  }

  updateCompanyUser(data: IUpdateForCompanyUser) {
    const query = this.userQuery.getUpdateCompanyUser(data);
    return sendQuery(query);
  }

  selectUserCountForAdmin() {
    const query = this.adminQuery.getSelectUserCount();
    return sendQuery(query);
  }

  selectUserListForAdmin(page: number) {
    const query = this.adminQuery.getSelectUserList(page);
    return sendQuery(query);
  }

  updateUserForAdmin(updatedData: IUpdatedData) {
    const query = this.adminQuery.getUpdateUser(updatedData);
    return sendQuery(query);
  }

  selectUserLevel(id: string) {
    const query = this.adminQuery.getUserLevel(id);
    return sendQuery(query);
  }
}
