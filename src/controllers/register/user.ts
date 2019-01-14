import { selectUser, insertUser } from "../../models/user/UserModel";
import { IInsertForUser, ISelectFromUser } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";
import { Request, Response } from "express";

export const postRegisterUserController = async (req: Request, res: Response) => {
  const insertForUser: IInsertForUser = req.body;
  const responseManager = new ResponseManager(res);

  const userInfomations: ISelectFromUser[] = await selectUser({
    id: insertForUser.id
  });

  const hasNotUserInfomation = userInfomations[0] === undefined;
  if (hasNotUserInfomation) {
    await insertUser(insertForUser);
    return responseManager.json(200, "[+] Membership registration has been carried out normally.");
  }

  return responseManager.json(412, "[-] ID already exists.");
};
