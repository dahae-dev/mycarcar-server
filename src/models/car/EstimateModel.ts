import { IInsertEstimate, ISelectEstimateList, ISelectEstimate } from "../../_@types/Models/Car";
import { sendQuery } from "../../db";
import { getInsertEstimateQuery, getEstimateListQuery, getEstimateQuery } from "./EstimateQuery";

export const insertEstimate: IInsertEstimate = (
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
  advancePay,
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
    advancePay,
  );
  return sendQuery(query);
};

export const selectEstimateList: ISelectEstimateList = async (id) => {
  const query = getEstimateListQuery(id);
  return sendQuery(query);
};

export const selectEstimate: ISelectEstimate = async (estimateId) => {
  const query = getEstimateQuery(estimateId);
  return sendQuery(query);
};
