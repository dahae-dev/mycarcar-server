import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import { selectEstimate } from "../../models/car/EstimateModel";

export const getEstimateController = async (req: Request, res: Response) => {
  const estimateId = req.params.id as number;

  const estimateInfo = (await selectEstimate(estimateId))[0];

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] Estimate was found successfully.`, {
    estimateInfo,
    statusCode: 200,
    statusMessage: `[+] Estimate was found successfully.`
  });
};
