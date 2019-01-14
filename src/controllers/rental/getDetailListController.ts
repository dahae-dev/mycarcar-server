import { Request, Response } from "express";
import ResponseManager from "../util/ResponseManager";
import { selectCarDetailList } from "../../models/car/RentalModel";
import { IDetailList } from "../../_@types/Models/Car";

export const getDetailListController = async (req: Request, res: Response) => {
  const encoded = req.params.model as string;
  const model = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const detailList: IDetailList[] = await selectCarDetailList(model);

  if (!detailList.length) {
    return responseManager.json(404, `[-] The car detail list with given model was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The car detail list with given model was NOT FOUND.`,
      detailList: [{ car_detail: "정보없음" }]
    });
  }

  responseManager.json(200, `[+] The car detail list with given model was found successfully.`, { detailList });
};
