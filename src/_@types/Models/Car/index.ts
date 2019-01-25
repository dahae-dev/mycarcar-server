import { IMysqlSelectResult } from "../../../db";

export interface IGetSelectCarQuery {
  (): string;
}

export interface ISelectCarList {
  (): Promise<any>;
}

export interface IBrandList {
  car_brand: string;
  car_brand_id: number;
}

export interface ISeriesList {
  car_series: string;
  car_series_id: number;
}

export interface IModelList {
  car_model: string;
  car_model_id: number;
}

export interface IDetailList {
  car_detail: string;
  car_detail_id: number;
}

export interface IGradeList {
  car_grade: string;
  car_grade_id: number;
}

export interface IPriceList {
  car_price: number;
}

export interface IOptionList {
  car_option: string;
  car_option_price: number;
}

export interface ICapitalList {
  capital_name: string;
  capital_profit: number;
}

export interface ICarModel {
  selectCarBrandList: (origin: string) => Promise<IMysqlSelectResult>;
  selectCarSeriesList: (brandId: number) => Promise<IMysqlSelectResult>;
  selectCarModelList: (seriesId: number) => Promise<IMysqlSelectResult>;
  selectCarDetailList: (modelId: number) => Promise<IMysqlSelectResult>;
  selectCarGradeList: (detailId: number) => Promise<IMysqlSelectResult>;
  selectCarOptionList: (gradeId: number) => Promise<IMysqlSelectResult>;
  selectCarPrice: (gradeId: number) => Promise<IMysqlSelectResult>;
  selectCapitalList: () => Promise<IMysqlSelectResult>;
}
