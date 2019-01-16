import {
  IInsertForUser,
  IInsertForCompanyUser,
  IUpdateForUser,
  IUpdateForCompanyUser,
  IUpdatedData
} from "../../_@types/Models/User";

import { selectQuery, insertQuery, updateQuery } from "../../db";

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
    return selectQuery(query);
  }

  insertUser(data: IInsertForUser) {
    const query = this.userQuery.getInsertUser(data);
    return insertQuery(query);
  }

  insertCompanyUser(data: IInsertForCompanyUser) {
    const query = this.userQuery.getInsertComnanyUser(data);
    return insertQuery(query);
  }

  updateUser(data: IUpdateForUser) {
    const query = this.userQuery.getUpdateUser(data);
    return updateQuery(query);
  }

  updateCompanyUser(data: IUpdateForCompanyUser) {
    const query = this.userQuery.getUpdateCompanyUser(data);
    return updateQuery(query);
  }

  selectUserCountForAdmin() {
    const query = this.adminQuery.getSelectUserCount();
    return selectQuery(query);
  }

  selectUserListForAdmin(page: number) {
    const query = this.adminQuery.getSelectUserList(page);
    return selectQuery(query);
  }

  updateUserForAdmin(updatedData: IUpdatedData) {
    const query = this.adminQuery.getUpdateUser(updatedData);
    return updateQuery(query);
  }

  selectUserLevel(id: string) {
    const query = this.adminQuery.getUserLevel(id);
    return selectQuery(query);
  }
}
