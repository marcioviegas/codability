import App from "./App";
import { SERVER_PORT } from "./config";
import ProjectController from "./controller/ProjectController";

const app = new App(SERVER_PORT, [new ProjectController()]);

app.listen();
