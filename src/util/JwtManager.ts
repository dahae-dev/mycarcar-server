import { Request } from "express";
import jsonwebtoken from "jsonwebtoken";
import { IProcessEnv } from "../_@types/env";
import { IDecodedToken } from "../_@types/jwt";

export default class JwtManager {
  private req: Request;
  private SECRET: string;

  constructor(req: Request) {
    this.SECRET = process.env.SECRET as string;
    this.req = req;
  }

  hasEncodedToken(): boolean {
    return this.req.headers["x-access-token"] !== undefined;
  }

  isValidEncodedToken(): boolean {
    return typeof this.req.headers["x-access-token"] === "string";
  }

  private getGarbageRawToken(): string {
    const { PORT, HOST, SECRET } = process.env as IProcessEnv;
    const options = { expiresIn: 0, issuer: `${PORT}:${HOST}` };
    return jsonwebtoken.sign({ id: "" }, SECRET, options);
  }

  getEncodedToken(): string {
    const isNomalEncodedToken = this.hasEncodedToken() && this.isValidEncodedToken();

    if (isNomalEncodedToken) {
      const encodedToken = this.req.headers["x-access-token"] as string;
      return encodedToken;
    }

    return this.getGarbageRawToken();
  }

  getDecodedToken(): IDecodedToken {
    const encodedToken = this.getEncodedToken();
    try {
      const decodedToken = jsonwebtoken.verify(encodedToken, this.SECRET) as IDecodedToken;
      return decodedToken;
    } catch (error) {
      const { HOST, PORT } = process.env as IProcessEnv;
      const garbageToken = {
        id: "",
        iat: 0,
        exp: 0,
        iss: `${HOST}:${PORT}`
      };
      return garbageToken;
    }
  }

  isValidToken(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken.id !== "";
  }
}
