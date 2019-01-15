import { IUserList, IUpdatedData } from "../../_@types/Models/User";

import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class AdminController {
  constructor() {
    this.userModel = new UserModel();

    this.getUserCount = this.getUserCount.bind(this);
    this.getUserList = this.getUserList.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  private userModel: UserModel;

  async getUserCount(req: Request, res: Response) {
    const responseManager = new ResponseManager(res);

    const userCount = await this.userModel.selectUserCountForAdmin();
    const totalCount: number = userCount[0]["count(*)"];

    responseManager.json(200, `[+] The totalCount count of users was found successfully.`, { totalCount });
  }

  async getUserList(req: Request, res: Response) {
    const page: number = req.params.page;

    const responseManager = new ResponseManager(res);
    const userListData: IUserList[] = await this.userModel.selectUserListForAdmin(page);
    const userList = userListData.map((data) => {
      return {
        id: data.mb_id,
        name: data.mb_name,
        email: data.mb_email,
        phone: data.mb_phone,
        level: data.mb_level,
        company: data.mb_company,
        fax: data.mb_fax,
        registerDate: data.mb_register_date
      };
    });

    if (!userList.length) {
      return responseManager.json(404, `[-] The user list with given page was NOT FOUND.`);
    }

    responseManager.json(200, `[+] The user list per page was found successfully.`, { userList });
  }

  async updateUser(req: Request, res: Response) {
    const updatedData: IUpdatedData = req.body;

    const responseManager = new ResponseManager(res);
    const result = await this.userModel.updateUserForAdmin(updatedData);

    if (result.affectedRows === 0) {
      return responseManager.json(404, `[-] The user data with given ID was NOT FOUND.`);
    }

    responseManager.json(200, `[+] The user data with given ID was updated successfully.`);
  }
}
