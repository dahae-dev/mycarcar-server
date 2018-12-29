import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";

export default class LoginController {
  public async postUserInfo(req: Request, res: Response): Promise<void> {
    const userModel = new UserModel();

    const { id, pw } = req.body as ISignInInfomation;

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

    const { HOST, PORT, SECRET, EXPIREIN } = process.env as IProcessEnv;

    const payload = { id } as object;
    const options = {
      issuer: `${HOST}:${PORT}`,
      expiresIn: EXPIREIN,
    } as SignOptions;

    const rawtoken = jsonwebtoken.sign(payload, SECRET, options) as string;
    res.setHeader("x-access-token", rawtoken);
    res.statusCode = 204;
    res.statusMessage = "[+] The token has been issued as normal.";
    res.end();
  }
}
