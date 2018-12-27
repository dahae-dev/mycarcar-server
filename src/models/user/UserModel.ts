import con from "../../db";
import { MysqlError } from "mysql";
import UserQuery from "./UserQuery";

export default class UserModel {
  public getAllUser(): Promise<IRowDataPacket[]> {
    const query: string = new UserQuery().selectAllUser();
    return UserModel.sendQuery(query);
  }

  public getUser({ id }: ISelectKey): Promise<IRowDataPacket[]> {
    const query: string = new UserQuery().selectUser({ id });
    return UserModel.sendQuery(query);
  }

  public postUser({
    name,
    id,
    pw,
    email,
    phone,
  }: IRegisterInfo): Promise<IRowDataPacket[]> {
    const query: string = new UserQuery().insertUser({
      name,
      id,
      pw,
      email,
      phone,
    });
    return UserModel.sendQuery(query);
  }

  public updateUser({ name, id, pw, email, phone }: IRegisterInfo) {
    const query: string = new UserQuery().updateUser({
      name,
      id,
      pw,
      email,
      phone,
    });

    return UserModel.sendQuery(query);
  }

  private static sendQuery(query: string): Promise<IRowDataPacket[]> {
    return new Promise(
      (resolve, reject): void => {
        con.query(query, (err: MysqlError, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
      },
    );
  }
}
