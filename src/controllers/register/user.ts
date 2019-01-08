import { selectUser, insertUser } from "../../models/user/UserModel";
import { AsyncController } from "../../_@types/Controllers";
import { IInsertForUser, ISelectFromUser } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";

/** 회원가입 요청을 위한 컨트롤러. */
export const postRegisterUserController: AsyncController = async (req, res) => {
  const insertForUser: IInsertForUser = req.body;
  const responseManager = new ResponseManager(res);

  const userInfomations: ISelectFromUser[] = await selectUser({
    id: insertForUser.id,
  });

  /** 같은 회원 정보가 없으므로 회원가입 조건 만족할 경우의 응답. */
  const hasNotUserInfomation = userInfomations[0] === undefined;
  if (hasNotUserInfomation) {
    await insertUser(insertForUser);
    return responseManager.json(200, "[+] Membership registration has been carried out normally.");
  }

  /** 이미 해당 아이디가 존재할 경우의 응답. */
  return responseManager.json(412, "[-] ID already exists.");
};
