import { selectUser, insertUser } from "../../models/user/UserModel";
import { AsyncController } from "../../_@types/Controllers";
import { IInsertForUser, ISelectFromUser } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";

export const postRegisterUserController: AsyncController = async (req, res) => {
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
