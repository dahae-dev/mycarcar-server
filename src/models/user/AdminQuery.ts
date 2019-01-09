/**
 * 2주차 다해 - 회원 관리 admin 페이지에 불러올 데이터 가져오는 쿼리문
 */

import { IGetSelectUserListQuery } from "../../_@types/Models/User";

/** 전체 회원 정보를 요청하는 쿼리문 반환 */
export const getSelectUserListQuery: IGetSelectUserListQuery = () => {
  return `
    SELECT mb_id, mb_name, mb_email, mb_phone, mb_nick, mb_level, mb_company, mb_fax, mb_register_date, mb_login_date, mb_leave_date
    FROM n8_member
  `;
};
