import { ISelectFromUser, IUpdateForCompanyUser, IUpdateForUser } from "../../_@types/Models/User";
import { IEditAccountForResponse } from "../../_@types/Models/User";

import { Request, Response } from "express";

import JwtManager from "../../util/JwtManager";
import ResponseManager from "../util/ResponseManager";

import { selectUser, updateCompanyUser, updateUser } from "../../models/user/UserModel";

class EditAccountContoller {
  private req: Request;
  private res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  async getUser() {
    const jwtManager = new JwtManager(this.req);
    const responseManager = new ResponseManager(this.res);

    const idOfRequester = jwtManager.getDecodedToken().id;

    const { mb_company, mb_phone, mb_name, mb_id, mb_fax, mb_email }: ISelectFromUser = (await selectUser({
      id: idOfRequester
    }))[0];

    const data: IEditAccountForResponse = {
      id: mb_id,
      pw: "",
      name: mb_name,
      email: mb_email,
      phone: mb_phone,
      company: mb_company,
      fax: mb_fax
    };

    responseManager.json(200, "[+] Member information has been returned as normal.", data);
  }

  async patchCompanyUser() {
    const jsonData: IUpdateForCompanyUser = this.req.body;
    const responseManager = new ResponseManager(this.res);

    await updateCompanyUser(jsonData);
    responseManager.json(200, "[+] Member information has been modified as normal..");
  }

  async patchUserController() {
    const { name, id, pw, email, phone }: IUpdateForUser = this.req.body;
    const responseManager = new ResponseManager(this.res);

    await updateUser({ name, id, pw, email, phone });
    responseManager.json(200, "[+] Member information has been modified as normal..");
  }
}
