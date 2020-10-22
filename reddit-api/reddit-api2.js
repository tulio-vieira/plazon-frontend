'use strict';
const axios = require('axios');
const fs = require('fs');

const FILE_NAME = 'comments';

const instance = axios.create({
  timeout: 3000,
});

const ADDRESS = 'https://www.reddit.com/r/wallstreetbets/comments/j4mwgj.json?&threaded=false';

async function writeCommentsToFile() {
  let response = await instance.get(ADDRESS);
  let comments = [];
  response.data[1].data.children.forEach(comment => {
    // looping through all comments
    if (comment.kind === 't1') {
      comments.push({
        id: comment.data.id,
        parent_id: comment.data.parent_id,
        depth: comment.data.depth,
        author_name: comment.data.author,
        body: comment.data.body,
        ups: comment.data.ups,
        downs: comment.data.downs
      });
    }
  });
  fs.writeFile(`${FILE_NAME}.json`, JSON.stringify(comments), function (err) {
    if (err) return console.log(err);
    console.log(`Comments written to file: ${FILE_NAME}.json`);
  });
}

writeCommentsToFile();