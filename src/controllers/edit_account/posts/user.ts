import { updateUser } from "../../../models/user/UserModel";
import { AsyncController } from "../../../_@types/Controllers";
import { IUpdateForUser } from "../../../_@types/Models/User";
import ResponseManager from "../../../controllers/util/ResponseManager";

/** 회원정보 수정 요청 */
export const updateUserController: AsyncController = async (req, res) => {
  const { name, id, pw, email, phone }: IUpdateForUser = req.body;
  const responseManager = new ResponseManager(res);

  /** 회원정보 수정이 정상적으로 이루어졌을 경우의 응답. */
  await updateUser({ name, id, pw, email, phone });
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
