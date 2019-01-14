import JwtManager from "../util/JwtManager";
import { Middleware } from "../_@types/Middlewares";
import { selectUserLevel } from "../models/user/AdminModel";
import ResponseManager from "../controllers/util/ResponseManager";

export const checkSuperAdmin: Middleware = async (req, res, next) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const requestedId = jwtManager.getDecodedToken().id;
  const userLevel = (await selectUserLevel(requestedId))[0].mb_level;
  const isSuperAdmin = userLevel === 10;

  if (isSuperAdmin) {
    return next();
  }

  return responseManager.json(403, "[-] Forbidden");
};
