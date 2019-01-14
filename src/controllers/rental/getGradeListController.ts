import { Request, Response } from "express";
import ResponseManager from "../util/ResponseManager";
import { selectCarGradeList } from "../../models/car/RentalModel";
import { IGradeList } from "../../_@types/Models/Car";

export const getGradeListController = async (req: Request, res: Response) => {
  const encodedModel = req.params.model as string;
  const model = decodeURI(encodedModel);
  const encodedDetail = req.params.detail as string;
  const detail = decodeURI(encodedDetail);

  const responseManager = new ResponseManager(res);
  const gradeList: IGradeList[] = await selectCarGradeList(model, detail);

  if (!gradeList.length) {
    return responseManager.json(404, `[-] The car grade list with given model & detail was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The car grade list with given model & detail was NOT FOUND.`,
      gradeList: [{ car_grade: "정보없음" }]
    });
  }

  responseManager.json(200, `[+] The car grade list with given model & detail was found successfully.`, { gradeList });
};
