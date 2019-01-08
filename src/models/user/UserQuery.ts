import {
  GetSelectUserQuery,
  GetInsertUserQuery,
  GetInsertCompanyUserQuery,
  GetUpdateUserQuery,
  GetUpdateCompanyUserQuery,
} from "../../_@types/Models/User";

const DB_NAME = "carkorea2";
const TABLE_NAME = "n8_member";

/** 유저 정보를 요청하는 쿼리문자열을 반환. */
export const getSelectUserQuery: GetSelectUserQuery = (selectData) => {
  const { id } = selectData;
  return `
    SELECT * FROM ${DB_NAME}.${TABLE_NAME} WHERE mb_id="${id}";
  `;
};

/** 유저 정보를 저장하는 쿼리문자열을 반환. */
export const getInsertUserQuery: GetInsertUserQuery = (registerData) => {
  const { name, id, pw, email, phone } = registerData;
  return `
    INSERT INTO ${DB_NAME}.${TABLE_NAME} (mb_id, mb_password, mb_name, mb_email, mb_phone)
    VALUES("${id}", "${pw}", "${name}", "${email}", "${phone}");
  `;
};

/** 캐피탈 관리자 유저 정보를 저장하는 쿼리문자열을 반환. */
export const getInsertComnanyUserQuery: GetInsertCompanyUserQuery = (registerData) => {
  const { name, id, pw, email, phone, company, fax } = registerData;
  return `
    INSERT INTO ${DB_NAME}.${TABLE_NAME} (mb_id, mb_password, mb_name, mb_email, mb_phone, mb_company, mb_fax)
    VALUES("${id}", "${pw}", "${name}", "${email}", "${phone}", "${company}", "${fax}");
  `;
};

/** 유저 정보를 업데이트하는 쿼리문자열을 반환. */
export const getUpdateUserQuery: GetUpdateUserQuery = (updateData) => {
  const { name, id, pw, email, phone } = updateData;
  // tslint:disable-next-line: max-line-length
  return `UPDATE ${DB_NAME}.${TABLE_NAME} SET mb_name="${name}", mb_id="${id}", mb_password="${pw}", mb_email="${email}", mb_phone="${phone}" WHERE mb_id="${id}"`;
};

/** 유저 정보를 업데이트하는 쿼리문자열을 반환. */
export const getUpdateCompanyUserQuery: GetUpdateCompanyUserQuery = (updateData) => {
  const { name, id, pw, email, phone, company, fax } = updateData;
  // tslint:disable-next-line: max-line-length
  return `UPDATE ${DB_NAME}.${TABLE_NAME} SET mb_name="${name}", mb_id="${id}", mb_password="${pw}", mb_email="${email}", mb_phone="${phone}", mb_company="${company}", mb_fax="${fax}" WHERE mb_id="${id}"`;
};
