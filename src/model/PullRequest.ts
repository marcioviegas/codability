import { Event, Events } from "./Event";

export default class PullRequest {
  private created_at: Date;
  private author: string;
  private status: string;
  private events: Array<Event>;
  private target_branch: string;
  private source_branch: string;

  constructor(
    created_at: string,
    author: string,
    status: string,
    target_branch: string,
    source_branch: string,
    events: Events
  ) {
    this.created_at = new Date(created_at);
    this.author = author;
    this.status = status;
    this.events = events.getEvents();
    this.target_branch = target_branch;
    this.source_branch = source_branch;
  }
}
