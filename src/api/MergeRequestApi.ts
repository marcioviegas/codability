import GitLabClient from "../gitlab_client";
import { Gitlab } from "gitlab";
import { Events, IEvent } from "../model/Event";

class MergeRequestApi {
  client: Gitlab;

  constructor() {
    this.client = GitLabClient;
  }

  async getMergeRequest(
    projectId: number,
    mergeRequestId: number
  ): Promise<Events> {
    const mergeRequest: any = await this.client.MergeRequests.show(
      projectId,
      mergeRequestId
    );

    const events: Events = new Events([
      {
        date: mergeRequest.created_at,
        author: mergeRequest.author.username,
        etype: "MERGE_REQUEST"
      }
    ]);

    const notes: any = await this.client.MergeRequestNotes.all(
      projectId,
      mergeRequestId
    );

    events.addAll(
      notes.map(n => {
        return {
          date: n.created_at,
          author: n.author.username,
          etype: "NOTE"
        };
      })
    );

    const commits: any = await this.client.MergeRequests.commits(
      projectId,
      mergeRequestId
    );

    events.addAll(
      commits.map(n => {
        return {
          date: n.created_at,
          author: n.author_email,
          etype: "COMMIT"
        };
      })
    );

    return events;
  }
}

export default MergeRequestApi;
