import { Router } from "express";

export abstract class Controller {
  public router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  protected abstract initRoutes(): void;
}
