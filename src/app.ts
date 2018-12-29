import * as bodyParser from "body-parser";
import * as path from "path";

import dotenv from "dotenv";
import errorHandler from "errorhandler";
import express from "express";
import logger from "morgan";
import cors from "cors";

import appEndPoint from "./controllers/AppController";
import loginRouter from "./routes/LoginRouter";
import registerRouter from "./routes/RegisterRouter";
import editAccountRouter from "./routes/EditAccountRouter";

import { authMiddlemare } from "./middlewares/auth";
import MiddlewareOptions from "./middlewares/MiddlewareOptions";
import checkDotenv from "./util/checkDotenv";

dotenv.config();
checkDotenv();

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middleware();
    this.routes();
    this.launchConf();
  }

  private middleware(): void {
    const middlewareOptions = new MiddlewareOptions();

    this.express.use(logger("dev"));
    this.express.use(cors(middlewareOptions.cors));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(
      express.static(
        path.join(__dirname, "../../client-lift29-mycarcar-web/build"),
      ),
    );
  }

  private routes(): void {
    this.express.use("/api/login", loginRouter);
    this.express.use("/api/register", registerRouter);
    this.express.use("/api/edit_account", authMiddlemare, editAccountRouter);

    this.express.use("*", appEndPoint);
  }

  private launchConf(): void {
    const { PORT, MODE } = process.env as IProcessEnv;

    this.express.use(errorHandler());
    this.express.listen(PORT, () => {
      console.log(`App is running at http://localhost:${PORT} in ${MODE} mode`);
      console.log("Press CTRL-C to stop\n");
    });
  }
}

const app: App = new App();

export default app.express;
