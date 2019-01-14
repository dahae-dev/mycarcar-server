import { updateCompanyUser } from "../../../models/user/UserModel";
import { AsyncController } from "../../../_@types/Controllers";
import { IUpdateForCompanyUser } from "../../../_@types/Models/User";
import ResponseManager from "../../../controllers/util/ResponseManager";

export const updateCompanyUserController: AsyncController = async (req, res) => {
  const jsonData: IUpdateForCompanyUser = req.body;
  const responseManager = new ResponseManager(res);

  await updateCompanyUser(jsonData);
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
