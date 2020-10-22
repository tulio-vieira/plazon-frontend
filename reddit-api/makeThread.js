const fs = require('fs');
const FILE_NAME = 'threaded-comments'


const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

let helperArr = [];
let threadedComments = [];

for (let comment of comments) {
  comment.children ? null : comment.children = [];
  helperArr[comment.depth] = comment;
  if (comment.depth === 0) {
    threadedComments.push(comment);
    continue;
  }
  helperArr[comment.depth - 1].children.push(comment);
}

fs.writeFile(`${FILE_NAME}.json`, JSON.stringify(threadedComments), function (err) {
  if (err) return console.log(err);
  console.log(`Comments written to file: ${FILE_NAME}.json`);
});