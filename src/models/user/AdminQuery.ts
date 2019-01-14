import { IUpdatedData } from "../../_@types/Models/User";

export const getSelectUserCountForAdminQuery = () => {
  return `SELECT count(*) FROM n8_member`;
};

export const getSelectUserListForAdminQuery = (page: number) => {
  const offset = page * 10 - 10;
  return `
    SELECT mb_id, mb_name, mb_email, mb_phone, mb_level, mb_company, mb_fax, mb_register_date
    FROM n8_member
    ORDER BY mb_no DESC
    LIMIT ${offset}, 10;
  `;
};

export const getUpdateUserForAdminQuery = (updatedData: IUpdatedData) => {
  const { id, name, email, phone, level, company, fax } = updatedData;
  return `
    UPDATE n8_member
    SET
    mb_name="${name}", mb_email="${email}", mb_phone="${phone}",
    mb_level="${level}", mb_company="${company}", mb_fax="${fax}"
    WHERE mb_id="${id}"
  `;
};

export const getUserLevelQuery = (id: string) => {
  return `
    SELECT mb_level FROM n8_member
    WHERE mb_id="${id}"
  `;
};
