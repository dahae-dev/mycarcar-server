import { IJwtParam, IPayload } from "../../_@types/Controllers";
import { ISignInInfomation, ISelectFromUser } from "../../_@types/Models/User";

import { Request, Response } from "express";

import jsonwebtoken, { SignOptions } from "jsonwebtoken";

import ResponseManager from "../util/ResponseManager";

import { selectUser } from "../../models/user/UserModel";

class LoginController {
  req: Request;
  res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  async postUser() {
    const { id, pw }: ISignInInfomation = this.req.body;
    const responseManager = new ResponseManager(this.res);

    const userInfomations: ISelectFromUser[] = await selectUser({ id });
    const userInfomation = userInfomations[0];

    const hasNotUserInfomations = userInfomation === undefined;
    if (hasNotUserInfomations) {
      return responseManager.json(412, "[-] No matching information exists.");
    }

    if (userInfomation.mb_password !== pw) {
      return responseManager.json(412, "[-] No matching information exists.");
    }

    const payload: IPayload = { id };
    const { HOST, PORT, SECRET, EXPIREIN } = process.env as IJwtParam;
    const options: SignOptions = {
      issuer: `${HOST}:${PORT}`,
      expiresIn: EXPIREIN
    };

    const rawtoken = jsonwebtoken.sign(payload, SECRET, options);
    this.res.setHeader("x-access-token", rawtoken);

    responseManager.json(204, "[+] The token has been issued as normal.", { level: userInfomation.mb_level });
  }
}
