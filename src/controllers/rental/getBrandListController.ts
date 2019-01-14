import { Request, Response } from "express";
import ResponseManager from "../util/ResponseManager";
import { selectCarBrandList } from "../../models/car/RentalModel";
import { IBrandList } from "../../_@types/Models/Car";

export const getBrandListController = async (req: Request, res: Response) => {
  const origin = req.params.origin as string;

  const responseManager = new ResponseManager(res);
  const brandList: IBrandList[] = await selectCarBrandList(origin);

  if (!brandList.length) {
    return responseManager.json(404, `[-] The car brand list with given origin was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The car brand list with given origin was NOT FOUND.`,
      brandList: [{ car_brand: "정보없음" }]
    });
  }

  responseManager.json(200, `[+] The brand list with given origin was found successfully.`, { brandList });
};
