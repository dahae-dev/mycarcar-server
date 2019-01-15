import { IInsertForUser, ISelectFromUser, IInsertForCompanyUser } from "../../_@types/Models/User";

import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";

import { selectUser, insertUser, insertCompanyUser } from "../../models/user/UserModel";

class Register {
  req: Request;
  res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  async postNomalUser() {
    const insertForUser: IInsertForUser = this.req.body;
    const responseManager = new ResponseManager(this.res);

    const userInfomations: ISelectFromUser[] = await selectUser({
      id: insertForUser.id
    });

    const hasNotUserInfomation = userInfomations[0] === undefined;
    if (hasNotUserInfomation) {
      await insertUser(insertForUser);
      return responseManager.json(200, "[+] Membership registration has been carried out normally.");
    }

    return responseManager.json(412, "[-] ID already exists.");
  }

  async postCompanyUser() {
    const insertForCompanyUser: IInsertForCompanyUser = this.req.body;
    const responseManager = new ResponseManager(this.res);

    const userInfomations: ISelectFromUser[] = await selectUser({ id: insertForCompanyUser.id });

    const hasNotUserInfomation = userInfomations[0] === undefined;
    if (hasNotUserInfomation) {
      await insertCompanyUser(insertForCompanyUser);
      return responseManager.json(200, "[+] Membership registration has been carried out normally.");
    }

    return responseManager.json(412, "[-] ID already exists.");
  }
}
