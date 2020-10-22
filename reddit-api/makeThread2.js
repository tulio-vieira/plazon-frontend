const fs = require('fs');
const comments_arr = [
  [
    { id: '1', body: '1', depth: 0, parent_id: 0, order: 0 },
    { id: '2', body: '2', depth: 0, parent_id: 0, order: 1 },
    { id: '3', body: '3', depth: 0, parent_id: 0, order: 2 }
  ],
  [
    { id: '1.1', body: '1.1', depth: 1, parent_id: '1', order: 0 },
    { id: '2.1', body: '2.1', depth: 1, parent_id: '2', order: 0 },
    { id: '2.2', body: '2.2', depth: 1, parent_id: '2', order: 1 },
    { id: '3.1', body: '3.1', depth: 1, parent_id: '3', order: 0 },
    { id: '3.2', body: '3.2', depth: 1, parent_id: '3', order: 1 },
  ],
  [
    { id: '1.1.1', body: '1.1.1', depth: 2, parent_id: '1.1', order: 0 },
    { id: '1.1.2', body: '1.1.2', depth: 2, parent_id: '1.1', order: 1 },
    { id: '1.1.3', body: '1.1.3', depth: 2, parent_id: '1.1', order: 2 },
    { id: '2.2.1', body: '2.2.1', depth: 2, parent_id: '2.2', order: 0 },
    { id: '3.1.1', body: '3.1.1', depth: 2, parent_id: '3.1', order: 0 },
    { id: '3.2.1', body: '3.2.1', depth: 2, parent_id: '3.2', order: 0 },
  ],
];

function threadComments() {
  for (let i = comments_arr.length - 1; i > 0; i--){
    let parentIdx = 0;
    for (let comment of comments_arr[i]) {
      while (comment.parent_id !== comments_arr[i - 1][parentIdx].id) { parentIdx++; }
      comments_arr[i - 1][parentIdx].children ?
      comments_arr[i - 1][parentIdx].children.push(comment) :
      comments_arr[i - 1][parentIdx].children = [comment];
    }
    comments_arr.pop();
  }
}

const FILE_NAME = 'threaded-comments-2'

try {
  threadComments();
  fs.writeFile(`${FILE_NAME}.json`, JSON.stringify(comments_arr[0]), function (err) {
    if (err) return console.log(err);
    console.log(`Comments written to file: ${FILE_NAME}.json`);
  });
} catch(e) {
  console.log(e);
}