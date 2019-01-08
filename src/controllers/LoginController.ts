import { selectUser } from "../models/user/UserModel";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { AsyncController } from "../_@types/Controllers";
import { ISignInInfomation, ISelectFromUser } from "../_@types/Models/User";
import { IProcessEnv } from "../_@types/env";

/** 로그인 요청. */
export const postUserController: AsyncController = async (req, res) => {
  const { id, pw }: ISignInInfomation = req.body;

  const userInfomations: ISelectFromUser[] = await selectUser({ id });
  const userInfomation = userInfomations[0];

  /** 회원 정보가 없을 경우의 응답. */
  const hasNotUserInfomations = userInfomation === undefined;
  if (hasNotUserInfomations) {
    res.status(412).json({
      statusCode: 412,
      statusMessage: "[-] No matching information exists.",
    });
    return;
  }

  /** 비밀번호가 맞지 않을 경우의 응답. */
  if (userInfomation.mb_password !== pw) {
    res.status(412).json({
      statusCode: 412,
      statusMessage: "[-] No matching information exists.",
    });
    return;
  }

  const payload: {} = { id };
  const { HOST, PORT, SECRET, EXPIREIN } = process.env as IProcessEnv;
  const options = {
    issuer: `${HOST}:${PORT}`,
    expiresIn: EXPIREIN,
  } as SignOptions;

  /** JWT 토큰 발행을 위한 응답. */
  const rawtoken = jsonwebtoken.sign(payload, SECRET, options);
  res.setHeader("x-access-token", rawtoken);
  res.setHeader("level", userInfomation.mb_level);
  res.status(204).json({
    statusCode: 204,
    statusMessage: "[+] The token has been issued as normal.",
  });
};
