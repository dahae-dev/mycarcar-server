import { IJwtParam, IPayload } from "../../_@types/Controllers";
import { ISignInInfomation, ISelectFromUser } from "../../_@types/Models/User";

import { Request, Response } from "express";

import jsonwebtoken, { SignOptions } from "jsonwebtoken";

import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class LoginController {
  constructor() {
    this.userModel = new UserModel();

    this.postUser = this.postUser.bind(this);
  }

  userModel: UserModel;

  async postUser(req: Request, res: Response) {
    const { id, pw }: ISignInInfomation = req.body;
    const responseManager = new ResponseManager(res);

    const userInfomations: ISelectFromUser[] = await this.userModel.selectUser({ id });

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
    res.setHeader("x-access-token", rawtoken);

    responseManager.json(204, "[+] The token has been issued as normal.", { level: userInfomation.mb_level });
  }
}
