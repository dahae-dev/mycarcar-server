import { updateUser } from "../../models/user/UserModel";
import { AsyncController } from "../../_@types/Controllers";
import { IUpdateForDB } from "../../_@types/Models/User";

/** 회원정보 수정 요청 */
export const updateAccount: AsyncController = async (req, res) => {
  const { name, id, pw, email, phone } = req.body as IUpdateForDB;

  /** 회원정보 수정이 정상적으로 이루어졌을 경우의 응답. */
  await updateUser({ name, id, pw, email, phone });
  res.statusCode = 200;
  res.statusMessage = "[+] Member information has been modified as normal..";
  res.end();
};
