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
import adminCarRouter from "./routes/adminCarRouter";
import adminUserRouter from "./routes/adminUserRouter";

import { checkDotenv } from "./util/checkDotenv";

import { checkToken } from "./middlewares/checkToken";
import { corsOption } from "./middlewares/options";
import { IAppListenOption } from "./_@types/Apps";

/** 앱을 위한 환경설정 정보가 없으면 에러 발생. */
dotenv.config();
checkDotenv();

const app = express();

/** 미들웨어 */
app.use(logger("dev"));
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

/** 라우터 */
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/edit_account", checkToken, editAccountRouter);
app.use("/api/rental", rentalRouter); // add checkToken
app.use("/api/admin/car-list", adminCarRouter); // add checkAdmin 필요?
app.use("/api/admin/user-list", adminUserRouter); // add checkAdmin 필요?
app.use("*", appEndPoint);
app.use(errorHandler());

/** 앱 실행 */
const { PORT, MODE, HOST } = process.env as IAppListenOption;
app.listen(PORT, () => {
  console.log(`App is running at http://${HOST}:${PORT} in ${MODE} mode`);
  console.log("Press CTRL-C to stop\n");
});
