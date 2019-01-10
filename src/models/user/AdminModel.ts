/**
 * 2주차 다해 - 회원 관리 admin 페이지에 필요한 데이터를 불러올 쿼리문 실행하여 결과 리턴
 */

import {
  getSelectUserCountForAdminQuery,
  getSelectUserListForAdminQuery,
  getUpdateUserForAdminQuery,
  getUserLevelQuery
} from "./AdminQuery";
import {
  ISelectUserCountForAdmin,
  ISelectUserListForAdmin,
  IUpdateUserForAdmin,
  ISelectUserLevel
} from "../../_@types/Models/User";
import { sendQuery } from "../../db";

/** 쿼리문 실행을 통해 전체 회원수 불러오기 */
export const selectUserCountForAdmin: ISelectUserCountForAdmin = () => {
  const query = getSelectUserCountForAdminQuery();
  return sendQuery(query);
};

/** 회원정보 페이지네이션 */
export const selectUserListForAdmin: ISelectUserListForAdmin = (page) => {
  const query = getSelectUserListForAdminQuery(page);
  return sendQuery(query);
};

/** 쿼리문 실행을 통해 회원 정보 수정하기 */
export const updateUserForAdmin: IUpdateUserForAdmin = (updatedData) => {
  const query = getUpdateUserForAdminQuery(updatedData);
  return sendQuery(query);
};

/** 슈퍼관리자 인증을 위한 레벨 확인 */
export const selectUserLevel: ISelectUserLevel = (id) => {
  const query = getUserLevelQuery(id);
  return sendQuery(query);
};
