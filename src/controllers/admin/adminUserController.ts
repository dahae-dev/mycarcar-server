import { selectUserCountForAdmin, selectUserListForAdmin, updateUserForAdmin } from "../../models/user/AdminModel";
import { IUserList, IUpdatedData } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";
import { Request, Response } from "express";

export const getUserCountForAdminController = async (req: Request, res: Response) => {
  const responseManager = new ResponseManager(res);
  const userCount = await selectUserCountForAdmin();
  const totalCount: number = userCount[0]["count(*)"];

  responseManager.json(200, `[+] The totalCount count of users was found successfully.`, { totalCount });
};

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

export const updateUserForAdminController = async (req: Request, res: Response) => {
  const updatedData: IUpdatedData = req.body;

  const responseManager = new ResponseManager(res);
  const result = await updateUserForAdmin(updatedData);

  if (result.affectedRows === 0) {
    return responseManager.json(404, `[-] The user data with given ID was NOT FOUND.`);
  }

  responseManager.json(200, `[+] The user data with given ID was updated successfully.`);
};
