import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import { IUpdateForUser } from "../../_@types/Models/User";
import { updateUser } from "../../models/user/UserModel";

export const patchUserController = async (req: Request, res: Response) => {
  const { name, id, pw, email, phone }: IUpdateForUser = req.body;
  const responseManager = new ResponseManager(res);

  await updateUser({ name, id, pw, email, phone });
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
