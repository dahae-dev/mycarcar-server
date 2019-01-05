import { selectUser, insertCompanyUser } from "../../models/user/UserModel";
import { AsyncController } from "../../_@types/Controllers";
import {
  IInsertForCompanyUser,
  ISelectFromUser,
} from "../../_@types/Models/User";

/** 회원가입 요청을 위한 컨트롤러. */
export const postRegisterCompanyUser: AsyncController = async (req, res) => {
  const insertForCompanyUser: IInsertForCompanyUser = req.body;

  const userInfomations: ISelectFromUser[] = await selectUser({
    id: insertForCompanyUser.id,
  });

  /** 같은 회원 정보가 없으므로 회원가입 조건 만족할 경우의 응답. */
  const hasNotUserInfomation = userInfomations[0] === undefined;
  if (hasNotUserInfomation) {
    await insertCompanyUser(insertForCompanyUser);

    res.statusCode = 200;
    res.statusMessage =
      "[+] Membership registration has been carried out normally.";
    return res.end();
  }

  /** 이미 해당 아이디가 존재할 경우의 응답. */
  res.statusCode = 412;
  res.statusMessage = "[-] ID already exists.";
  res.end();
};
