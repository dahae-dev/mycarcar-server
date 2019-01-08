import { Query } from "mysql";

export interface IGetSelectCarQuery {
  (): string;
}

export interface ISelectCarList {
  (): Promise<Query>;
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

export interface IGetSelectCarOptionQuery {
  (model: string, detail: string, grade: string): string;
}

export interface ISelectCarBrandList {
  (origin: string): Promise<Query>;
}

export interface ISelectCarSeriesList {
  (brand: string): Promise<Query>;
}

export interface ISelectCarModelList {
  (series: string): Promise<Query>;
}

export interface ISelectCarDetailList {
  (model: string): Promise<Query>;
}

export interface ISelectCarGradeList {
  (model: string, detail: string): Promise<Query>;
}

export interface ISelectCarOptionList {
  (model: string, detail: string, grade: string): Promise<Query>;
}
