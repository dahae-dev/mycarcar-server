import { IInsertForUser, ISelectFromUser, IInsertForCompanyUser } from "../../_@types/Models/User";

import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class RegisterController {
  constructor() {
    this.userModel = new UserModel();

    this.postCompanyUser = this.postCompanyUser.bind(this);
    this.postNomalUser = this.postNomalUser.bind(this);
  }

  userModel: UserModel;

  async postNomalUser(req: Request, res: Response) {
    const responseManager = new ResponseManager(res);

    const insertForUser: IInsertForUser = req.body;

    const selectResult = await this.userModel.selectUser({ id: insertForUser.id });

    if (selectResult.isOk) {
      await this.userModel.insertUser(insertForUser);
      return responseManager.json(200, "회원가입에 성공하였습니다.");
    }

    return responseManager.json(412, "사용할 수 없는 아이디입니다.");
  }

  async postCompanyUser(req: Request, res: Response) {
    const responseManager = new ResponseManager(res);

    const insertForCompanyUser: IInsertForCompanyUser = req.body;
    const id = insertForCompanyUser.id;
    const selectResult = await this.userModel.selectUser({ id });

    if (selectResult.isOk) {
      await this.userModel.insertCompanyUser(insertForCompanyUser);
      return responseManager.json(200, "[+] Membership registration has been carried out normally.");
    }

    return responseManager.json(412, "[-] ID already exists.");
  }
}
