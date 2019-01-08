import { updateCompanyUser } from "../../../models/user/UserModel";
import { AsyncController } from "../../../_@types/Controllers";
import { IUpdateForCompanyUser } from "../../../_@types/Models/User";

/** 회원정보 수정 요청 */
export const updateCompanyUserController: AsyncController = async (
  req,
  res,
) => {
  const jsonData: IUpdateForCompanyUser = req.body;

  /** 회원정보 수정이 정상적으로 이루어졌을 경우의 응답. */
  await updateCompanyUser(jsonData);
  res.status(200).json({
    statusCode: 200,
    statusMessage: "[+] Member information has been modified as normal..",
  });
};
