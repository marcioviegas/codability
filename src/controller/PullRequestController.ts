import { Request, Response } from "express";
import { Controller } from "./Controller";
import MergeRequestApi from "../api/MergeRequestApi";

export default class PullRequestController extends Controller {
  private static basePath: string = "/projects/:projectId/pullrequests";

  private static mrApi = new MergeRequestApi();

  protected initRoutes() {
    this.router.get(PullRequestController.basePath, this.list);
    this.router.get(
      PullRequestController.basePath + "/:pullRequestId",
      this.get
    );
  }

  private async list(req: Request, res: Response) {
    const pullRequests = await PullRequestController.mrApi.getMergeRequests(
      req.params.projectId
    );
    res.send(pullRequests);
  }

  private async get(req: Request, res: Response) {
    const PR = await PullRequestController.mrApi.getMergeRequest(
      req.params.projectId,
      Number.parseInt(req.params.pullRequestId)
    );
    res.send(PR);
  }
}
