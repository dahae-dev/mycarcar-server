import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";

export default class LoginController {
  public async postUserInfo(req: Request, res: Response): Promise<void> {
    const userModel = new UserModel();
    const { id, pw } = req.body as ISignInInfo;
    const userInfomations = (await userModel.getUser({
      id,
    })) as IRowDataPacket[];
    const userInfomation = userInfomations[0];
    const hasNotUserInfomations = userInfomation === undefined ? true : false;

    if (hasNotUserInfomations) {
      res.statusCode = 412;
      res.statusMessage = "[-] No matching information exists.";
      return res.end();
    }

    if (userInfomation.u_password !== pw) {
      res.statusCode = 412;
      res.statusMessage = "[-] No matching information exists.";
      return res.end();
    }

    if (process.env.HOST === undefined) {
      throw new Error("[-] .env file에 HOST가 작성되지 않았습니다.");
    }

    if (process.env.PORT === undefined) {
      throw new Error("[-] .env file에 PORT가 작성되지 않았습니다.");
    }

    if (process.env.SECRET === undefined) {
      throw new Error("[-] .env file에 SECRET이 작성되지 않았습니다.");
    }

    const { HOST, PORT, SECRET } = process.env;

    const payload = { id } as object;
    const options = {
      issuer: `${HOST}:${PORT}`,
      expiresIn: 1000,
    } as SignOptions;

    const rawtoken = jsonwebtoken.sign(payload, SECRET, options) as string;
    res.setHeader("x-access-token", rawtoken);
    res.statusCode = 204;
    res.statusMessage = "[+] The token has been issued as normal.";
    res.end();
  }
}
