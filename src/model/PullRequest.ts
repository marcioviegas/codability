import { formatDistanceStrict } from "date-fns";

export enum EventType {
  commit,
  pullrequest,
  discussion,
  note
}

export interface IEvent {
  date: Date;
  type: EventType;

  distanceFromOlderEvent?: string;
  distanceFromToday?: string;
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
  public id: number;
  public type = EventType.pullrequest;

  public events: Array<IEvent> = [];

  public status: string;
  public target_branch: string;
  public source_branch: string;
  public title: string;
  public description: string;

  public distanceFromToday: string;
  public lastUpdated: string;

  constructor(
    id: string,
    date: string,
    author: string,
    status: string,
    target_branch: string,
    source_branch: string,
    title: string,
    description: string
  ) {
    this.id = Number.parseInt(id);
    this.date = new Date(date);
    this.author = author;

    this.status = status;
    this.target_branch = target_branch;
    this.source_branch = source_branch;
    this.title = title;
    this.description = description;

    this.distanceFromToday = formatDistanceStrict(
      this.date,
      new Date(Date.now())
    );

    this.lastUpdated = formatDistanceStrict(this.date, new Date(Date.now()));
  }

  // This is the worse and easiest algorightm I've came up with
  // Good enought for now
  addEvents(events: Array<IEvent>) {
    this.events = [...this.events, ...events];

    this.events = this.events.sort((e1, e2) => {
      return e1.date.getTime() - e2.date.getTime();
    });

    this.events = this.events.map((e, index) => {
      return {
        ...e,
        distanceFromToday: formatDistanceStrict(e.date, new Date(Date.now())),
        distanceFromOlderEvent:
          index === 0
            ? formatDistanceStrict(e.date, new Date(Date.now()))
            : formatDistanceStrict(e.date, this.events[index - 1].date)
      };
    });

    this.lastUpdated = formatDistanceStrict(
      this.events[this.events.length - 1].date,
      new Date(Date.now())
    );
  }
}
