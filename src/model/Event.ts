export class Events {
  private events: Array<IEvent>;
  constructor(events?: Array<IEvent>) {
    this.events = events;
  }
  addAll(events: Array<IEvent>): void {
    events.forEach(e => this.add(e));
  }
  add(event: IEvent): void {
    this.events.push(event);
  }
}

export interface IEvent {
  date: string;
  author: string;
  etype: string;
}
