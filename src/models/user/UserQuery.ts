const TABLE_NAME: string = "users";

export default class UserQuery {
  /**
   * 유저 정보를 요청하는 쿼리문자열을 반환.
   */
  public selectUser({ id }: ISelectKey): string {
    return `
      SELECT * FROM ${TABLE_NAME} WHERE u_id="${id}";
    `;
  }

  /**
   * 유저 정보를 저장하는 쿼리문자열을 반환.
   */
  public insertUser({
    name,
    id,
    pw,
    email,
    phone,
  }: IRegisterInfomation): string {
    return `
      INSERT INTO ${TABLE_NAME} (u_id, u_password, u_name, u_email, u_phone)
      VALUES("${id}", "${pw}", "${name}", "${email}", "${phone}");
    `;
  }

  /**
   * 유저 정보를 업데이트하는 쿼리문자열을 반환.
   */
  public updateUser({
    name,
    id,
    pw,
    email,
    phone,
  }: IRegisterInfomation): string {
    // tslint:disable-next-line: max-line-length
    return `UPDATE ${TABLE_NAME} SET u_name="${name}", u_id="${id}", u_password="${pw}", u_email="${email}", u_phone="${phone}" WHERE u_id="${id}"`;
  }
}
