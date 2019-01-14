import {
  IGetSelectCarBrandQuery,
  IGetSelectCarSeriesQuery,
  IGetSelectCarModelQuery,
  IGetSelectCarDetailQuery,
  IGetSelectCarGradeQuery,
  IGetSelectCarPriceQuery,
  IGetSelectCarOptionQuery,
  IGetSelectCapitalQuery
} from "../../_@types/Models/Car";

export const getSelectCarBrandQuery: IGetSelectCarBrandQuery = (origin) => {
  return `
    SELECT car_brand
    FROM car_brand
    WHERE car_origin = "${origin}"
  `;
};

export const getSelectCarSeriesQuery: IGetSelectCarSeriesQuery = (brand) => {
  return `
    SELECT car_series
    FROM car_series
    WHERE car_brand_id = (
      SELECT car_brand_id FROM car_brand WHERE car_brand = "${brand}"
    )
  `;
};

export const getSelectCarModelQuery: IGetSelectCarModelQuery = (series) => {
  return `
    SELECT car_model
    FROM car_model
    WHERE car_series_id = (
      SELECT car_series_id FROM car_series WHERE car_series = "${series}"
    )
  `;
};

export const getSelectCarDetailQuery: IGetSelectCarDetailQuery = (model) => {
  return `
    SELECT car_detail
    FROM car_model_detail
    WHERE car_model_id = (
      SELECT car_model_id FROM car_model WHERE car_model = "${model}"
    )
  `;
};

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
