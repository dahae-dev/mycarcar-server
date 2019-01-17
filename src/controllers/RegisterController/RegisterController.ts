import { IInsertForUser, IInsertForCompanyUser } from "../../_@types/Models/User";

import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class RegisterController {
  constructor() {
    this.userModel = new UserModel();
  }

  userModel: UserModel;

  postNomalUser = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const insertForUser: IInsertForUser = req.body;

    const selectResult = await this.userModel.selectUser({ id: insertForUser.id });

    if (!selectResult.isOk) {
      await this.userModel.insertUser(insertForUser);
      return responseManager.json(200, "회원가입에 성공하였습니다.");
    }

    return responseManager.json(412, "사용할 수 없는 아이디입니다.");
  };

  postCompanyUser = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const insertForCompanyUser: IInsertForCompanyUser = req.body;
    const id = insertForCompanyUser.id;
    const selectResult = await this.userModel.selectUser({ id });

    if (!selectResult.isOk) {
      await this.userModel.insertCompanyUser(insertForCompanyUser);
      return responseManager.json(200, "회원가입에 성공하였습니다.");
    }

    return responseManager.json(412, "사용할 수 없는 아이디입니다.");
  };
}
