import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import { selectUserListForAdmin } from "../../models/user/AdminModel";
import { IUserList } from "../../_@types/Models/User";

export const getUserListForAdminController = async (req: Request, res: Response) => {
  const page = req.params.page as number;

  const responseManager = new ResponseManager(res);
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
};
