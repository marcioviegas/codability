import GitLabClient from "../gitlab_client";
import { Gitlab } from "gitlab";
import { Events, Event } from "../model/Event";
import PullRequest from "../model/PullRequest";

export default class MergeRequestApi {
  client: Gitlab;

  constructor() {
    this.client = GitLabClient;
  }

  public async getMergeRequest(
    projectId: string,
    mergeRequestId: number
  ): Promise<PullRequest> {
    const mergeRequest: any = await this.client.MergeRequests.show(
      projectId,
      mergeRequestId
    );

    const events: Events = new Events([
      new Event(
        mergeRequest.created_at,
        mergeRequest.author.username,
        "MERGE_REQUEST",
        mergeRequest.title,
        mergeRequest.description
      )
    ]);

    const notes: any = await this.client.MergeRequestNotes.all(
      projectId,
      mergeRequestId
    );

    events.addAll(
      notes.map(n => {
        return new Event(
          n.created_at,
          n.author.username,
          "NOTE",
          "NO_TITLE",
          n.body
        );
      })
    );

    const commits: any = await this.client.MergeRequests.commits(
      projectId,
      mergeRequestId
    );

    events.addAll(
      commits.map(n => {
        return new Event(
          n.created_at,
          n.author_email,
          "COMMIT",
          n.title,
          n.message
        );
      })
    );

    return new PullRequest(
      mergeRequest.created_at,
      mergeRequest.author.username,
      mergeRequest.state,
      mergeRequest.targed_branch,
      mergeRequest.source_branch,
      events
    );
  }
}
