import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import { selectUserCountForAdmin } from "../../models/user/AdminModel";

export const getUserCountForAdminController = async (req: Request, res: Response) => {
  const responseManager = new ResponseManager(res);
  const userCount = await selectUserCountForAdmin();
  const totalCount: number = userCount[0]["count(*)"];

  responseManager.json(200, `[+] The totalCount count of users was found successfully.`, { totalCount });
};
