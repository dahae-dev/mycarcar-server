import { updateUser } from "../../../models/user/UserModel";
import { AsyncController } from "../../../_@types/Controllers";
import { IUpdateForUser } from "../../../_@types/Models/User";
import ResponseManager from "../../../controllers/util/ResponseManager";

export const updateUserController: AsyncController = async (req, res) => {
  const { name, id, pw, email, phone }: IUpdateForUser = req.body;
  const responseManager = new ResponseManager(res);

  await updateUser({ name, id, pw, email, phone });
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
