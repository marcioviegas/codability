export class Events {
  private events: Array<Event>;
  constructor(events?: Array<Event>) {
    this.events = events;
  }
  addAll(events: Array<Event>): void {
    events.forEach(e => this.add(e));
  }
  add(event: Event): void {
    this.events.push(event);
  }
  getEvents() {
    return this.events.sort((e1, e2) => {
      return e1.date.getTime() - e2.date.getTime();
    });
  }
}

export class Event {
  date: Date;
  author: string;
  etype: string;
  title?: string;
  description?: string;

  constructor(
    date: string,
    author: string,
    etype: string,
    title?: string,
    description?: string
  ) {
    this.date = new Date(date);
    this.author = author;
    this.etype = etype;
    this.title = title;
    this.description = description;
  }
}
