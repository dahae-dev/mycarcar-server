import { ISelectFromUser, IUpdateForCompanyUser, IUpdateForUser } from "../../_@types/Models/User";
import { IEditAccountForResponse } from "../../_@types/Models/User";

import { Request, Response } from "express";

import JwtManager from "../../util/JwtManager";
import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class EditAccountContoller {
  constructor() {
    this.userModel = new UserModel();
  }

  private userModel: UserModel;

  patchCompanyUser = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const jsonData: IUpdateForCompanyUser = req.body;
    const updateedResult = await this.userModel.updateCompanyUser(jsonData);

    if (!updateedResult.isOk) {
      return responseManager.json(412, "유저정보 업데이트에 실패하였습니다..");
    }

    responseManager.json(200, "유저정보를 성공적으로 수정하였습니다.");
  };

  patchUserController = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const { name, id, pw, email, phone }: IUpdateForUser = req.body;
    const updateedResult = await this.userModel.updateUser({ name, id, pw, email, phone });

    if (!updateedResult.isOk) {
      return responseManager.json(412, "유저정보 업데이트에 실패하였습니다.");
    }

    responseManager.json(200, "유저정보를 성공적으로 수정하였습니다.");
  };

  getUser = async (req: Request, res: Response) => {
    const jwtManager = new JwtManager(req);
    const responseManager = new ResponseManager(res);

    const idOfRequester = jwtManager.getDecodedToken().id;
    const selectedResult = await this.userModel.selectUser({ id: idOfRequester });

    if (!selectedResult.isOk) {
      return responseManager.json(200, "유저정보를 불러오기를 실패하였습니다.");
    }

    const { mb_company, mb_phone, mb_name, mb_id, mb_fax, mb_email }: ISelectFromUser = selectedResult.data[0];

    const data: IEditAccountForResponse = {
      id: mb_id,
      pw: "",
      name: mb_name,
      email: mb_email,
      phone: mb_phone,
      company: mb_company,
      fax: mb_fax
    };

    responseManager.json(200, "유저정보를 성공적으로 읽어왔습니다.", data);
  };
}
