export default class RentalQuery {
  getSelectCarBrand(origin: string) {
    return `
      SELECT car_brand
      FROM car_brand
      WHERE car_origin = "${origin}"
    `;
  }

  getSelectCarSeries(brand: string) {
    return `
      SELECT car_series
      FROM car_series
      WHERE car_brand_id = (
        SELECT car_brand_id FROM car_brand WHERE car_brand = "${brand}"
      )
    `;
  }

  getSelectCarModel(series: string) {
    return `
      SELECT car_model
      FROM car_model
      WHERE car_series_id = (
        SELECT car_series_id FROM car_series WHERE car_series = "${series}"
      )
    `;
  }

  getSelectCarDetail(model: string) {
    return `
    SELECT car_detail
    FROM car_model_detail
    WHERE car_model_id = (
      SELECT car_model_id FROM car_model WHERE car_model = "${model}"
    )
  `;
  }

  getSelectCarGrade(model: string, detail: string) {
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
  }

  getSelectCarPrice(model: string, detail: string, grade: string) {
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
  }

  getSelectCarOption(model: string, detail: string, grade: string) {
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
  }

  getSelectCapital() {
    return `SELECT * FROM car_capital`;
  }
}
