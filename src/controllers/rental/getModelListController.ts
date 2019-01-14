import { Request, Response } from "express";
import ResponseManager from "../util/ResponseManager";
import { IModelList } from "../../_@types/Models/Car";
import { selectCarModelList } from "../../models/car/RentalModel";

export const getModelListController = async (req: Request, res: Response) => {
  const encoded = req.params.series as string;
  const series = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const modelList: IModelList[] = await selectCarModelList(series);

  if (!modelList.length) {
    return responseManager.json(404, `[-] The car model list with given series was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The car model list with given series was NOT FOUND.`,
      modelList: [{ car_model: "정보없음" }]
    });
  }

  responseManager.json(200, `[+] The car model list with given series was found successfully.`, { modelList });
};
