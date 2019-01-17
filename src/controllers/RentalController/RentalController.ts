import {
  IBrandList,
  ISeriesList,
  IModelList,
  IDetailList,
  IGradeList,
  IOptionList,
  IPriceList,
  ICapitalList
} from "../../_@types/Models/Car";

import { Response, Request } from "express";

import ResponseManager from "../util/ResponseManager";

import CarModel from "../../models/CarModel/CarModel";

export default class RentalController {
  constructor() {
    this.carModel = new CarModel();
  }

  carModel: CarModel;

  getList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const type: string = req.params.type;
    const target: number = req.params.target;

    switch (type) {
      case "brand":
        // target ( 0 : "korea", 1: "foreign" )
        const isKorea = target === 0;
        const selectedResultOfBrandList = isKorea
          ? await this.carModel.selectCarBrandList("korea")
          : await this.carModel.selectCarBrandList("foreign");

        return selectedResultOfBrandList.isOk
          ? responseManager.json(200, "브랜드 정보를 성공적으로 찾았습니다.", { selectedResultOfBrandList })
          : responseManager.json(404, `브랜드를 찾지 못했습니다.`, { brandList: [{ car_brand: "정보없음" }] });

      case "series":
        const brandId = target;
        const selectedResultOfSeries = await this.carModel.selectCarSeriesList(brandId);
        return selectedResultOfSeries.isOk
          ? responseManager.json(200, "시리즈 정보를 성공적으로 찾았습니다.", { selectedResultOfSeries })
          : responseManager.json(404, `시리즈를 찾지 못했습니다.`, { seriesList: [{ car_series: "정보없음" }] });

      case "model":
        const seriesId = target;
        const selectedResultOfModel = await this.carModel.selectCarModelList(seriesId);
        return selectedResultOfModel.isOk
          ? responseManager.json(200, "시리즈 정보를 성공적으로 찾았습니다.", { selectedResultOfModel })
          : responseManager.json(404, `모델을 찾지 못했습니다.`, { modelList: [{ car_model: "정보없음" }] });

      case "detail":
        const modelId = target;
        const selectedResultOfDetail = await this.carModel.selectCarDetailList(modelId);
        return selectedResultOfDetail.isOk
          ? responseManager.json(200, "상세모델 정보를 성공적으로 찾았습니다.", { selectedResultOfDetail })
          : responseManager.json(404, `상세모델을 찾지 못했습니다.`, { detailList: [{ car_detail: "정보없음" }] });

      case "grade":
        const detailId = target;
        const selectedResultOfGrade = await this.carModel.selectCarGradeList(detailId);
        return selectedResultOfGrade.isOk
          ? responseManager.json(200, "등급 정보를 성공적으로 찾았습니다.", { selectedResultOfGrade })
          : responseManager.json(404, `등급을 찾지 못했습니다.`, { gradeList: [{ car_grade: "정보없음" }] });

      case "option":
        const gradeId = target;
        const selectedResultOfPriceList = await this.carModel.selectCarPrice(gradeId);
        const selectedResultOfOptionList = await this.carModel.selectCarOptionList(gradeId);

        const priceList: IPriceList[] = selectedResultOfPriceList.data;
        const optionList: IOptionList[] = selectedResultOfOptionList.data;

        const jsonData = { car_price: priceList[0].car_price, optionList };

        return selectedResultOfPriceList.isOk && selectedResultOfOptionList.isOk
          ? responseManager.json(200, `차량가격과 옵션을 찾았습니다.`, jsonData)
          : responseManager.json(404, `차량가격과 옵션들을 찾지 못했습니다.`, {
              car_price: "정보없음",
              optionList: [{ car_option: "정보없음", car_option_price: 0 }]
            });

      default:
        return responseManager.json(412, "해당 정보를 찾을 수 없습니다.");
    }
  };

  getCapitalList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const selectedResult = await this.carModel.selectCapitalList();
    const capitalList: ICapitalList[] = selectedResult.data;
    const jsonData = { capitalList };

    return selectedResult.isOk
      ? responseManager.json(200, `캐피탈 리스트를 찾았습니다.`, jsonData)
      : responseManager.json(404, `차량가격과 옵션들을 찾지 못했습니다.`, {
          car_price: "정보없음",
          optionList: [{ car_option: "정보없음", car_option_price: 0 }]
        });
  };
}
