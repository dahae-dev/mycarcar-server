import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";

export default class RegisterController {
  public async registerRequest(req: Request, res: Response): Promise<any> {
    const { name, id, pw, email, phone } = req.body as IRegisterInfo;
    const userModel = new UserModel();

    const userInfomations = await userModel.getUser({ id });

    const hasNotUserInfomation =
      userInfomations[0] === undefined ? true : false;

    if (hasNotUserInfomation) {
      await userModel.postUser({
        name,
        id,
        pw,
        email,
        phone,
      });

      res.statusCode = 200;
      res.statusMessage =
        "[+] Membership registration has been carried out normally.";
      return res.end();
    }

    res.statusCode = 412;
    res.statusMessage = "[-] ID already exists.";
    res.end();
  }
}
