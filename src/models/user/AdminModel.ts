/**
 * 2주차 다해 - 회원 관리 admin 페이지에 필요한 데이터를 불러올 쿼리문 실행하여 결과 리턴
 */

import { getSelectUserListQuery } from "./AdminQuery";
import { ISelectUserList } from "../../_@types/Models/User";
import { sendQuery } from "../../db";

/** 쿼리문 실행을 통해 모든 회원 정보 불러오기 */
export const selectUserList: ISelectUserList = () => {
  const query = getSelectUserListQuery();
  return sendQuery(query);
};
