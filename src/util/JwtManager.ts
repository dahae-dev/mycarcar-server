import { Request } from "express";
import jsonwebtoken from "jsonwebtoken";

export default class JwtManager {
  private req: Request;
  private SECRET: string;

  constructor(req: Request) {
    this.SECRET = process.env.SECRET as string;
    this.req = req;
  }

  public hasRawToken(): boolean {
    return this.req.headers["x-access-token"] !== undefined;
  }

  public isInvalidRawToken(): boolean {
    return !Array.isArray(this.req.headers["x-access-token"]);
  }

  private getGarbageRawToken(): string {
    const { PORT, HOST, SECRET } = process.env as IProcessEnv;
    const options = { expiresIn: 0, issuer: `${PORT}:${HOST}` };
    return jsonwebtoken.sign({ id: "" }, SECRET, options);
  }

  public getRawToken(): string {
    const isNomalRawToken = this.hasRawToken() && this.isInvalidRawToken();

    if (isNomalRawToken) {
      const rawToken = this.req.headers["x-access-token"] as string;
      const isInvaildRawToken = !!rawToken.length;

      return isInvaildRawToken ? rawToken : this.getGarbageRawToken();
    }

    return this.getGarbageRawToken();
  }

  public getDecodedToken(): IDecodedToken {
    const rawToken = this.getRawToken();
    try {
      const decodedToken = jsonwebtoken.verify(
        rawToken,
        this.SECRET,
      ) as IDecodedToken;
      return decodedToken;
    } catch (error) {
      const { HOST, PORT } = process.env as IProcessEnv;
      const dumpToken = { id: "", iat: 0, exp: 0, iss: `${HOST}:${PORT}` };
      return dumpToken;
    }
  }

  public isValidToken(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken.id !== "";
  }
}
