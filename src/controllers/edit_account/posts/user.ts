import { updateUser } from "../../../models/user/UserModel";
import { IUpdateForUser } from "../../../_@types/Models/User";
import ResponseManager from "../../../controllers/util/ResponseManager";
import { Request, Response } from "express";

export const updateUserController = async (req: Request, res: Response) => {
  const { name, id, pw, email, phone }: IUpdateForUser = req.body;
  const responseManager = new ResponseManager(res);

  await updateUser({ name, id, pw, email, phone });
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
