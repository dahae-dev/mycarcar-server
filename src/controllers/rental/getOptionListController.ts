import { Request, Response } from "express";
import ResponseManager from "../util/ResponseManager";
import { selectCarPrice } from "../../models/car/RentalModel";
import { selectCarOptionList } from "../../models/car/RentalModel";
import { IOptionList } from "../../_@types/Models/Car";
import { IPriceList } from "../../_@types/Models/Car";

export const getOptionListController = async (req: Request, res: Response) => {
  const encodedModel = req.params.model as string;
  const model = decodeURI(encodedModel);
  const encodedDetail = req.params.detail as string;
  const detail = decodeURI(encodedDetail);
  const encodedGrade = req.params.grade as string;
  const grade = decodeURI(encodedGrade);

  const responseManager = new ResponseManager(res);
  const priceList: IPriceList[] = await selectCarPrice(model, detail, grade);
  const optionList: IOptionList[] = await selectCarOptionList(model, detail, grade);

  if (!priceList[0] && !optionList.length) {
    return responseManager.json(404, `[-] The price & option list with given grade was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The price & option list with given grade was NOT FOUND.`,
      car_price: "정보없음",
      optionList: [{ car_option: "정보없음", car_option_price: 0 }]
    });
  }

  if (!priceList[0]) {
    return responseManager.json(200, `[+] Option List Found, [-] Price Not Found`, {
      car_price: "정보없음",
      optionList
    });
  }

  if (!optionList.length) {
    return responseManager.json(200, `[+] Price Found, [-] Option List Not Found`, {
      car_price: priceList[0].car_price,
      optionList: [{ car_option: "정보없음", car_option_price: 0 }]
    });
  }

  responseManager.json(200, `[+] The price & option list with given grade was found successfully.`, {
    car_price: priceList[0].car_price,
    optionList
  });
};
