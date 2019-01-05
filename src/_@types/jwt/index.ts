/** 복호화된 토큰 객체의 인터페이스. */
export interface IDecodedToken {
  id: string;
  iat: number;
  exp: number;
  iss: string;
}
