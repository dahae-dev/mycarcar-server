import { IUserList, IUpdatedData } from "../../_@types/Models/User";
import { IAdminController } from "../../_@types/Controllers";

import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";

import UserModel from "../../models/UserModel/UserModel";

export default class AdminController implements IAdminController {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  getUserCount = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const selectedResult = await this.userModel.selectUserCountForAdmin();
    if (!selectedResult.isOk) {
      return responseManager.json(412, `유저수를 읽어오는데 실패하였습니다.`);
    }

    const totalCount: number = selectedResult.data[0]["count(*)"];
    responseManager.json(200, `유저수를 성공적으로 읽어왔습니다.`, { totalCount });
  };

  getUserList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);
    const page: number = req.params.page;

    const selectedResult = await this.userModel.selectUserListForAdmin(page);
    if (!selectedResult.isOk) {
      return responseManager.json(412, `전체 유저정보를 읽기에 실패하였습니다.`);
    }

    const userListData: IUserList[] = selectedResult.data;
    const userList = userListData.map((data) => {
      return {
        id: data.mb_id,
        name: data.mb_name,
        email: data.mb_email,
        phone: data.mb_phone,
        level: data.mb_level,
        company: data.mb_company,
        fax: data.mb_fax,
        registerDate: data.mb_register_date
      };
    });

    responseManager.json(200, `전체 유저정보를 성공적으로 불러왔습니다.`, { userList });
  };

  updateUser = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const updatedData: IUpdatedData = req.body;
    const updatedResult = await this.userModel.updateUserForAdmin(updatedData);
    if (!updatedResult.isOk) {
      return responseManager.json(412, `유저정보 수정에 실패하였습니다.`);
    }

    responseManager.json(200, `유저정보를 성공적으로 수정하였습니다.`);
  };
}
