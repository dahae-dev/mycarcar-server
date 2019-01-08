/**
 * 2주차 다해 - 차량 관리 admin 페이지에 필요한 데이터를 불러올 쿼리문 실행하여 결과 리턴
 */

import { getSelectCarQuery } from "./AdminQuery";
import { ISelectCarList } from "../../_@types/Models/Car";
import { sendQuery } from "../../db";

/** 쿼리문 실행을 통해 모든 차량 정보 불러오기 */
export const selectCarList: ISelectCarList = () => {
  const query = getSelectCarQuery();
  return sendQuery(query);
};
