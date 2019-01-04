import {
  GetUpdateUserQuery,
  GetInsertUserQuery,
  GetSelectUserQuery,
} from "../../interfaces";

const TABLE_NAME = "users";

/** 유저 정보를 요청하는 쿼리문자열을 반환. */
export const getSelectUserQuery: GetSelectUserQuery = (selectData) => {
  const { id } = selectData;
  return `
      SELECT * FROM ${TABLE_NAME} WHERE u_id="${id}";
    `;
};

/** 유저 정보를 저장하는 쿼리문자열을 반환. */
export const getInsertUserQuery: GetInsertUserQuery = (registerData) => {
  const { name, id, pw, email, phone } = registerData;
  return `
      INSERT INTO ${TABLE_NAME} (u_id, u_password, u_name, u_email, u_phone)
      VALUES("${id}", "${pw}", "${name}", "${email}", "${phone}");
    `;
};

/** 유저 정보를 업데이트하는 쿼리문자열을 반환. */
export const getUpdateUserQuery: GetUpdateUserQuery = (updateData) => {
  const { name, id, pw, email, phone } = updateData;
  // tslint:disable-next-line: max-line-length
  return `UPDATE ${TABLE_NAME} SET u_name="${name}", u_id="${id}", u_password="${pw}", u_email="${email}", u_phone="${phone}" WHERE u_id="${id}"`;
};
