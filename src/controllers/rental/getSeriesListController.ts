import { Request, Response } from "express";
import ResponseManager from "../util/ResponseManager";
import { selectCarSeriesList } from "../../models/car/RentalModel";
import { ISeriesList } from "../../_@types/Models/Car";

export const getSeriesListController = async (req: Request, res: Response) => {
  const encoded = req.params.brand as string;
  const brand = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const seriesList: ISeriesList[] = await selectCarSeriesList(brand);

  if (!seriesList.length) {
    return responseManager.json(404, `[-] The car series list with given brand was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The car series list with given brand was NOT FOUND.`,
      seriesList: [{ car_series: "정보없음" }]
    });
  }

  responseManager.json(200, `[+] The car series list with given brand was found successfully.`, { seriesList });
};
