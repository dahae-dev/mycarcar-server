import { selectUser } from "../models/user/UserModel";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { AsyncController } from "../_@types/Controllers";
import { ISignInInfomation, ISelectFromDB } from "../_@types/Models/User";
import { IProcessEnv } from "../_@types/env";

/** 로그인 요청. */
export const postUser: AsyncController = async (req, res) => {
  const { id, pw } = req.body as ISignInInfomation;

  const userInfomations = (await selectUser({ id })) as ISelectFromDB[];
  const userInfomation = userInfomations[0];

  /** 회원 정보가 없을 경우의 응답. */
  const hasNotUserInfomations = userInfomation === undefined;
  if (hasNotUserInfomations) {
    res.statusCode = 412;
    res.statusMessage = "[-] No matching information exists.";
    return res.end();
  }

  /** 비밀번호가 맞지 않을 경우의 응답. */
  if (userInfomation.u_password !== pw) {
    res.statusCode = 412;
    res.statusMessage = "[-] No matching information exists.";
    return res.end();
  }

  const payload = { id } as object;
  const { HOST, PORT, SECRET, EXPIREIN } = process.env as IProcessEnv;
  const options = {
    issuer: `${HOST}:${PORT}`,
    expiresIn: EXPIREIN,
  } as SignOptions;

  /** JWT 토큰 발행을 위한 응답. */
  const rawtoken = jsonwebtoken.sign(payload, SECRET, options);
  res.setHeader("x-access-token", rawtoken);
  res.statusCode = 204;
  res.statusMessage = "[+] The token has been issued as normal.";
  res.end();
};
