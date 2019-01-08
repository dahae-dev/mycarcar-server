import { selectUser } from "../models/user/UserModel";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { AsyncController, IJwtParam, IPayload } from "../_@types/Controllers";
import { ISignInInfomation, ISelectFromUser } from "../_@types/Models/User";
import ResponseManager from "./util/ResponseManager";

/** 로그인 요청. */
export const postUserController: AsyncController = async (req, res) => {
  const { id, pw }: ISignInInfomation = req.body;
  const responseManager = new ResponseManager(res);

  const userInfomations: ISelectFromUser[] = await selectUser({ id });
  const userInfomation = userInfomations[0];

  /** 회원 정보가 없을 경우의 응답. */
  const hasNotUserInfomations = userInfomation === undefined;
  if (hasNotUserInfomations) {
    return responseManager.json(412, "[-] No matching information exists.");
  }

  /** 비밀번호가 맞지 않을 경우의 응답. */
  if (userInfomation.mb_password !== pw) {
    return responseManager.json(412, "[-] No matching information exists.");
  }

  const payload: IPayload = { id };
  const { HOST, PORT, SECRET, EXPIREIN } = process.env as IJwtParam;
  const options: SignOptions = {
    issuer: `${HOST}:${PORT}`,
    expiresIn: EXPIREIN,
  };

  /** JWT 토큰 발행을 위한 응답. */
  const rawtoken = jsonwebtoken.sign(payload, SECRET, options);
  res.setHeader("x-access-token", rawtoken);

  responseManager.json(204, "[+] The token has been issued as normal.", { level: userInfomation.mb_level });
};
