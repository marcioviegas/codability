import { PullRequest, Commit, IEvent } from "./PullRequest";

let pR: PullRequest;

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date("2020-01-01T00:00:00Z").getTime());

  pR = new PullRequest(
    "1",
    new Date().toISOString(),
    "Márcio Viegas",
    "merged",
    "",
    "master",
    "ACD-132 New Block",
    "Description"
  );
});

describe("Pull Request", () => {
  it("should order events recent last", () => {
    let events: IEvent[] = [];

    const event: Commit = new Commit(
      "2020-12-30T10:10",
      "Márcio Viegas",
      "Description"
    );

    const recentEvent: Commit = new Commit(
      "2020-12-31T10:10",
      "Márcio Viegas",
      "Description"
    );

    events.push(recentEvent);
    events.push(event);

    pR.addEvents(events);

    expect(pR.events[0]).toMatchObject(event);
    expect(pR.events[1]).toMatchObject(recentEvent);
  });

  it("should calculate distance from events", () => {
    let events: IEvent[] = [];

    const event: Commit = new Commit(
      "2020-12-30T10:10",
      "Márcio Viegas",
      "Description"
    );

    const recentEvent: Commit = new Commit(
      "2020-12-31T10:10",
      "Márcio Viegas",
      "Description"
    );

    events.push(event);
    events.push(recentEvent);

    pR.addEvents(events);

    expect(pR.events[1].distanceFromOlderEvent).toEqual("1 day");
  });

  it("should calculate distance from today", () => {
    const event: Commit = new Commit(
      "2021-01-01T00:00",
      "Márcio Viegas",
      "Description"
    );

    pR.addEvents([event]);

    expect(pR.events[0].distanceFromToday).toEqual("1 year");
  });
});
