import mysql from "mysql";
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

interface IMysqlInsertResult {
  isOk: boolean;
}

export interface IMysqlUpdateResult {
  isOk: boolean;
}

export interface IMysqlSelectResult {
  isOk: boolean;
  data: any[];
}

export const insertQuery = (query: string): Promise<IMysqlInsertResult> => {
  return new Promise((resolve) => {
    con.query(query, (err) => {
      if (err) {
        console.error("Mysql :: err.message :", err.message);
        resolve({ isOk: false });
      }

      resolve({ isOk: true });
    });
  });
};

export const selectQuery = (query: string): Promise<IMysqlSelectResult> => {
  return new Promise((resolve) => {
    con.query(query, (err, result) => {
      if (err) {
        console.error("Mysql :: err.message :", err.message);
        resolve({ isOk: false, data: [] });
      }

      if (!result.length) {
        resolve({ isOk: false, data: result });
      }

      resolve({ isOk: true, data: result });
    });
  });
};

export const updateQuery = (query: string): Promise<IMysqlUpdateResult> => {
  return new Promise((resolve) => {
    con.query(query, (err) => {
      if (err) {
        console.error("Mysql :: err.message :", err.message);
        resolve({ isOk: false });
      }

      resolve({ isOk: true });
    });
  });
};
