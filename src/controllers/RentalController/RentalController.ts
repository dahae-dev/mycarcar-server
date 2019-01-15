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

    this.getBrandList = this.getBrandList.bind(this);
    this.getCapitalList = this.getCapitalList.bind(this);
    this.getDetailList = this.getDetailList.bind(this);
    this.getGradeList = this.getGradeList.bind(this);
    this.getModelList = this.getModelList.bind(this);
    this.getOptionList = this.getOptionList.bind(this);
    this.getSeriesList = this.getSeriesList.bind(this);
  }

  carModel: CarModel;

  async getBrandList(req: Request, res: Response) {
    const origin: string = req.params.origin;

    const responseManager = new ResponseManager(res);
    const brandList: IBrandList[] = await this.carModel.selectCarBrandList(origin);

    if (!brandList.length) {
      return responseManager.json(404, `[-] The car brand list with given origin was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car brand list with given origin was NOT FOUND.`,
        brandList: [{ car_brand: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The brand list with given origin was found successfully.`, { brandList });
  }

  async getSeriesList(req: Request, res: Response) {
    const encoded: string = req.params.brand;
    const brand = decodeURI(encoded);

    const responseManager = new ResponseManager(res);
    const seriesList: ISeriesList[] = await this.carModel.selectCarSeriesList(brand);

    if (!seriesList.length) {
      return responseManager.json(404, `[-] The car series list with given brand was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car series list with given brand was NOT FOUND.`,
        seriesList: [{ car_series: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car series list with given brand was found successfully.`, { seriesList });
  }

  async getModelList(req: Request, res: Response) {
    const encoded: string = req.params.series;
    const series = decodeURI(encoded);

    const responseManager = new ResponseManager(res);
    const modelList: IModelList[] = await this.carModel.selectCarModelList(series);

    if (!modelList.length) {
      return responseManager.json(404, `[-] The car model list with given series was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car model list with given series was NOT FOUND.`,
        modelList: [{ car_model: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car model list with given series was found successfully.`, { modelList });
  }

  async getDetailList(req: Request, res: Response) {
    const encoded: string = req.params.model;
    const model = decodeURI(encoded);

    const responseManager = new ResponseManager(res);
    const detailList: IDetailList[] = await this.carModel.selectCarDetailList(model);

    if (!detailList.length) {
      return responseManager.json(404, `[-] The car detail list with given model was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car detail list with given model was NOT FOUND.`,
        detailList: [{ car_detail: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car detail list with given model was found successfully.`, { detailList });
  }

  async getGradeList(req: Request, res: Response) {
    const encodedModel: string = req.params.model;
    const model = decodeURI(encodedModel);
    const encodedDetail: string = req.params.detail;
    const detail = decodeURI(encodedDetail);

    const responseManager = new ResponseManager(res);
    const gradeList: IGradeList[] = await this.carModel.selectCarGradeList(model, detail);

    if (!gradeList.length) {
      return responseManager.json(404, `[-] The car grade list with given model & detail was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car grade list with given model & detail was NOT FOUND.`,
        gradeList: [{ car_grade: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car grade list with given model & detail was found successfully.`, {
      gradeList
    });
  }

  async getOptionList(req: Request, res: Response) {
    const encodedModel = req.params.model as string;
    const model = decodeURI(encodedModel);
    const encodedDetail = req.params.detail as string;
    const detail = decodeURI(encodedDetail);
    const encodedGrade = req.params.grade as string;
    const grade = decodeURI(encodedGrade);

    const responseManager = new ResponseManager(res);
    const priceList: IPriceList[] = await this.carModel.selectCarPrice(model, detail, grade);
    const optionList: IOptionList[] = await this.carModel.selectCarOptionList(model, detail, grade);

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
  }

  async getCapitalList(req: Request, res: Response) {
    const capitalList: ICapitalList[] = await this.carModel.selectCapitalList();

    const responseManager = new ResponseManager(res);
    return responseManager.json(200, `[+] The capital list with given grade was found successfully.`, {
      statusCode: 200,
      statusMessage: `[+] The capital list with given grade was found successfully.`,
      capitalList
    });
  }
}
