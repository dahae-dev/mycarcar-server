/**
 * 2주차 다해 - 차량 정보를 DB로부터 받아와 장기렌트 뷰에 보내주기 위한 컨트롤러
 */

import {
  selectCarBrandList,
  selectCarSeriesList,
  selectCarModelList,
  selectCarDetailList,
  selectCarGradeList,
  selectCarOptionList
} from "../../models/car/RentalModel";
import { AsyncController } from "../../_@types/Controllers";
import { IBrandList, ISeriesList, IModelList, IDetailList, IGradeList, IOptionList } from "../../_@types/Models/Car";
import ResponseManager from "../util/ResponseManager";

/** 차량 제조사 정보 요청 */
export const getBrandListController: AsyncController = async (req, res) => {
  const origin = req.params.origin as string;

  const responseManager = new ResponseManager(res);
  const brandList: IBrandList[] = await selectCarBrandList(origin);
  responseManager.json(200, `[+] The brand list with given origin was found successfully.`, { brandList });
};

/** 차량 시리즈 정보 요청 */
export const getSeriesListController: AsyncController = async (req, res) => {
  const encoded = req.params.brand as string;
  const brand = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const seriesList: ISeriesList[] = await selectCarSeriesList(brand);
  responseManager.json(200, `[+] The car series list with given brand was found successfully.`, { seriesList });
};

/** 차량 모델 정보 요청 */
export const getModelListController: AsyncController = async (req, res) => {
  const encoded = req.params.series as string;
  const series = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const modelList: IModelList[] = await selectCarModelList(series);
  responseManager.json(200, `[+] The car model list with given series was found successfully.`, { modelList });
};

/** 차량 상세모델 정보 요청 */
export const getDetailListController: AsyncController = async (req, res) => {
  const encoded = req.params.model as string;
  const model = decodeURI(encoded);

  const responseManager = new ResponseManager(res);
  const detailList: IDetailList[] = await selectCarDetailList(model);
  responseManager.json(200, `[+] The car detail list with given model was found successfully.`, { detailList });
};

/** 차량 등급 정보 요청 */
export const getGradeListController: AsyncController = async (req, res) => {
  const encodedModel = req.params.model as string;
  const model = decodeURI(encodedModel);
  const encodedDetail = req.params.detail as string;
  const detail = decodeURI(encodedDetail);

  const responseManager = new ResponseManager(res);
  const gradeList: IGradeList[] = await selectCarGradeList(model, detail);
  responseManager.json(200, `[+] The car grade list with given detail was found successfully.`, { gradeList });
};

/** 차량 옵션 정보 요청 */
export const getOptionListController: AsyncController = async (req, res) => {
  const encodedModel = req.params.model as string;
  const model = decodeURI(encodedModel);
  const encodedDetail = req.params.detail as string;
  const detail = decodeURI(encodedDetail);
  const encodedGrade = req.params.grade as string;
  const grade = decodeURI(encodedGrade);

  const responseManager = new ResponseManager(res);
  const optionList: IOptionList[] = await selectCarOptionList(model, detail, grade);
  responseManager.json(200, `[+] The car option list with given grade was found successfully.`, { optionList });
};
