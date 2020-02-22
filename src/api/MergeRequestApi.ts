import GitLabClient from "../gitlab_client";
import { Gitlab } from "gitlab";
import { PullRequest, Commit, Discussion, Note } from "../model/PullRequest";

export default class MergeRequestApi {
  client: Gitlab;

  constructor() {
    this.client = GitLabClient;
  }

  public async getMergeRequest(
    projectId: string,
    mergeRequestId: number
  ): Promise<PullRequest> {
    try {
      const mergeRequest: any = await this.client.MergeRequests.show(
        projectId,
        mergeRequestId
      );

      const pullRequest: PullRequest = new PullRequest(
        mergeRequest.created_at,
        mergeRequest.author.username,
        mergeRequest.state,
        mergeRequest.targed_branch,
        mergeRequest.source_branch,
        mergeRequest.title,
        mergeRequest.description
      );

      const discussions: any = await this.client.MergeRequestDiscussions.all(
        projectId,
        mergeRequestId
      );

      pullRequest.addEvents(
        discussions.map(d => {
          return new Discussion(
            d.notes.map(n => {
              return new Note(
                n.created_at,
                n.author.username,
                n.body,
                n.system
              );
            })
          );
        })
      );

      const commits: any = await this.client.MergeRequests.commits(
        projectId,
        mergeRequestId
      );

      pullRequest.addEvents(
        commits.map(c => {
          return new Commit(c.created_at, c.commiter_name, c.message);
        })
      );

      return pullRequest;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
