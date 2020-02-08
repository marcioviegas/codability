const { Octokit } = require("@octokit/rest");

console.log(process.env);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

octokit.request("/user").then(({ data }) => {
  console.log(data);
});