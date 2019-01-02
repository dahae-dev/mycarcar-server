import { Request } from "express";
import jsonwebtoken from "jsonwebtoken";

/**
 * JWT토큰을 관리해주는 클래스.
 */
export default class JwtManager {
  private req: Request;
  private SECRET: string;

  constructor(req: Request) {
    this.SECRET = process.env.SECRET as string;
    this.req = req;
  }

  /**
   * 해싱된 토큰을 가지고 있는지 검증.
   */
  public hasRawToken(): boolean {
    return this.req.headers["x-access-token"] !== undefined;
  }

  /**
   * 해싱된 토큰의 타입이 문자열이므로, 문자열 배열이면 유효하지 않은 토큰.
   */
  public isValidRawToken(): boolean {
    return typeof this.req.headers["x-access-token"] === "string";
  }

  /**
   * 유효하지 않은 토큰인 경우 해싱된 가비지 토큰을 반환하기 위해 존재.
   */
  private getGarbageRawToken(): string {
    const { PORT, HOST, SECRET } = process.env as IProcessEnv;
    const options = { expiresIn: 0, issuer: `${PORT}:${HOST}` };
    return jsonwebtoken.sign({ id: "" }, SECRET, options);
  }

  /**
   * 헤더에서 토큰을 읽어와서 해싱된 토큰을 반환.
   */
  public getRawToken(): string {
    const isNomalRawToken = this.hasRawToken() && this.isValidRawToken();

    if (isNomalRawToken) {
      const rawToken = this.req.headers["x-access-token"] as string;
      return rawToken;
    }

    return this.getGarbageRawToken();
  }

  /**
   * 해싱된 토큰을 복호화하여 반환.
   * 만약 유효하지 않은 토큰인 경우 해싱된 가비지 토큰을 반환.
   */
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
      const garbageToken = {
        id: "",
        iat: 0,
        exp: 0,
        iss: `${HOST}:${PORT}`,
      } as IDecodedToken;
      return garbageToken;
    }
  }

  /**
   * 유효한 토큰인지 판별.
   */
  public isValidToken(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken.id !== "";
  }
}
