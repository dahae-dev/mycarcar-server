import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";

import { appEndPoint } from "./controllers/appController";

import loginRouter from "./routes/loginRouter";
import registerRouter from "./routes/registerRouter";
import editAccountRouter from "./routes/editAccountRouter";
import rentalRouter from "./routes/rentalRouter";
import adminUserRouter from "./routes/adminUserRouter";
import estimateRouter from "./routes/estimateRouter";

import { checkDotenv } from "./util/checkDotenv";

import { checkToken } from "./middlewares/checkToken";
import { checkSuperAdmin } from "./middlewares/checkSuperAdmin";
import { corsOption } from "./middlewares/options";
import { IAppListenOption } from "./_@types/Apps";

import "./db";

dotenv.config();
checkDotenv();

const app = express();

app.use(logger("dev"));
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/edit_account", checkToken, editAccountRouter);
app.use("/api/rental", rentalRouter);
app.use("/api/estimate", estimateRouter);
app.use("/api/admin/user-list", checkToken, checkSuperAdmin, adminUserRouter);
app.use("*", appEndPoint);
app.use(errorHandler());

const { PORT, MODE, HOST } = process.env as IAppListenOption;
app.listen(PORT, () => {
  console.log(`App is running at http://${HOST}:${PORT} in ${MODE} mode`);
  console.log("Press CTRL-C to stop\n");
});
