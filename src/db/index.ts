import mysql, { Query } from "mysql";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
});

con.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("Database Connected!");
});

export const sendQuery = (query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};
