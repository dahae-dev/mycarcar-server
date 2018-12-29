import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";
import JwtManager from "../util/JwtManager";

export default class EditAccountController {
  /**
   * 계정 정보 수정을 위한 회원정보 요청.
   */
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

    /**
     * 일치하는 회원 정보가 있을 경우의 응답.
     */
    res.statusCode = 200;
    res.statusMessage = "[+] Member information has been returned as normal.";
    res.json(data);
  }

  /**
   * 회원정보 수정 요청
   */
  public async updateAccountInfomation(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userModel = new UserModel();

    const {
      name,
      id,
      pw,
      email,
      phone,
    } = req.body as IChangedRegisterInfomation;

    /**
     * 회원정보 수정이 정상적으로 이루어졌을 경우의 응답.
     */
    await userModel.updateUser({ name, id, pw, email, phone });
    res.statusCode = 200;
    res.statusMessage = "[+] Member information has been modified as normal..";
    res.end();
  }
}
