import { config } from "dotenv";
config();

export const GITLAB_TOKEN = process.env.GITLAB_TOKEN;
export const SERVER_PORT = process.env.PORT
  ? Number.parseInt(process.env.PORT)
  : 3000;
