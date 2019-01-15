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

import {
  selectCarBrandList,
  selectCarSeriesList,
  selectCarModelList,
  selectCarDetailList,
  selectCarGradeList,
  selectCarPrice,
  selectCarOptionList,
  selectCapitalList
} from "../../models/car/RentalModel";

class RentalController {
  req: Request;
  res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  async getBrandList() {
    const origin: string = this.req.params.origin;

    const responseManager = new ResponseManager(this.res);
    const brandList: IBrandList[] = await selectCarBrandList(origin);

    if (!brandList.length) {
      return responseManager.json(404, `[-] The car brand list with given origin was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car brand list with given origin was NOT FOUND.`,
        brandList: [{ car_brand: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The brand list with given origin was found successfully.`, { brandList });
  }

  async getSeriesList() {
    const encoded: string = this.req.params.brand;
    const brand = decodeURI(encoded);

    const responseManager = new ResponseManager(this.res);
    const seriesList: ISeriesList[] = await selectCarSeriesList(brand);

    if (!seriesList.length) {
      return responseManager.json(404, `[-] The car series list with given brand was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car series list with given brand was NOT FOUND.`,
        seriesList: [{ car_series: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car series list with given brand was found successfully.`, { seriesList });
  }

  async getModelList() {
    const encoded: string = this.req.params.series;
    const series = decodeURI(encoded);

    const responseManager = new ResponseManager(this.res);
    const modelList: IModelList[] = await selectCarModelList(series);

    if (!modelList.length) {
      return responseManager.json(404, `[-] The car model list with given series was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car model list with given series was NOT FOUND.`,
        modelList: [{ car_model: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car model list with given series was found successfully.`, { modelList });
  }

  async getDetailList() {
    const encoded: string = this.req.params.model;
    const model = decodeURI(encoded);

    const responseManager = new ResponseManager(this.res);
    const detailList: IDetailList[] = await selectCarDetailList(model);

    if (!detailList.length) {
      return responseManager.json(404, `[-] The car detail list with given model was NOT FOUND.`, {
        statusCode: 404,
        statusMessage: `[-] The car detail list with given model was NOT FOUND.`,
        detailList: [{ car_detail: "정보없음" }]
      });
    }

    responseManager.json(200, `[+] The car detail list with given model was found successfully.`, { detailList });
  }

  async getGradeList() {
    const encodedModel: string = this.req.params.model;
    const model = decodeURI(encodedModel);
    const encodedDetail: string = this.req.params.detail;
    const detail = decodeURI(encodedDetail);

    const responseManager = new ResponseManager(this.res);
    const gradeList: IGradeList[] = await selectCarGradeList(model, detail);

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

  async getOptionList() {
    const encodedModel = this.req.params.model as string;
    const model = decodeURI(encodedModel);
    const encodedDetail = this.req.params.detail as string;
    const detail = decodeURI(encodedDetail);
    const encodedGrade = this.req.params.grade as string;
    const grade = decodeURI(encodedGrade);

    const responseManager = new ResponseManager(this.res);
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
  }

  async getCapitalList() {
    const capitalList: ICapitalList[] = await selectCapitalList();

    const responseManager = new ResponseManager(this.res);
    return responseManager.json(200, `[+] The capital list with given grade was found successfully.`, {
      statusCode: 200,
      statusMessage: `[+] The capital list with given grade was found successfully.`,
      capitalList
    });
  }
}
