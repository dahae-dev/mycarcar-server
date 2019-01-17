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

  getBrandList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const origin: string = req.params.origin;

    const selectedResult = await this.carModel.selectCarBrandList(origin);
    if (!selectedResult.isOk) {
      return responseManager.json(404, `브랜드를 찾지 못했습니다.`, {
        brandList: [{ car_brand: "정보없음" }]
      });
    }

    const brandList: IBrandList[] = selectedResult.data;
    const jsonData = { brandList };
    responseManager.json(200, `브랜드를 찾았습니다.`, jsonData);
  };

  getSeriesList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const encoded: string = req.params.brand;
    const brand = decodeURI(encoded);

    const selectedResult = await this.carModel.selectCarSeriesList(brand);
    if (!selectedResult.isOk) {
      return responseManager.json(404, `시리즈를 찾지 못했습니다.`, {
        seriesList: [{ car_series: "정보없음" }]
      });
    }

    const seriesList: ISeriesList[] = selectedResult.data;
    const jsonData = { seriesList };
    responseManager.json(200, `시리즈를 찾았습니다.`, jsonData);
  };

  getModelList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const encoded: string = req.params.series;
    const series = decodeURI(encoded);

    const selectedResult = await this.carModel.selectCarModelList(series);
    if (!selectedResult.isOk) {
      return responseManager.json(404, `모델을 찾지 못했습니다.`, {
        modelList: [{ car_model: "정보없음" }]
      });
    }

    const modelList: IModelList[] = selectedResult.data;
    const jsonData = { modelList };
    responseManager.json(200, `모델을 찾았습니다.`, jsonData);
  };

  getDetailList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const encoded: string = req.params.model;
    const model = decodeURI(encoded);

    const selectedResult = await this.carModel.selectCarDetailList(model);
    if (!selectedResult.isOk) {
      return responseManager.json(404, `상세모델을 찾지 못했습니다.`, {
        detailList: [{ car_detail: "정보없음" }]
      });
    }

    const detailList: IDetailList[] = selectedResult.data;
    const jsonData = { detailList };
    responseManager.json(200, `상세모델을 찾았습니다.`, jsonData);
  };

  getGradeList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const encodedModel: string = req.params.model;
    const encodedDetail: string = req.params.detail;
    const model = decodeURI(encodedModel);
    const detail = decodeURI(encodedDetail);

    const selectedResult = await this.carModel.selectCarGradeList(model, detail);
    if (!selectedResult.isOk) {
      return responseManager.json(404, `등급을 찾지 못했습니다.`, {
        gradeList: [{ car_grade: "정보없음" }]
      });
    }

    const gradeList: IGradeList[] = selectedResult.data;
    const jsonData = { gradeList };
    responseManager.json(200, `모델을 찾았습니다.`, jsonData);
  };

  getOptionList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const encodedModel: string = req.params.model;
    const encodedDetail: string = req.params.detail;
    const encodedGrade: string = req.params.grade;
    const model = decodeURI(encodedModel);
    const detail = decodeURI(encodedDetail);
    const grade = decodeURI(encodedGrade);

    const selectedResultOfPriceList = await this.carModel.selectCarPrice(model, detail, grade);
    const selectedResultOfOptionList = await this.carModel.selectCarOptionList(model, detail, grade);
    if (!selectedResultOfPriceList.isOk || !selectedResultOfOptionList.isOk) {
      return responseManager.json(404, `차량가격과 옵션들을 찾지 못했습니다.`, {
        car_price: "정보없음",
        optionList: [{ car_option: "정보없음", car_option_price: 0 }]
      });
    }

    const priceList: IPriceList[] = selectedResultOfPriceList.data;
    const optionList: IOptionList[] = selectedResultOfOptionList.data;
    const jsonData = { car_price: priceList[0].car_price, optionList };
    responseManager.json(200, `차량가격과 옵션을 찾았습니다.`, jsonData);
  };

  getCapitalList = async (req: Request, res: Response) => {
    const responseManager = new ResponseManager(res);

    const selectedResult = await this.carModel.selectCapitalList();
    if (!selectedResult.isOk) {
      return responseManager.json(404, `차량가격과 옵션들을 찾지 못했습니다.`, {
        car_price: "정보없음",
        optionList: [{ car_option: "정보없음", car_option_price: 0 }]
      });
    }

    const capitalList: ICapitalList[] = selectedResult.data;
    const jsonData = { capitalList };
    return responseManager.json(200, `캐피탈 리스트를 찾았습니다.`, jsonData);
  };
}
