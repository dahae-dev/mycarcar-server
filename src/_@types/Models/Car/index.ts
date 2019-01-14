export interface IGetSelectCarQuery {
  (): string;
}

export interface ISelectCarList {
  (): Promise<any>;
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
