/**
 * 2주차 다해 - 차량 관리 admin 페이지에 불러올 데이터 가져오는 쿼리문
 */

import { IGetSelectCarQuery } from "../../_@types/Models/Car";

/** 전체 차량 정보를 요청하는 쿼리문 반환 */
export const getSelectCarQuery: IGetSelectCarQuery = () => {
  return `
    SELECT b.car_origin, b.car_brand, s.car_series, m.car_model, d.car_detail, g.car_grade, g.car_price, o.car_option, o.car_option_price
    FROM car_brand b, car_series s, car_model m, car_model_detail d, car_model_detail_grade g, car_grade_option o
    WHERE b.car_brand_id = s.car_brand_id AND s.car_series_id = m.car_series_id AND m.car_model_id = d.car_model_id AND d.car_detail_id = g.car_detail_id AND g.car_grade_id = o.car_grade_id
  `;
};
