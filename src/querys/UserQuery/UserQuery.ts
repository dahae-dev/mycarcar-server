import {
  IInsertForUser,
  IInsertForCompanyUser,
  IUpdateForUser,
  IUpdateForCompanyUser
} from "../../_@types/Models/User";

const DB_NAME = "carkorea2";
const TABLE_NAME = "n8_member";

export default class UserQuery {
  getSelectUser(selectData: { id: string }) {
    const { id } = selectData;
    return `SELECT * FROM ${DB_NAME}.${TABLE_NAME} WHERE mb_id="${id}";`;
  }

  getInsertUser(registerData: IInsertForUser) {
    const { name, id, pw, email, phone } = registerData;
    return `
      INSERT INTO ${DB_NAME}.${TABLE_NAME} (
        mb_id, mb_password, mb_name, mb_email, mb_phone
      )
      VALUES(
        "${id}", "${pw}", "${name}", "${email}", "${phone}"
      );
    `;
  }

  getInsertComnanyUser(registerData: IInsertForCompanyUser) {
    const { name, id, pw, email, phone, company, fax } = registerData;
    return `
      INSERT INTO ${DB_NAME}.${TABLE_NAME} (
        mb_id, mb_password, mb_name, mb_email, mb_phone, mb_company, mb_fax
      )
      VALUES(
        "${id}", "${pw}", "${name}", "${email}", "${phone}", "${company}", "${fax}"
      );
    `;
  }

  getUpdateUser(updateData: IUpdateForUser) {
    const { name, id, pw, email, phone } = updateData;
    return `
      UPDATE ${DB_NAME}.${TABLE_NAME}
        SET
          mb_name="${name}", mb_id="${id}", mb_password="${pw}",
          mb_email="${email}", mb_phone="${phone}" WHERE mb_id="${id}"
    `;
  }

  getUpdateCompanyUser(updateData: IUpdateForCompanyUser) {
    const { name, id, pw, email, phone, company, fax } = updateData;
    return `
      UPDATE ${DB_NAME}.${TABLE_NAME}
        SET
          mb_name="${name}", mb_id="${id}", mb_password="${pw}",
          mb_email="${email}", mb_phone="${phone}", mb_company="${company}",
          mb_fax="${fax}"
        WHERE mb_id="${id}"
    `;
  }
}
