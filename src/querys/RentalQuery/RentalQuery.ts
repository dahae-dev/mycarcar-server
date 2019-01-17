export default class RentalQuery {
  getSelectCarBrand(origin: string) {
    return `
      SELECT car_brand, car_brand_id
      FROM car_brand
      WHERE car_origin = "${origin}"
    `;
  }

  getSelectCarSeries(brandId: number) {
    return `
      SELECT car_series, car_series_id
      FROM car_series
      WHERE car_brand_id = ${brandId}
    `;
  }

  getSelectCarModel(seriesId: number) {
    return `
      SELECT car_model, car_model_id
      FROM car_model
      WHERE car_series_id =${seriesId}
    `;
  }

  getSelectCarDetail(modelId: number) {
    return `
    SELECT car_detail, car_detail_id
    FROM car_model_detail
    WHERE car_model_id=${modelId}
  `;
  }

  getSelectCarGrade(detailId: number) {
    return `
      SELECT car_grade, car_grade_id
      FROM car_model_detail_grade
      WHERE car_detail_id=${detailId}
    `;
  }

  getSelectCarPrice(gradeId: number) {
    return `
      SELECT car_price
      FROM car_model_detail_grade
      WHERE car_grade_id=${gradeId}
    `;
  }

  getSelectCarOption(gradeId: number) {
    return `
      SELECT car_option, car_option_price
      FROM car_grade_option
      WHERE car_grade_id=${gradeId}
    `;
  }

  getSelectCapital() {
    return `SELECT * FROM car_capital`;
  }
}
