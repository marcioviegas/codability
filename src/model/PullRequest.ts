export enum EventType {
  commit,
  pullrequest,
  discussion,
  note
}

export interface IEvent {
  date: Date;
  type: EventType;
}

export interface IAuthored {
  author: string;
}

export class Note implements IEvent, IAuthored {
  public date: Date;
  public author: string;
  public description: string;
  public system: boolean;
  public type = EventType.note;

  constructor(
    date: string,
    author: string,
    description: string,
    system?: boolean
  ) {
    this.date = new Date(date);
    this.author = author;
    this.description = description;
    this.system = system ? system : false;
  }
}

export class Discussion implements IEvent, IAuthored {
  public date: Date;
  public author: string;
  public notes: Array<Note>;
  public type = EventType.discussion;

  constructor(notes: Array<Note>) {
    this.notes = notes;

    this.notes.sort((e1, e2) => {
      return e1.date.getTime() - e2.date.getTime();
    });

    this.date = notes[0].date;
    this.author = notes[0].author;
  }
}

export class Commit implements IEvent, IAuthored {
  public date: Date;
  public author: string;
  public description: string;
  public type = EventType.commit;

  constructor(date: string, author: string, description: string) {
    this.date = new Date(date);
    this.author = author;
    this.description = description;
  }
}

export class PullRequest implements IEvent, IAuthored {
  public date: Date;
  public author: string;
  public type = EventType.pullrequest;

  public events: Array<IEvent> = [];

  public status: string;
  public target_branch: string;
  public source_branch: string;
  public title: string;
  public description: string;

  constructor(
    date: string,
    author: string,
    status: string,
    target_branch: string,
    source_branch: string,
    title: string,
    description: string
  ) {
    this.date = new Date(date);
    this.author = author;

    this.status = status;
    this.target_branch = target_branch;
    this.source_branch = source_branch;
    this.title = title;
    this.description = description;
  }

  addEvents(events: Array<IEvent>) {
    this.events = [...this.events, ...events];
    this.events.sort((e1, e2) => {
      return e1.date.getTime() - e2.date.getTime();
    });
    console.log(this.events);
  }
}
