import { IUserList, IUpdatedData } from "../../_@types/Models/User";

import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";

import { selectUserCountForAdmin, selectUserListForAdmin, updateUserForAdmin } from "../../models/user/AdminModel";

class AdminController {
  private req: Request;
  private res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  async getUserCount() {
    const responseManager = new ResponseManager(this.res);

    const userCount = await selectUserCountForAdmin();
    const totalCount: number = userCount[0]["count(*)"];

    responseManager.json(200, `[+] The totalCount count of users was found successfully.`, { totalCount });
  }

  async getUserList() {
    const page: number = this.req.params.page;

    const responseManager = new ResponseManager(this.res);
    const userListData: IUserList[] = await selectUserListForAdmin(page);
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

  async updateUser() {
    const updatedData: IUpdatedData = this.req.body;

    const responseManager = new ResponseManager(this.res);
    const result = await updateUserForAdmin(updatedData);

    if (result.affectedRows === 0) {
      return responseManager.json(404, `[-] The user data with given ID was NOT FOUND.`);
    }

    responseManager.json(200, `[+] The user data with given ID was updated successfully.`);
  }
}
