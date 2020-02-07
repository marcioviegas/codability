const { Gitlab } = require("gitlab");
const fs = require("fs");

const project = 13362728;
const mergeRequest = 83;

const api = new Gitlab({
  host: "https://gitlab.com",
  token: ""
});

let disscustions = [];

// api.MergeRequestDiscussions.all(project, mergeRequest).then(diss => {
//   diss.forEach(({ id, notes }) => {
//     var notesA = notes.map(({ type, body, author }) => {
//       let name = author.name;
//       return { type, body, name };
//     });
//     disscustions.push({ id, notesA });
//   });

//   fs.writeFile(
//     `merge_request_${mergeRequest}.json`,
//     JSON.stringify(disscustions),
//     function() {}
//   );
// });

let notesA = [];

function printNotesByProjectAndMergeRequest(project, mergeRequest) {
  api.MergeRequestNotes.all(project, mergeRequest).then(notes => {
    var normalized = notes
      .map(({ id, type, body, author, system, created_at }) => {
        let name = author.name;
        return {
          id,
          type,
          body,
          name,
          system,
          created_at
        };
      })
      .sort(function(a, b) {
        return a.id - b.id;
      });

    fs.writeFile(
      `notes_${mergeRequest}.json`,
      JSON.stringify(notes),
      function() {}
    );

    //   console.log(
    //     notes.map(({ type, body }) => {
    //       return { type, body };
    //     })
    //   );
  });
}

function printBranches(project, branchName) {
  api.Branches.show(project, branchName)
    .then(bs => {
      fs.writeFile(
        `branch_${branchName}.json`,
        JSON.stringify(bs),
        function() {}
      );
    })
    .catch(err => {
      console.log(err);
    });
}

printBranches(project, "ACD-408");
printNotesByProjectAndMergeRequest(project, mergeRequest);
