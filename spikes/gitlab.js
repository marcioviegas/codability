const { Gitlab } = require("gitlab");
const http = require("http");

const api = new Gitlab({
  host: "https://gitlab.com",
  token: ""
})

let i;

api.MergeRequests.all({ projectId: 13362728 }).then(mr => {
  let hoursA = [];

  mr.forEach(mr => {
    // console.log(
    //   `by: ${mr.author.name} \ncreated: ${mr.created_at} \nmerged: ${mr.merged_at} \n`
    // );

    if (mr.merged_at) {
      let hours =
        (new Date(mr.merged_at).getTime() - new Date(mr.created_at).getTime()) /
        (1000 * 60 * 60);

      hoursA.push(hours);

      // console.log(`time till merge: ${hours} hours \n`);
    }

    // console.log("---------------\n");
    api.MergeRequestDiscussions.all(13362728, mr.iid)
      .then(discussions => {
        console.log(discussions[0].notes);
      })
      .catch(err => {
        console.log(err);
      });
  });
  console.log(mr.iid);

  // api.MergeRequestDiscussions.all({
  //   resourceId: 13362728,
  //   resource2Id: mr.id
  // }).then(discussions => {
  //   console.log(discussions);
  // });

  var aa = hoursA.filter(i => i > 1);

  // console.log(aa);

  // console.log(hoursA.reduce((total, i) => total + i) / aa.length);
});
