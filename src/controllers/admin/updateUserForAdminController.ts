import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import { updateUserForAdmin } from "../../models/user/AdminModel";
import { IUpdatedData } from "../../_@types/Models/User";

export const updateUserForAdminController = async (req: Request, res: Response) => {
  const updatedData: IUpdatedData = req.body;

  const responseManager = new ResponseManager(res);
  const result = await updateUserForAdmin(updatedData);

  if (result.affectedRows === 0) {
    return responseManager.json(404, `[-] The user data with given ID was NOT FOUND.`);
  }

  responseManager.json(200, `[+] The user data with given ID was updated successfully.`);
};
