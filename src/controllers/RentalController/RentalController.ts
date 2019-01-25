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
import { IRentalController } from "../../_@types/Controllers";

import { Response, Request } from "express";

import ResponseManager from "../util/ResponseManager";

import CarModel from "../../models/CarModel/CarModel";

export default class RentalController implements IRentalController {
  constructor() {
    this.carModel = new CarModel();
  }

  carModel: CarModel;

  getList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const type: string = req.params.type;
    const target: number = parseInt(req.params.target, 10);

    switch (type) {
      case "brand":
        // target ( 0 : "korea", 1: "foreign" )
        const isKorea = target === 0;
        const selectedResultOfBrandList = isKorea
          ? await this.carModel.selectCarBrandList("korea")
          : await this.carModel.selectCarBrandList("foreign");
        const brandList: IBrandList[] = selectedResultOfBrandList.data;

        return selectedResultOfBrandList.isOk
          ? responseManager.json(200, "브랜드 정보를 성공적으로 찾았습니다.", { brandList })
          : responseManager.json(412, `브랜드를 찾지 못했습니다.`, {
              brandList: [{ car_brand: "정보없음", car_brand_id: -1 }]
            });

      case "series":
        const brandId = target;
        const selectedResultOfSeriesList = await this.carModel.selectCarSeriesList(brandId);
        const seriesList: ISeriesList[] = selectedResultOfSeriesList.data;

        return selectedResultOfSeriesList.isOk
          ? responseManager.json(200, "시리즈 정보를 성공적으로 찾았습니다.", { seriesList })
          : responseManager.json(412, `시리즈를 찾지 못했습니다.`, {
              seriesList: [{ car_series: "정보없음", car_series_id: -1 }]
            });

      case "model":
        const seriesId = target;
        const selectedResultOfModelList = await this.carModel.selectCarModelList(seriesId);
        const modelList: IModelList[] = selectedResultOfModelList.data;

        return selectedResultOfModelList.isOk
          ? responseManager.json(200, "시리즈 정보를 성공적으로 찾았습니다.", { modelList })
          : responseManager.json(412, `모델을 찾지 못했습니다.`, {
              modelList: [{ car_model: "정보없음", car_model_id: -1 }]
            });

      case "detail":
        const modelId = target;
        const selectedResultOfDetailList = await this.carModel.selectCarDetailList(modelId);
        const detailList: IDetailList[] = selectedResultOfDetailList.data;

        return selectedResultOfDetailList.isOk
          ? responseManager.json(200, "상세모델 정보를 성공적으로 찾았습니다.", { detailList })
          : responseManager.json(412, `상세모델을 찾지 못했습니다.`, {
              detailList: [{ car_detail: "정보없음", car_detail_id: -1 }]
            });

      case "grade":
        const detailId = target;
        const selectedResultOfGradeList = await this.carModel.selectCarGradeList(detailId);
        const gradeList: IGradeList[] = selectedResultOfGradeList.data;

        return selectedResultOfGradeList.isOk
          ? responseManager.json(200, "등급 정보를 성공적으로 찾았습니다.", { gradeList })
          : responseManager.json(412, `등급을 찾지 못했습니다.`, {
              gradeList: [{ car_grade: "정보없음", car_grade_id: -1 }]
            });

      case "option":
        const gradeId = target;
        const selectedResultOfPriceList = await this.carModel.selectCarPrice(gradeId);
        const selectedResultOfOptionList = await this.carModel.selectCarOptionList(gradeId);

        const priceList: IPriceList[] = selectedResultOfPriceList.data;
        const optionList: IOptionList[] = selectedResultOfOptionList.data;

        const jsonData = { car_price: priceList[0].car_price, optionList };

        return selectedResultOfPriceList.isOk && selectedResultOfOptionList.isOk
          ? responseManager.json(200, `차량가격과 옵션을 찾았습니다.`, jsonData)
          : responseManager.json(412, `차량가격과 옵션들을 찾지 못했습니다.`, {
              car_price: 0,
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
      : responseManager.json(412, `차량가격과 옵션들을 찾지 못했습니다.`, {
          car_price: 0,
          optionList: [{ car_option: "정보없음", car_option_price: 0 }]
        });
  };
}
