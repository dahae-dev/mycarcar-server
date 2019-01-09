/**
 * 2주차 다해 - 장기렌트 페이지에 필요한 데이터를 불러올 쿼리문 실행하여 결과 리턴
 */

import {
  getSelectCarBrandQuery,
  getSelectCarSeriesQuery,
  getSelectCarModelQuery,
  getSelectCarDetailQuery,
  getSelectCarGradeQuery,
  gtSelectCarPriceQuery,
  getSelectCarOptionQuery
} from "./RentalQuery";
import {
  ISelectCarBrandList,
  ISelectCarSeriesList,
  ISelectCarModelList,
  ISelectCarDetailList,
  ISelectCarGradeList,
  ISelectCarPrice,
  ISelectCarOptionList
} from "../../_@types/Models/Car";
import { sendQuery } from "../../db";

/** 쿼리문 실행을 통해 차량 브랜드 정보 불러오기 */
export const selectCarBrandList: ISelectCarBrandList = (origin) => {
  const query = getSelectCarBrandQuery(origin);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 차량 시리즈 정보 불러오기 */
export const selectCarSeriesList: ISelectCarSeriesList = (brand) => {
  const query = getSelectCarSeriesQuery(brand);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 차량 모델 정보 불러오기 */
export const selectCarModelList: ISelectCarModelList = (series) => {
  const query = getSelectCarModelQuery(series);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 차량 상세모델 정보 불러오기 */
export const selectCarDetailList: ISelectCarDetailList = (model) => {
  const query = getSelectCarDetailQuery(model);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 차량 등급 정보 불러오기 */
export const selectCarGradeList: ISelectCarGradeList = (model, detail) => {
  const query = getSelectCarGradeQuery(model, detail);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 차량 가격 정보 불러오기 */
export const selectCarPrice: ISelectCarPrice = (model, detail, grade) => {
  const query = gtSelectCarPriceQuery(model, detail, grade);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 차량 옵션 정보 불러오기 */
export const selectCarOptionList: ISelectCarOptionList = (model, detail, grade) => {
  const query = getSelectCarOptionQuery(model, detail, grade);
  return sendQuery(query);
};
