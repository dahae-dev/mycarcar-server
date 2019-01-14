import {
  getSelectCarBrandQuery,
  getSelectCarSeriesQuery,
  getSelectCarModelQuery,
  getSelectCarDetailQuery,
  getSelectCarGradeQuery,
  gtSelectCarPriceQuery,
  getSelectCarOptionQuery,
  getSelectCapitalQuery
} from "./RentalQuery";
import {
  ISelectCarBrandList,
  ISelectCarSeriesList,
  ISelectCarModelList,
  ISelectCarDetailList,
  ISelectCarGradeList,
  ISelectCarPrice,
  ISelectCarOptionList,
  ISelectCapitalList
} from "../../_@types/Models/Car";
import { sendQuery } from "../../db";

export const selectCarBrandList: ISelectCarBrandList = (origin) => {
  const query = getSelectCarBrandQuery(origin);
  return sendQuery(query);
};

export const selectCarSeriesList: ISelectCarSeriesList = (brand) => {
  const query = getSelectCarSeriesQuery(brand);
  return sendQuery(query);
};

export const selectCarModelList: ISelectCarModelList = (series) => {
  const query = getSelectCarModelQuery(series);
  return sendQuery(query);
};

export const selectCarDetailList: ISelectCarDetailList = (model) => {
  const query = getSelectCarDetailQuery(model);
  return sendQuery(query);
};

export const selectCarGradeList: ISelectCarGradeList = (model, detail) => {
  const query = getSelectCarGradeQuery(model, detail);
  return sendQuery(query);
};

export const selectCarPrice: ISelectCarPrice = (model, detail, grade) => {
  const query = gtSelectCarPriceQuery(model, detail, grade);
  return sendQuery(query);
};

export const selectCarOptionList: ISelectCarOptionList = (model, detail, grade) => {
  const query = getSelectCarOptionQuery(model, detail, grade);
  return sendQuery(query);
};

export const selectCapitalList: ISelectCapitalList = () => {
  const query = getSelectCapitalQuery();
  return sendQuery(query);
};
