import { updateCompanyUser } from "../../../models/user/UserModel";
import { AsyncController } from "../../../_@types/Controllers";
import { IUpdateForCompanyUser } from "../../../_@types/Models/User";
import ResponseManager from "../../../controllers/util/ResponseManager";

/** 회원정보 수정 요청 */
export const updateCompanyUserController: AsyncController = async (req, res) => {
  const jsonData: IUpdateForCompanyUser = req.body;
  const responseManager = new ResponseManager(res);

  /** 회원정보 수정이 정상적으로 이루어졌을 경우의 응답. */
  await updateCompanyUser(jsonData);
  responseManager.json(200, "[+] Member information has been modified as normal..");
};
