/**
 * 2주차 다해 - 전체 차량 리스트를 DB로부터 받아와 차량관리 뷰에 보내주기 위한 컨트롤러
 */

import { selectCarList } from "../../models/car/AdminModel";
import { AsyncController } from "../../_@types/Controllers";
import { ICarList } from "../../_@types/Models/Car";
import ResponseManager from "../util/ResponseManager";

/** 전체 차량 리스트 요청 */
export const getCarListController: AsyncController = async (req, res) => {
  const responseManager = new ResponseManager(res);
  const carList: ICarList[] = await selectCarList();
  responseManager.json(200, `[+] The car list for admin was found successfully.`, { carList });
};

/** 차량 카탈로그 다운로드 요청 */
