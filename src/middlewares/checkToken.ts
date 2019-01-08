import JwtManager from "../util/JwtManager";
import { Middleware } from "../_@types/Middlewares";

/** JWT토큰을 이용하여 인증을 관리하는 미들웨어 */
export const checkToken: Middleware = (req, res, next) => {
  const jwtManager = new JwtManager(req);

  /** 해싱된 토큰을 가지고 있지 않으면 status code : 401(권한 없음)을 반환 */
  const hasNotRawToken = !jwtManager.hasRawToken();
  if (hasNotRawToken) {
    res.status(401).json({
      statusCode: 401,
      statusMessage: "[-] You don't have a token.",
    });
    return;
  }

  /** 해싱된 토큰이 유효하지 않은 경우 status code : 401(권한 없음)을 반환 */
  const isInvalidRawToken = !jwtManager.isValidRawToken();
  if (isInvalidRawToken) {
    res.status(401).json({
      statusCode: 401,
      statusMessage: "[-] Invalid token.",
    });
    return;
  }

  /** 토큰 만료 여부 검증. */
  const isValidToken = jwtManager.isValidToken();
  if (isValidToken) {
    return next();
  }

  /** 토큰이 만료된 경우 status code : 401(권한 없음)을 반환 */
  res.status(401).json({
    statusCode: 401,
    statusMessage: "[-] Expired token.",
  });
};
