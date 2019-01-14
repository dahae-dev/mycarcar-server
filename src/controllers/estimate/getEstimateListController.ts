import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import JwtManager from "../../util/JwtManager";
import { selectEstimateList } from "../../models/car/EstimateModel";

export const getEstimateListController = async (req: Request, res: Response) => {
  const jwtManager = new JwtManager(req);
  const { id } = jwtManager.getDecodedToken();

  const estimateList = await selectEstimateList(id);

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] Estimate List was found successfully.`, {
    estimateList,
    statusCode: 200,
    statusMessage: `[+] Estimate List was found successfully.`
  });
};
