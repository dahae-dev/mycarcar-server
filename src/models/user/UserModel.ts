import con from "../../db";
import { MysqlError } from "mysql";
import UserQuery from "./UserQuery";
import {
  ISelectKey,
  IRowDataPacket,
  IRegisterInfomation,
} from "../../interfaces";

export default class UserModel {
  /** 유저의 정보를 요청. */
  public selectUser({ id }: ISelectKey): Promise<IRowDataPacket[]> {
    const query: string = new UserQuery().selectUser({ id });
    return UserModel.sendQuery(query);
  }

  /** 유저의 정보를 등록. */
  public insertUser({
    name,
    id,
    pw,
    email,
    phone,
  }: IRegisterInfomation): Promise<IRowDataPacket[]> {
    const query: string = new UserQuery().insertUser({
      name,
      id,
      pw,
      email,
      phone,
    });
    return UserModel.sendQuery(query);
  }

  /** 유저 정보를 업데이트. */
  public updateUser({ name, id, pw, email, phone }: IRegisterInfomation) {
    const query: string = new UserQuery().updateUser({
      name,
      id,
      pw,
      email,
      phone,
    });

    return UserModel.sendQuery(query);
  }

  /** 데이터베이스에 쿼리를 전송. */
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
