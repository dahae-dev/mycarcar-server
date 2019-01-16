import { Request, Response } from "express";

import JwtManager from "../../util/JwtManager";
import ResponseManager from "../util/ResponseManager";

import EstimateModel from "../../models/EstimateModel/EstimateModel";
import UserModel from "../../models/UserModel/UserModel";

interface IEstimateInfo {
  car_estimate_no: number;
  mb_id: string;
  mb_name: string;
  mb_phone: string;
  mb_email: string;
  car_origin: string;
  car_brand: string;
  car_series: string;
  car_model: string;
  car_detail: string;
  car_grade: string;
  car_option: string;
  capital: string;
  car_rental_period: number;
  car_insurance_plan: number;
  car_price: number;
  car_option_price: number;
  car_final_price: number;
  car_deposit: number;
  car_advance_pay: number;
  at_date: string;
}

export default class EstimateController {
  constructor() {
    this.userModel = new UserModel();
    this.estimateModel = new EstimateModel();

    this.getEstimate = this.getEstimate.bind(this);
    this.getEstimateList = this.getEstimateList.bind(this);
    this.postEstimate = this.postEstimate.bind(this);
  }

  userModel: UserModel;
  estimateModel: EstimateModel;

  async getEstimate(req: Request, res: Response) {
    const responseManager = new ResponseManager(res);

    const estimateId: number = req.params.id;
    const selectedResult = await this.estimateModel.selectEstimate(estimateId);

    if (!selectedResult.isOk) {
      return responseManager.json(412, `견적서를 찾지 못했습니다.`);
    }

    const estimateInfo: IEstimateInfo = selectedResult.data[0];
    return responseManager.json(200, `견적서를 찾았습니다.`, { estimateInfo });
  }

  async getEstimateList(req: Request, res: Response) {
    const responseManager = new ResponseManager(res);
    const jwtManager = new JwtManager(req);

    const { id } = jwtManager.getDecodedToken();
    const selectResult = await this.estimateModel.selectEstimateList(id);

    if (!selectResult.isOk) {
      return responseManager.json(412, `견적서 리스트를 찾지 못했습니다.`);
    }

    const estimateList: IEstimateInfo[] = selectResult.data;
    return responseManager.json(200, `견적서 리스트를 찾았습니다.`, { estimateList });
  }

  async postEstimate(req: Request, res: Response) {
    const responseManager = new ResponseManager(res);

    const {
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
    } = req.body;

    const jwtManager = new JwtManager(req);
    const { id } = jwtManager.getDecodedToken();
    const selectedResultOfUser = await this.userModel.selectUser({ id });

    if (!selectedResultOfUser.isOk) {
      return responseManager.json(412, `견적서 저장을 위한 유저 정보 불러오기에 실패하였습니다.`);
    }
    const { mb_id, mb_name, mb_phone, mb_email } = selectedResultOfUser.data[0];

    const memberId = mb_id;
    const memberName = mb_name;
    const memberPhone = mb_phone;
    const memberEmail = mb_email;

    const insertedResultOfEstimate = await this.estimateModel.insertEstimate(
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

    if (!insertedResultOfEstimate.isOk) {
      return responseManager.json(412, `견적서 저장에 실패하였습니다.`);
    }

    return responseManager.json(200, `견적서 저장이 완료되었습니다.`);
  }
}
