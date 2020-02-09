import { Controller } from "./controller/Controller";
import express from "express";
import { Server } from "http";

const cors = require("cors");
const bodyParser = require("body-parser");

export default class App {
  private port: number;
  private server: Server | undefined;
  public app: express.Application;

  constructor(port: number, controllers?: Controller[]) {
    this.port = port;

    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.initControllers(controllers || []);
  }

  public listen(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }
}
