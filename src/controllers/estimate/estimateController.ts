import { AsyncController } from "../../_@types/Controllers";
import ResponseManager from "../util/ResponseManager";
import JwtManager from "../../util/JwtManager";
import { selectEstimate } from "../../models/car/RentalModel";
import { selectEstimateList } from "../../models/car/RentalModel";
import { insertEstimate } from "../../models/car/RentalModel";
import { selectUser } from "../../models/user/UserModel";

export const postEstimateController: AsyncController = async (req, res) => {
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
    advancePay,
  } = req.body;

  const jwtManager = new JwtManager(req);
  const { id } = jwtManager.getDecodedToken();
  const { mb_id, mb_name, mb_phone, mb_email } = (await selectUser({ id }))[0];

  const memberId = mb_id;
  const memberName = mb_name;
  const memberPhone = mb_phone;
  const memberEmail = mb_email;

  insertEstimate(
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
    advancePay,
  );

  return responseManager.json(200, `[+] Estimate save successfully.`, {
    statusCode: 200,
    statusMessage: `[+] Estimate save successfully.`,
  });
};

export const getEstimateListController: AsyncController = async (req, res) => {
  const jwtManager = new JwtManager(req);
  const { id } = jwtManager.getDecodedToken();

  const estimateList = await selectEstimateList(id);

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] Estimate List was found successfully.`, {
    estimateList,
    statusCode: 200,
    statusMessage: `[+] Estimate List was found successfully.`,
  });
};

export const getEstimateController: AsyncController = async (req, res) => {
  const estimateId = req.params.id as number;

  const estimateInfo = (await selectEstimate(estimateId))[0];

  const responseManager = new ResponseManager(res);
  return responseManager.json(200, `[+] Estimate was found successfully.`, {
    estimateInfo,
    statusCode: 200,
    statusMessage: `[+] Estimate was found successfully.`,
  });
};
