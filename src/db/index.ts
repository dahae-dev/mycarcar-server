import mysql from "mysql";
import dotenv from "dotenv";
import path from "path";
import { SendQuery } from "../_@types/Models";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
});

con.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("Database Connected!");
});

/** 데이터베이스에 쿼리를 전송. */
export const sendQuery: SendQuery = (query) => {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};
