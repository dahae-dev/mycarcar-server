import { selectQuery } from "../../db";

import RentalQuery from "../../querys/RentalQuery/RentalQuery";

export default class CarModel {
  rentalQuery: RentalQuery;

  constructor() {
    this.rentalQuery = new RentalQuery();
  }

  selectCarBrandList(origin: string) {
    const query = this.rentalQuery.getSelectCarBrand(origin);
    return selectQuery(query);
  }

  selectCarSeriesList(brandId: number) {
    const query = this.rentalQuery.getSelectCarSeries(brandId);
    return selectQuery(query);
  }
  // selectCarSeriesList(brand: string) {
  //   const query = this.rentalQuery.getSelectCarSeries(brand);
  //   return selectQuery(query);
  // }

  selectCarModelList(seriesId: number) {
    const query = this.rentalQuery.getSelectCarModel(seriesId);
    return selectQuery(query);
  }
  // selectCarModelList(series: string) {
  //   const query = this.rentalQuery.getSelectCarModel(series);
  //   return selectQuery(query);
  // }

  selectCarDetailList(modelId: number) {
    const query = this.rentalQuery.getSelectCarDetail(modelId);
    return selectQuery(query);
  }
  // selectCarDetailList(model: string) {
  //   const query = this.rentalQuery.getSelectCarDetail(model);
  //   return selectQuery(query);
  // }

  selectCarGradeList(detailId: number) {
    const query = this.rentalQuery.getSelectCarGrade(detailId);
    return selectQuery(query);
  }
  // selectCarGradeList(model: string, detail: string) {
  //   const query = this.rentalQuery.getSelectCarGrade(model, detail);
  //   return selectQuery(query);
  // }

  selectCarOptionList(gradeId: number) {
    const query = this.rentalQuery.getSelectCarOption(gradeId);
    return selectQuery(query);
  }
  // selectCarOptionList(model: string, detail: string, grade: string) {
  //   const query = this.rentalQuery.getSelectCarOption(model, detail, grade);
  //   return selectQuery(query);
  // }

  selectCarPrice(gradeId: number) {
    const query = this.rentalQuery.getSelectCarPrice(gradeId);
    return selectQuery(query);
  }
  // selectCarPrice(model: string, detail: string, grade: string) {
  //   const query = this.rentalQuery.getSelectCarPrice(model, detail, grade);
  //   return selectQuery(query);
  // }

  selectCapitalList() {
    const query = this.rentalQuery.getSelectCapital();
    return selectQuery(query);
  }
}
