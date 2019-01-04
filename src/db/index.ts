import mysql from "mysql";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: "carkorea2",
});

con.connect((err) => {
  if (err) {
    throw err;
  }

  console.log("Database Connected!");
});

export default con;
