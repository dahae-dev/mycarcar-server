const TABLE_NAME: string = "users";

export default class UserQuery {
  public selectAllUser(): string {
    return `
      SELECT * FROM ${TABLE_NAME};
    `;
  }

  public selectUser({ id }: ISelectKey): string {
    return `
      SELECT * FROM ${TABLE_NAME} WHERE u_id="${id}";
    `;
  }

  public insertUser({ name, id, pw, email, phone }: IRegisterInfo): string {
    return `
      INSERT INTO ${TABLE_NAME} (u_id, u_password, u_name, u_email, u_phone)
      VALUES("${id}", "${pw}", "${name}", "${email}", "${phone}");
    `;
  }

  public updateUser({ name, id, pw, email, phone }: IRegisterInfo): string {
    // tslint:disable-next-line: max-line-length
    return `UPDATE ${TABLE_NAME} SET u_name="${name}", u_id="${id}", u_password="${pw}", u_email="${email}", u_phone="${phone}" WHERE u_id="${id}"`;
  }
}
