import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";

interface IRegisterInfo {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  [key: string]: string;
}

interface IChangedRegisterInfo {
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
}

class RegisterFormController {
  public async registerInfoChangeRequest(
    req: Request,
    res: Response,
  ): Promise<any> {
    const userModel = new UserModel();
    const { name, id, pw, email, phone }: IChangedRegisterInfo = req.body;

    const result = await userModel.getUser({ id });

    if (result.length) {
      userModel.updateUser({ name, id, pw, email, phone });
      res.json({ isChanged: true });
    } else {
      res.json({ isChanged: false });
    }
  }
}

const registerFormController = new RegisterFormController();

export default registerFormController;
