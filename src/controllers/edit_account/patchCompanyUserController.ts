import { updateCompanyUser } from "../../models/user/UserModel";
import { IUpdateForCompanyUser } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";
import { Request, Response } from "express";

export const patchCompanyUserController = async (req: Request, res: Response) => {
  const jsonData: IUpdateForCompanyUser = req.body;
  const responseManager = new ResponseManager(res);

  await updateCompanyUser(jsonData);
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
