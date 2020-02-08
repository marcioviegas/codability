import { Gitlab } from "gitlab";
import { GITLAB_TOKEN } from "./config";

const GitLabClient = new Gitlab({
  token: GITLAB_TOKEN
});

export default GitLabClient;
