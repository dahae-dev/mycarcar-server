import JwtManager from "../util/JwtManager";
import { Middleware } from "../_@types/Middlewares";
import ResponseManager from "../controllers/util/ResponseManager";

/** JWT토큰을 이용하여 인증을 관리하는 미들웨어 */
export const checkToken: Middleware = (req, res, next) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  /** 해싱된 토큰을 가지고 있지 않으면 status code : 401(권한 없음)을 반환 */
  const hasNotRawToken = !jwtManager.hasRawToken();
  if (hasNotRawToken) {
    return responseManager.json(401, "[-] You don't have a token.");
  }

  /** 해싱된 토큰이 유효하지 않은 경우 status code : 401(권한 없음)을 반환 */
  const isInvalidRawToken = !jwtManager.isValidRawToken();
  if (isInvalidRawToken) {
    return responseManager.json(401, "[-] Invalid token.");
  }

  /** 토큰 만료 여부 검증. */
  const isValidToken = jwtManager.isValidToken();
  if (isValidToken) {
    return next();
  }

  /** 토큰이 만료된 경우 status code : 401(권한 없음)을 반환 */
  return responseManager.json(401, "[-] Expired token.");
};
