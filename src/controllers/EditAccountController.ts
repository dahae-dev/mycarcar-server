import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";

export default class EditAccountController {
  public async getUserInfomation(req: Request, res: Response): Promise<void> {
    const userModel = new UserModel();
    const id = req.body.id;

    const userInfomations = await userModel.getUser({ id });
    const hasNotUserInfomation =
      userInfomations[0] === undefined ? true : false;

    if (hasNotUserInfomation) {
      res.statusCode = 412;
      res.statusMessage = "[-] Member information does not exist.";
      return res.end();
    }

    res.statusCode = 200;
    res.statusMessage = "[+] Member information has been returned as normal.";
    res.json(userInfomations[0]);
  }

  public async updateAcountInfomation(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userModel = new UserModel();
    const { name, id, pw, email, phone } = req.body as IChangedRegisterInfo;

    const userInfomations = await userModel.getUser({ id });
    const hasNotUserInfomation =
      userInfomations[0] === undefined ? true : false;

    if (hasNotUserInfomation) {
      res.statusCode = 412;
      res.statusMessage = "[-] Member information does not exist.";
      return res.end();
    }

    userModel.updateUser({ name, id, pw, email, phone });
    res.statusCode = 200;
    res.statusMessage = "[+] Member information has been modified as normal..";
    res.end();
  }
}
