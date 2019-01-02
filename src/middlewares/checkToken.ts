import { Request, Response } from "express";
import { NextFunction } from "connect";

import JwtManager from "../util/JwtManager";

/**
 * JWT토큰을 이용하여 인증을 관리하는 미들웨어
 */
export default (req: Request, res: Response, next: NextFunction): void => {
  const jwtManager = new JwtManager(req);

  /**
   * 해싱된 토큰을 가지고 있지 않으면 status code : 401(권한 없음)을 반환
   */
  const hasNotRawToken = !jwtManager.hasRawToken();
  if (hasNotRawToken) {
    res.statusCode = 401;
    res.statusMessage = "[-] You don't have a token.";
    return res.end();
  }

  /**
   * 해싱된 토큰이 유효하지 않은 경우 status code : 401(권한 없음)을 반환
   */
  const isInvalidRawToken = !jwtManager.isValidRawToken();
  if (isInvalidRawToken) {
    res.statusCode = 401;
    res.statusMessage = "[-] Invalid token.";
    return res.end();
  }

  /**
   * 토큰 만료 여부 검증.
   */
  const isValidToken = jwtManager.isValidToken();
  if (isValidToken) {
    return next();
  }

  /**
   * 토큰이 만료된 경우 status code : 401(권한 없음)을 반환
   */
  res.statusCode = 401;
  res.statusMessage = "[-] Expired token.";
  return res.end();
};
