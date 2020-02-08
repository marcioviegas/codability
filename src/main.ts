import MergeRequestApi from "./api/MergeRequestApi";
import { Events } from "./model/Event";

async function main() {
  const events: Events = await new MergeRequestApi().getMergeRequest(
    13362728,
    83
  );

  console.log(events.getEvents());
}

main();
