import * as bodyParser from "body-parser";
import * as path from "path";

import errorHandler from "errorhandler";
import express from "express";
import logger from "morgan";

import indexRouter from "./routes/index";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middleware();
    this.routes();
    this.launchConf();
  }

  private middleware(): void {
    this.express.set("port", process.env.PORT || 3000);
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(path.join(__dirname, "public")));
  }

  private routes(): void {
    this.express.use("/", indexRouter);
  }

  private launchConf(): void {
    const PORT = this.express.get("port");
    this.express.use(errorHandler());

    this.express.listen(PORT, () => {
      console.log("App is running at http://localhost:%d in %s mode", PORT);
      console.log("Press CTRL-C to stop\n");
    });
  }
}

const app: App = new App();

export default app.express;
