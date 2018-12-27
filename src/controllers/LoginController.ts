import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";
import jsonwebtoken, { SignOptions, Secret } from "jsonwebtoken";

interface ISignInInfo {
  id: string;
  pw: string;
}

interface IRowDataPacket {
  u_no: number;
  u_id: string;
  u_password: string;
  u_name: string;
  u_email: string;
  u_phone: string;
}

class LoginController {
  public async postUserInfo(req: Request, res: Response): Promise<any> {
    const { id, pw }: ISignInInfo = req.body;
    const result: IRowDataPacket[] = await new UserModel().getUser({ id });

    const hasResult: boolean = !!result.length;
    if (hasResult && result[0].u_password === pw) {
      const payload: object = {};
      const secret: Secret = process.env.SECRET || "tempsecret";
      const options: SignOptions = {
        keyid: id,
        issuer: "localhost:5000",
        expiresIn: "7d",
      };

      const token: string = jsonwebtoken.sign(payload, secret, options);
      res.setHeader("x-access-token", token);
      res.json({ isSignedIn: true });
    } else {
      res.json({ isSignedIn: false });
    }
  }
}

const loginController = new LoginController();

export default loginController;
