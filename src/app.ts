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

import { checkDotenv } from "./util/checkDotenv";

import { checkToken } from "./middlewares/checkToken";
import { corsOption } from "./middlewares/options";

import { IProcessEnv, AppBase } from "./interfaces";

/** 앱을 위한 환경설정 정보가 없으면 에러 발생. */
dotenv.config();
checkDotenv();

const application = express();

/** 미들웨어. */
const middleware: AppBase = (app) => {
  app.use(logger("dev"));
  app.use(cors(corsOption));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../build")));
};

/** api이외의 경로로 접근하게 되면 앱의 index.html을 전달. */
const routes: AppBase = (app) => {
  app.use("/api/login", loginRouter);
  app.use("/api/register", registerRouter);
  app.use("/api/edit_account", checkToken, editAccountRouter);

  app.use("*", appEndPoint);
};

/** 앱의 환경설정을 하고 실행합니다. */
const launchConf: AppBase = (app) => {
  const { PORT, MODE, HOST } = process.env as IProcessEnv;

  app.use(errorHandler());
  app.listen(PORT, () => {
    console.log(`App is running at http://${HOST}:${PORT} in ${MODE} mode`);
    console.log("Press CTRL-C to stop\n");
  });
};

middleware(application);
routes(application);
launchConf(application);

export default { application };
