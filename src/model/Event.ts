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
  getOrderedEvents() {
    return this.events.sort((e1, e2) => {
      return Date.parse(e1.date) - Date.parse(e2.date);
    });
  }
}

export interface IEvent {
  date: string;
  author: string;
  etype: string;
  title?: string;
  description?: string;
}
