import { Request, Response } from "express";
import { Controller } from "./Controller";
import MergeRequestApi from "../api/MergeRequestApi";

export default class PullRequestController extends Controller {
  private static basePath: string =
    "/projects/:projectId/pullrequests/:pullRequestId";

  private static mrApi = new MergeRequestApi();

  protected initRoutes() {
    this.router.get(PullRequestController.basePath, this.get);
  }

  private async get(req: Request, res: Response) {
    const events = await PullRequestController.mrApi.getMergeRequest(
      req.params.projectId,
      Number.parseInt(req.params.pullRequestId)
    );
    res.send(events);
  }
}
