import JwtManager from "../../util/JwtManager";
import { selectUser } from "../../models/user/UserModel";
import { AsyncController } from "../../_@types/Controllers";
import { IEditAccountForResponse, ISelectFromUser } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";

/** 회원정보 수정을 위한 회원정보 요청. */
export const getUserController: AsyncController = async (req, res) => {
  const jwtManager = new JwtManager(req);
  const responseManager = new ResponseManager(res);

  const idOfRequester = jwtManager.getDecodedToken().id;

  const { mb_company, mb_phone, mb_name, mb_id, mb_fax, mb_email }: ISelectFromUser = (await selectUser({
    id: idOfRequester,
  }))[0];

  const data: IEditAccountForResponse = {
    id: mb_id,
    pw: "",
    name: mb_name,
    email: mb_email,
    phone: mb_phone,
    company: mb_company,
    fax: mb_fax,
  };

  /** 일치하는 회원 정보가 있을 경우의 응답. */
  responseManager.json(200, "[+] Member information has been returned as normal.", data);
};
