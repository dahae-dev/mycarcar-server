/**
 * 2주차 다해 - 장기렌트 페이지에 불러올 데이터 가져오는 쿼리문
 */

import {
  IGetSelectCarBrandQuery,
  IGetSelectCarSeriesQuery,
  IGetSelectCarModelQuery,
  IGetSelectCarDetailQuery,
  IGetSelectCarGradeQuery,
  IGetSelectCarPriceQuery,
  IGetSelectCarOptionQuery,
  IGetSelectCapitalQuery,
  IGetInsertEstimateQuery,
} from "../../_@types/Models/Car";

/** 차량 브랜드 정보를 요청하는 쿼리문 반환  */
export const getSelectCarBrandQuery: IGetSelectCarBrandQuery = (origin) => {
  return `
    SELECT car_brand
    FROM car_brand
    WHERE car_origin = "${origin}"
  `;
};

/** 차량 시리즈 정보를 요청하는 쿼리문 반환  */
export const getSelectCarSeriesQuery: IGetSelectCarSeriesQuery = (brand) => {
  return `
    SELECT car_series
    FROM car_series
    WHERE car_brand_id = (
      SELECT car_brand_id FROM car_brand WHERE car_brand = "${brand}"
    )
  `;
};

/** 차량 모델 정보를 요청하는 쿼리문 반환  */
export const getSelectCarModelQuery: IGetSelectCarModelQuery = (series) => {
  return `
    SELECT car_model
    FROM car_model
    WHERE car_series_id = (
      SELECT car_series_id FROM car_series WHERE car_series = "${series}"
    )
  `;
};

/** 차량 디테일 정보를 요청하는 쿼리문 반환  */
export const getSelectCarDetailQuery: IGetSelectCarDetailQuery = (model) => {
  return `
    SELECT car_detail
    FROM car_model_detail
    WHERE car_model_id = (
      SELECT car_model_id FROM car_model WHERE car_model = "${model}"
    )
  `;
};

/** 차량 등급 정보를 요청하는 쿼리문 반환  */
export const getSelectCarGradeQuery: IGetSelectCarGradeQuery = (model, detail) => {
  return `
    SELECT car_grade
    FROM car_model_detail_grade
    WHERE car_detail_id = (
      SELECT car_detail_id
      FROM car_model_detail
      WHERE car_detail = "${detail}" AND car_model_id = (
        SELECT car_model_id FROM car_model WHERE car_model = "${model}"
      )
    )
  `;
};

/** 차량 가격 정보 요청하는 쿼리문 반환 */
export const gtSelectCarPriceQuery: IGetSelectCarPriceQuery = (model, detail, grade) => {
  return `
    SELECT car_price
    FROM car_model_detail_grade
    WHERE car_grade_id = (
      SELECT car_grade_id
      FROM car_model_detail_grade
      WHERE car_grade = "${grade}" AND car_detail_id = (
        SELECT car_detail_id
        FROM car_model_detail
        WHERE car_detail = "${detail}" AND car_model_id = (
          SELECT car_model_id FROM car_model WHERE car_model = "${model}"
        )
      )
    )
  `;
};

/** 차량 옵션 정보를 요청하는 쿼리문 반환  */
export const getSelectCarOptionQuery: IGetSelectCarOptionQuery = (model, detail, grade) => {
  return `
    SELECT car_option, car_option_price
    FROM car_grade_option
    WHERE car_grade_id = (
      SELECT car_grade_id
      FROM car_model_detail_grade
      WHERE car_grade = "${grade}" AND car_detail_id = (
        SELECT car_detail_id
        FROM car_model_detail
        WHERE car_detail = "${detail}" AND car_model_id = (
          SELECT car_model_id FROM car_model WHERE car_model = "${model}"
        )
      )
    )
  `;
};

export const getSelectCapitalQuery: IGetSelectCapitalQuery = () => {
  return `SELECT * FROM car_capital`;
};

export const getInsertEstimateQuery: IGetInsertEstimateQuery = (
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
  // tslint:disable-next-line: max-line-length
  return `
  INSERT INTO car_estimate (
    mb_name, mb_phone, mb_email,
    car_origin, car_brand, car_series, car_model, car_detail, car_grade, car_option,
    capital, car_rental_period, car_insurance_plan, car_price, car_option_price, car_final_price,
    car_deposit, car_advance_pay
  )
  VALUES (
    "${memberName}", "${memberPhone}", "${memberEmail}",
    "${origin}", "${brand}", "${series}", "${model}", "${detail}", "${grade}", "${option}",
    "${capital}", ${rentalPeriod}, ${insurancePlan}, ${carPrice}, ${carOptionPrice}, ${carFinalPrice},
    ${deposit}, ${advancePay}
  )
  `;
};
