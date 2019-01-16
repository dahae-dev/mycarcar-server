import { selectQuery, insertQuery } from "../../db";

import EstimateQuery from "../../querys/EstimateQuery/EstimateQuery";

export default class EstimateModel {
  estimateQuery: EstimateQuery;

  constructor() {
    this.estimateQuery = new EstimateQuery();
  }

  selectEstimateList(id: string) {
    const query = this.estimateQuery.getEstimateList(id);
    return selectQuery(query);
  }

  selectEstimate(estimateId: number) {
    const query = this.estimateQuery.getEstimate(estimateId);
    return selectQuery(query);
  }

  insertEstimate(
    memberId: string,
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
    advancePay: number
  ) {
    const query = this.estimateQuery.getInsertEstimate(
      memberId,
      memberName,
      memberPhone,
      memberEmail,
      origin,
      brand,
      series,
      model,
      detail,
      grade,
      option,
      capital,
      rentalPeriod,
      insurancePlan,
      carPrice,
      carOptionPrice,
      carFinalPrice,
      deposit,
      advancePay
    );
    return insertQuery(query);
  }
}
