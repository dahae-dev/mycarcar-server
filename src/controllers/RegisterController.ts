import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";

class RegisterController {
  public async registerRequest(req: Request, res: Response): Promise<any> {
    const { name, id, pw, email, phone }: IRegisterInfo = req.body;
    const userModel = new UserModel();

    const getedResult: IRowDataPacket[] = await userModel.getUser({ id });
    if (getedResult.length) {
      res.json({ isRegistered: false });
    } else {
      await userModel.postUser({
        name,
        id,
        pw,
        email,
        phone,
      });
      res.json({ isRegistered: true });
    }
  }
}

const registerController = new RegisterController();

export default registerController;
