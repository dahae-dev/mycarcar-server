/**
 * 2주차 다해 - 회원 관리 admin 페이지에 불러올 데이터 가져오는 쿼리문
 */

import {
  IGetSelectUserCountForAdminQuery,
  IGetSelectUserListForAdminQuery,
  IGetUpdateUserForAdminQuery,
  IGetUserLevelQuery
} from "../../_@types/Models/User";

/** 전체 회원수를 요청하는 쿼리문 반환 */
export const getSelectUserCountForAdminQuery: IGetSelectUserCountForAdminQuery = () => {
  return `SELECT count(*) FROM n8_member`;
};

/** 회원 정보 페이지네이션 */
export const getSelectUserListForAdminQuery: IGetSelectUserListForAdminQuery = (page) => {
  const offset = page * 10 - 10;
  return `
    SELECT mb_id, mb_name, mb_email, mb_phone, mb_level, mb_company, mb_fax, mb_register_date
    FROM n8_member
    ORDER BY mb_no DESC
    LIMIT ${offset}, 10;
  `;
};

/** 슈퍼관리자에 의해 회원 정보를 수정하는 쿼리문 반환 */
export const getUpdateUserForAdminQuery: IGetUpdateUserForAdminQuery = (updatedData) => {
  const { id, name, email, phone, level, company, fax } = updatedData;
  return `
    UPDATE n8_member 
    SET mb_name="${name}", mb_email="${email}", mb_phone="${phone}", mb_level="${level}", mb_company="${company}", mb_fax="${fax}"
    WHERE mb_id="${id}"
  `;
};

/** 슈퍼관리자 인증을 위해 회원 레벨을 불러오는 쿼리문 반환 */
export const getUserLevelQuery: IGetUserLevelQuery = (id) => {
  return `
    SELECT mb_level FROM n8_member
    WHERE mb_id="${id}"
  `;
};
