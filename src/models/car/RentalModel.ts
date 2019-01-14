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
import { sendQuery } from "../../db";

export const selectCarBrandList = (origin: string) => {
  const query = getSelectCarBrandQuery(origin);
  return sendQuery(query);
};

export const selectCarSeriesList = (brand: string) => {
  const query = getSelectCarSeriesQuery(brand);
  return sendQuery(query);
};

export const selectCarModelList = (series: string) => {
  const query = getSelectCarModelQuery(series);
  return sendQuery(query);
};

export const selectCarDetailList = (model: string) => {
  const query = getSelectCarDetailQuery(model);
  return sendQuery(query);
};

export const selectCarGradeList = (model: string, detail: string) => {
  const query = getSelectCarGradeQuery(model, detail);
  return sendQuery(query);
};

export const selectCarPrice = (model: string, detail: string, grade: string) => {
  const query = gtSelectCarPriceQuery(model, detail, grade);
  return sendQuery(query);
};

export const selectCarOptionList = (model: string, detail: string, grade: string) => {
  const query = getSelectCarOptionQuery(model, detail, grade);
  return sendQuery(query);
};

export const selectCapitalList = () => {
  const query = getSelectCapitalQuery();
  return sendQuery(query);
};
