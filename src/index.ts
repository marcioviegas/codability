import App from "./App";
import { SERVER_PORT } from "./config";
import PullRequestController from "./controller/PullRequestController";

const app = new App(SERVER_PORT, [new PullRequestController()]);

app.listen();
