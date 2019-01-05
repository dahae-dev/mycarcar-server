import { selectUser } from "../../models/user/UserModel";
import JwtManager from "../../util/JwtManager";
import { AsyncController } from "../../_@types/Controllers";
import { IEditAccountForResponse } from "../../_@types/Models/User";

/** 계정 정보 수정을 위한 회원정보 요청. */
export const getUser: AsyncController = async (req, res) => {
  const jwtManager = new JwtManager(req);

  const idOfRequester = jwtManager.getDecodedToken().id;

  const userInfomation = (await selectUser({ id: idOfRequester }))[0];

  const data: IEditAccountForResponse = {
    id: userInfomation.u_id,
    pw: "",
    name: userInfomation.u_name,
    email: userInfomation.u_email,
    phone: userInfomation.u_phone,
  };

  /** 일치하는 회원 정보가 있을 경우의 응답. */
  res.statusCode = 200;
  res.statusMessage = "[+] Member information has been returned as normal.";
  res.json(data);
};
