import { Request, Response } from "express";

import JwtManager from "../../util/JwtManager";
import ResponseManager from "../util/ResponseManager";

import EstimateModel from "../../models/EstimateModel/EstimateModel";
import UserModel from "../../models/UserModel/UserModel";

export default class EstimateController {
  constructor() {
    this.userModel = new UserModel();
    this.estimateModel = new EstimateModel();

    this.getEstimate = this.getEstimate.bind(this);
    this.getEstimateList = this.getEstimateList.bind(this);
    this.postEstimate = this.getEstimateList.bind(this);
  }

  userModel: UserModel;
  estimateModel: EstimateModel;

  async getEstimate(req: Request, res: Response) {
    const estimateId: number = req.params.id;

    const estimateInfo = (await this.estimateModel.selectEstimate(estimateId))[0];

    const responseManager = new ResponseManager(res);
    return responseManager.json(200, `[+] Estimate was found successfully.`, {
      estimateInfo,
      statusCode: 200,
      statusMessage: `[+] Estimate was found successfully.`
    });
  }

  async getEstimateList(req: Request, res: Response) {
    const jwtManager = new JwtManager(req);
    const { id } = jwtManager.getDecodedToken();

    const estimateList = await this.estimateModel.selectEstimateList(id);

    const responseManager = new ResponseManager(res);
    return responseManager.json(200, `[+] Estimate List was found successfully.`, {
      estimateList,
      statusCode: 200,
      statusMessage: `[+] Estimate List was found successfully.`
    });
  }

  async postEstimate(req: Request, res: Response) {
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
    const { mb_id, mb_name, mb_phone, mb_email } = (await this.userModel.selectUser({ id }))[0];

    const memberId = mb_id;
    const memberName = mb_name;
    const memberPhone = mb_phone;
    const memberEmail = mb_email;

    const result = await this.estimateModel.insertEstimate(
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

    const responseManager = new ResponseManager(res);
    const insertResult = !result.affectedRows;
    if (insertResult) {
      return responseManager.json(412, `[-] Estimate Precondition Failed.`, {
        statusCode: 412,
        statusMessage: `[-] Estimate Precondition Failed.`
      });
    }

    return responseManager.json(200, `[+] Estimate save successfully.`, {
      statusCode: 200,
      statusMessage: `[+] Estimate save successfully.`
    });
  }
}
