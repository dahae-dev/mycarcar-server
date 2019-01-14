import { selectUser, insertCompanyUser } from "../../models/user/UserModel";
import { AsyncController } from "../../_@types/Controllers";
import { IInsertForCompanyUser, ISelectFromUser } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";

export const postRegisterCompanyUserController: AsyncController = async (req, res) => {
  const insertForCompanyUser: IInsertForCompanyUser = req.body;
  const responseManager = new ResponseManager(res);

  const userInfomations: ISelectFromUser[] = await selectUser({ id: insertForCompanyUser.id });

  const hasNotUserInfomation = userInfomations[0] === undefined;
  if (hasNotUserInfomation) {
    await insertCompanyUser(insertForCompanyUser);

    return responseManager.json(200, "[+] Membership registration has been carried out normally.");
  }

  return responseManager.json(412, "[-] ID already exists.");
};
