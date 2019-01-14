import { Request, Response } from "express";

import ResponseManager from "../util/ResponseManager";
import { selectCapitalList } from "../../models/car/RentalModel";
import { ICapitalList } from "../../_@types/Models/Car";

export const getCapitalListController = async (req: Request, res: Response) => {
  const capitalList: ICapitalList[] = await selectCapitalList();

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] The capital list with given grade was found successfully.`, {
    statusCode: 200,
    statusMessage: `[+] The capital list with given grade was found successfully.`,
    capitalList
  });
};
