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

interface IRowDataPacket {
  u_no: number;
  u_id: string;
  u_password: string;
  u_name: string;
  u_email: string;
  u_phone: string;
}

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
