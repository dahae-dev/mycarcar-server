/**
 * 2주차 다해 - 회원 관리 admin 페이지에 접근 가능한 권한 인증을 위한 미들웨어
 */

import JwtManager from "../util/JwtManager";
import { Middleware } from "../_@types/Middlewares";
import { selectUserLevel } from "../models/user/AdminModel";
import ResponseManager from "../controllers/util/ResponseManager";

/** JWT토큰을 이용하여 관리자 인증을 처리하는 미들웨어 */
export const checkSuperAdmin: Middleware = async (req, res, next) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const requestedId = jwtManager.getDecodedToken().id;
  const userLevel = (await selectUserLevel(requestedId))[0].mb_level;
  const isSuperAdmin = userLevel === 10;

  /** 슈퍼관리자로 인증된 경우 */
  if (isSuperAdmin) {
    return next();
  }

  /** 슈퍼관리자 인증이 안 된 경우 에러 처리 */
  return responseManager.json(403, "[-] Forbidden");
};
