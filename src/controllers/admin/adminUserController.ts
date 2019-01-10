/**
 * 2주차 다해 - 전체 회원 리스트를 DB로부터 받아와 회원관리 뷰에 보내주기 위한 컨트롤러
 */

import { selectUserCountForAdmin, selectUserListForAdmin, updateUserForAdmin } from "../../models/user/AdminModel";
import { AsyncController } from "../../_@types/Controllers";
import { IUserList, IUpdatedData } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";

/** 전체 회원수 요청 */
export const getUserCountForAdminController: AsyncController = async (req, res) => {
  const responseManager = new ResponseManager(res);
  const userCount = await selectUserCountForAdmin();
  const totalCount: number = userCount[0]["count(*)"];

  responseManager.json(200, `[+] The totalCount count of users was found successfully.`, { totalCount });
};

/** 회원정보 페이지네이션 */
export const getUserListForAdminController: AsyncController = async (req, res) => {
  const page = req.params.page as number;

  const responseManager = new ResponseManager(res);
  const userListData: IUserList[] = await selectUserListForAdmin(page);
  const userList = userListData.map((data) => {
    return {
      id: data.mb_id,
      name: data.mb_name,
      email: data.mb_email,
      phone: data.mb_phone,
      level: data.mb_level,
      company: data.mb_company,
      fax: data.mb_fax,
      registerDate: data.mb_register_date
    };
  });

  /** 요청한 페이지에 해당되는 회원 정보가 없는 경우 에러 처리 */
  if (!userList.length) {
    return responseManager.json(404, `[-] The user list with given page was NOT FOUND.`);
  }

  responseManager.json(200, `[+] The user list per page was found successfully.`, { userList });
};

/** 회원정보 수정 요청 */
export const updateUserForAdminController: AsyncController = async (req, res) => {
  const updatedData: IUpdatedData = req.body;

  const responseManager = new ResponseManager(res);
  const result = await updateUserForAdmin(updatedData);

  /** 요청한 회원 정보를 찾을 수 없는 경우 에러 처리 */
  if (result.affectedRows === 0) {
    return responseManager.json(404, `[-] The user data with given ID was NOT FOUND.`);
  }

  responseManager.json(200, `[+] The user data with given ID was updated successfully.`);
};
