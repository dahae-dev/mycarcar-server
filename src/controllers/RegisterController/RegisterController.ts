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
    const insertForUser: IInsertForUser = req.body;
    const responseManager = new ResponseManager(res);

    const userInfomations: ISelectFromUser[] = await this.userModel.selectUser({
      id: insertForUser.id
    });

    const hasNotUserInfomation = userInfomations[0] === undefined;
    if (hasNotUserInfomation) {
      await this.userModel.insertUser(insertForUser);
      return responseManager.json(200, "[+] Membership registration has been carried out normally.");
    }

    return responseManager.json(412, "[-] ID already exists.");
  }

  async postCompanyUser(req: Request, res: Response) {
    const insertForCompanyUser: IInsertForCompanyUser = req.body;
    const responseManager = new ResponseManager(res);

    const userInfomations: ISelectFromUser[] = await this.userModel.selectUser({ id: insertForCompanyUser.id });

    const hasNotUserInfomation = userInfomations[0] === undefined;
    if (hasNotUserInfomation) {
      await this.userModel.insertCompanyUser(insertForCompanyUser);
      return responseManager.json(200, "[+] Membership registration has been carried out normally.");
    }

    return responseManager.json(412, "[-] ID already exists.");
  }
}
