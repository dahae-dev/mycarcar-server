/**
 * 2주차 다해 - 차량 데이터를 불러오는 함수 및 DB로부터 받은 데이터에 대한 인터페이스 선언
 */

import { Query } from "mysql";

export interface IGetSelectCarQuery {
  (): string;
}

export interface ISelectCarList {
  (): Promise<any>;
}

export interface IGetSelectCarBrandQuery {
  (origin: string): string;
}

export interface IGetSelectCarSeriesQuery {
  (brand: string): string;
}

export interface IGetSelectCarModelQuery {
  (series: string): string;
}

export interface IGetSelectCarDetailQuery {
  (model: string): string;
}

export interface IGetSelectCarGradeQuery {
  (model: string, detail: string): string;
}

export interface IGetSelectCarPriceQuery {
  (model: string, detail: string, grade: string): string;
}

export interface IGetSelectCarOptionQuery {
  (model: string, detail: string, grade: string): string;
}

export interface IGetSelectCapitalQuery {
  (): string;
}

export interface IGetInsertEstimateQuery {
  (
    memberName: string,
    memberPhone: string,
    memberEmail: string,
    origin: string,
    brand: string,
    series: string,
    model: string,
    detail: string,
    grade: string,
    option: string,
    capital: string,
    rentalPeriod: number,
    insurancePlan: number,
    carPrice: number,
    carOptionPrice: number,
    carFinalPrice: number,
    deposit: number,
    advancePay: number,
  ): string;
}

export interface ISelectCarBrandList {
  (origin: string): Promise<any>;
}

export interface ISelectCarSeriesList {
  (brand: string): Promise<any>;
}

export interface ISelectCarModelList {
  (series: string): Promise<any>;
}

export interface ISelectCarDetailList {
  (model: string): Promise<any>;
}

export interface ISelectCarGradeList {
  (model: string, detail: string): Promise<any>;
}

export interface ISelectCarPrice {
  (model: string, detail: string, grade: string): Promise<any>;
}

export interface ISelectCarOptionList {
  (model: string, detail: string, grade: string): Promise<any>;
}

export interface ISelectCapitalList {
  (): Promise<any>;
}

export interface IInsertEstimate {
  (
    memberName: string,
    memberPhone: string,
    memberEmail: string,
    origin: string,
    brand: string,
    series: string,
    model: string,
    detail: string,
    grade: string,
    option: string,
    capital: string,
    rentalPeriod: number,
    insurancePlan: number,
    carPrice: number,
    carOptionPrice: number,
    carFinalPrice: number,
    deposit: number,
    advancePay: number,
  ): Promise<any>;
}

export interface IBrandList {
  car_brand: string;
}

export interface ISeriesList {
  car_series: string;
}

export interface IModelList {
  car_model: string;
}

export interface IDetailList {
  car_detail: string;
}

export interface IGradeList {
  car_grade: string;
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
