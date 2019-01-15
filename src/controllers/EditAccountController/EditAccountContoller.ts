import { ISelectFromUser, IUpdateForCompanyUser, IUpdateForUser } from "../../_@types/Models/User";
import { IEditAccountForResponse } from "../../_@types/Models/User";

import { Request, Response } from "express";

import JwtManager from "../../util/JwtManager";
import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class EditAccountContoller {
  constructor() {
    this.userModel = new UserModel();

    this.getUser = this.getUser.bind(this);
    this.patchCompanyUser = this.patchCompanyUser.bind(this);
    this.patchUserController = this.patchUserController.bind(this);
  }

  private userModel: UserModel;

  async getUser(req: Request, res: Response) {
    const jwtManager = new JwtManager(req);
    const responseManager = new ResponseManager(res);

    const idOfRequester = jwtManager.getDecodedToken().id;

    const {
      mb_company,
      mb_phone,
      mb_name,
      mb_id,
      mb_fax,
      mb_email
    }: ISelectFromUser = (await this.userModel.selectUser({
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

  async patchCompanyUser(req: Request, res: Response) {
    const jsonData: IUpdateForCompanyUser = req.body;
    const responseManager = new ResponseManager(res);

    await this.userModel.updateCompanyUser(jsonData);
    responseManager.json(200, "[+] Member information has been modified as normal..");
  }

  async patchUserController(req: Request, res: Response) {
    const { name, id, pw, email, phone }: IUpdateForUser = req.body;
    const responseManager = new ResponseManager(res);

    await this.userModel.updateUser({ name, id, pw, email, phone });
    responseManager.json(200, "[+] Member information has been modified as normal..");
  }
}
