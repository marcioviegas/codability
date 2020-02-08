import { Request, Response } from "express";
import { Controller } from "./Controller";

export default class ProjectControoller extends Controller {
  private static basePath: string = "/projects";

  protected initRoutes() {
    this.router.get(ProjectControoller.basePath, this.get);
  }

  private get(req: Request, res: Response) {
    res.send("OK");
  }
}
