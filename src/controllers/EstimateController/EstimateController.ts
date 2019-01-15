import { Request, Response } from "express";

import JwtManager from "../../util/JwtManager";
import ResponseManager from "../util/ResponseManager";
import { selectUser } from "../../models/user/UserModel";

import { selectEstimate, selectEstimateList, insertEstimate } from "../../models/car/EstimateModel";

class EstimateController {
  req: Request;
  res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  async getEstimate() {
    const estimateId: number = this.req.params.id;

    const estimateInfo = (await selectEstimate(estimateId))[0];

    const responseManager = new ResponseManager(this.res);
    return responseManager.json(200, `[+] Estimate was found successfully.`, {
      estimateInfo,
      statusCode: 200,
      statusMessage: `[+] Estimate was found successfully.`
    });
  }

  async getEstimateList() {
    const jwtManager = new JwtManager(this.req);
    const { id } = jwtManager.getDecodedToken();

    const estimateList = await selectEstimateList(id);

    const responseManager = new ResponseManager(this.res);
    return responseManager.json(200, `[+] Estimate List was found successfully.`, {
      estimateList,
      statusCode: 200,
      statusMessage: `[+] Estimate List was found successfully.`
    });
  }

  async postEstimate() {
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
    } = this.req.body;

    const jwtManager = new JwtManager(this.req);
    const { id } = jwtManager.getDecodedToken();
    const { mb_id, mb_name, mb_phone, mb_email } = (await selectUser({ id }))[0];

    const memberId = mb_id;
    const memberName = mb_name;
    const memberPhone = mb_phone;
    const memberEmail = mb_email;

    const result = await insertEstimate(
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

    const responseManager = new ResponseManager(this.res);
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
