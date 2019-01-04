import con from "../../db";
import {
  getSelectUserQuery,
  getInsertUserQuery,
  getUpdateUserQuery,
} from "./UserQuery";
import {
  ISelectKey,
  SendQuery,
  InsertUser,
  UpdateUser,
  SelectUser,
} from "../../interfaces";

/** 데이터베이스에 쿼리를 전송. */
const sendQuery: SendQuery = (query) => {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

/** 유저의 정보를 요청. */
export const selectUser: SelectUser = ({ id }) => {
  const query = getSelectUserQuery({ id });
  return sendQuery(query);
};

/** 유저의 정보를 등록. */
export const insertUser: InsertUser = ({ name, id, pw, email, phone }) => {
  const query = getInsertUserQuery({ name, id, pw, email, phone });
  return sendQuery(query);
};

/** 유저 정보를 업데이트. */
export const updateUser: UpdateUser = ({ name, id, pw, email, phone }) => {
  const query = getUpdateUserQuery({ name, id, pw, email, phone });
  return sendQuery(query);
};
