import JwtManager from "../util/JwtManager";
import { Middleware } from "../_@types/Middlewares";
import ResponseManager from "../controllers/util/ResponseManager";

export const checkToken: Middleware = (req, res, next) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const hasEncodedToken = jwtManager.hasEncodedToken();
  if (!hasEncodedToken) {
    return responseManager.json(401, "[-] You don't have a token.");
  }

  const isValidEncodedToken = jwtManager.isValidEncodedToken();
  if (!isValidEncodedToken) {
    return responseManager.json(401, "[-] Invalid token.");
  }

  const isValidToken = jwtManager.isValidToken();
  if (isValidToken) {
    return next();
  }

  return responseManager.json(401, "[-] Expired token.");
};
