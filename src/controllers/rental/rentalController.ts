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
import { AsyncController } from "../../_@types/Controllers";
import {
  IBrandList,
  ISeriesList,
  IModelList,
  IDetailList,
  IGradeList,
  IPriceList,
  IOptionList,
  ICapitalList
} from "../../_@types/Models/Car";
import ResponseManager from "../util/ResponseManager";

export const getBrandListController: AsyncController = async (req, res) => {
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

export const getSeriesListController: AsyncController = async (req, res) => {
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

export const getModelListController: AsyncController = async (req, res) => {
  const encoded = req.params.series as string;
  const series = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const modelList: IModelList[] = await selectCarModelList(series);

  if (!modelList.length) {
    return responseManager.json(404, `[-] The car model list with given series was NOT FOUND.`, {
      statusCode: 404,
      statusMessage: `[-] The car model list with given series was NOT FOUND.`,
      modelList: [{ car_model: "정보없음" }]
    });
  }

  responseManager.json(200, `[+] The car model list with given series was found successfully.`, { modelList });
};

export const getDetailListController: AsyncController = async (req, res) => {
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

export const getGradeListController: AsyncController = async (req, res) => {
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

export const getOptionListController: AsyncController = async (req, res) => {
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

export const getCapitalListController: AsyncController = async (req, res) => {
  const capitalList: ICapitalList[] = await selectCapitalList();

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] The capital list with given grade was found successfully.`, {
    statusCode: 200,
    statusMessage: `[+] The capital list with given grade was found successfully.`,
    capitalList
  });
};
