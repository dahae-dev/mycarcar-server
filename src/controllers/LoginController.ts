import { Request, Response } from "express";
import UserModel from "../models/user/UserModel";
import jsonwebtoken, { SignOptions, Secret } from "jsonwebtoken";

class LoginController {
  public async postUserInfo(req: Request, res: Response): Promise<any> {
    const { id, pw }: ISignInInfo = req.body;
    const result: IRowDataPacket[] = await new UserModel().getUser({ id });

    const hasResult: boolean = !!result.length;
    if (hasResult && result[0].u_password === pw) {
      const { HOST, PORT, SECRET } = process.env;

      const payload: object = {};
      const secret: Secret = SECRET || "tempsecret";
      const options: SignOptions = {
        keyid: id,
        issuer: `${HOST}:${PORT}`,
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
