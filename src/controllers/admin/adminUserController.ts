/**
 * 2주차 다해 - 전체 회원 리스트를 DB로부터 받아와 회원관리 뷰에 보내주기 위한 컨트롤러
 */

import { selectUserList } from "../../models/user/AdminModel";
import { AsyncController } from "../../_@types/Controllers";
import { IUserList } from "../../_@types/Models/User";
import ResponseManager from "../util/ResponseManager";

/** 전체 회원 리스트 요청 */
export const getUserListController: AsyncController = async (req, res) => {
  const responseManager = new ResponseManager(res);
  const userList: IUserList[] = await selectUserList();
  responseManager.json(200, `[+] The user list for admin was found successfully.`, { userList });
};

/** 회원정보 수정 요청 */
