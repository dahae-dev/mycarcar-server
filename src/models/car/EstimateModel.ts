import { sendQuery } from "../../db";
import { getInsertEstimateQuery, getEstimateListQuery, getEstimateQuery } from "./EstimateQuery";

export const insertEstimate = (
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
) => {
  const query = getInsertEstimateQuery(
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
  return sendQuery(query);
};

export const selectEstimateList = async (id: string) => {
  const query = getEstimateListQuery(id);
  return sendQuery(query);
};

export const selectEstimate = async (estimateId: number) => {
  const query = getEstimateQuery(estimateId);
  return sendQuery(query);
};
