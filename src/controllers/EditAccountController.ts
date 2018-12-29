import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";
import JwtManager from "../util/JwtManager";

export default class EditAccountController {
  public async getUserInfomation(req: Request, res: Response): Promise<void> {
    const userModel = new UserModel();
    const jwtManager = new JwtManager(req);

    const idOfRequester = jwtManager.getDecodedToken().id;

    const userInfomation = (await userModel.getUser({ id: idOfRequester }))[0];
    const data = {
      id: userInfomation.u_id,
      pw: userInfomation.u_password,
      name: userInfomation.u_name,
      email: userInfomation.u_email,
      phone: userInfomation.u_phone,
    } as IUserInfomation;

    res.statusCode = 200;
    res.statusMessage = "[+] Member information has been returned as normal.";
    res.json(data);
  }

  public async updateAccountInfomation(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userModel = new UserModel();

    const { name, id, pw, email, phone } = req.body as IChangedRegisterInfo;

    await userModel.updateUser({ name, id, pw, email, phone });
    res.statusCode = 200;
    res.statusMessage = "[+] Member information has been modified as normal..";
    res.end();
  }
}
