import ResponseManager from "../util/ResponseManager";
import JwtManager from "../../util/JwtManager";
import { selectUser } from "../../models/user/UserModel";
import { insertEstimate, selectEstimateList, selectEstimate } from "../../models/car/EstimateModel";
import { Request, Response } from "express";

export const postEstimateController = async (req: Request, res: Response) => {
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
};

export const getEstimateListController = async (req: Request, res: Response) => {
  const jwtManager = new JwtManager(req);
  const { id } = jwtManager.getDecodedToken();

  const estimateList = await selectEstimateList(id);

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] Estimate List was found successfully.`, {
    estimateList,
    statusCode: 200,
    statusMessage: `[+] Estimate List was found successfully.`
  });
};

export const getEstimateController = async (req: Request, res: Response) => {
  const estimateId = req.params.id as number;

  const estimateInfo = (await selectEstimate(estimateId))[0];

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] Estimate was found successfully.`, {
    estimateInfo,
    statusCode: 200,
    statusMessage: `[+] Estimate was found successfully.`
  });
};
