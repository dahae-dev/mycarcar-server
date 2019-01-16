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
    const responseManager = new ResponseManager(res);

    const { id, pw }: ISignInInfomation = req.body;
    const selectedResult = await this.userModel.selectUser({ id });

    if (selectedResult.isOk) {
      return responseManager.json(412, "계정을 찾을 수 없습니다.");
    }

    const userInfomations: ISelectFromUser[] = selectedResult.data;
    const userInfomation = userInfomations[0];

    const hasNotUserInfomations = userInfomation === undefined;
    if (hasNotUserInfomations) {
      return responseManager.json(412, "아이디 또는 비밀번호가 틀렸습니다.");
    }

    if (userInfomation.mb_password !== pw) {
      return responseManager.json(412, "아이디 또는 비밀번호가 틀렸습니다.");
    }

    const payload: IPayload = { id };
    const { HOST, PORT, SECRET, EXPIREIN } = process.env as IJwtParam;
    const options: SignOptions = {
      issuer: `${HOST}:${PORT}`,
      expiresIn: EXPIREIN
    };

    const rawtoken = jsonwebtoken.sign(payload, SECRET, options);
    res.setHeader("x-access-token", rawtoken);

    responseManager.json(200, "로그인에 성공했습니다.", { level: userInfomation.mb_level });
  }
}
