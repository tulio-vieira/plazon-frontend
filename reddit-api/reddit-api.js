'use strict';
const axios = require('axios');
const fs = require('fs');

const FILE_NAME = 'api-response';
const ACCESS_TOKEN = "-KiPexsLd4U2QyFI2KacxEVYw4h4";

const instance = axios.create({
  timeout: 3000,
  headers: { "Authorization": `bearer ${ACCESS_TOKEN}`, "User-Agent": "ChangeMeClient/0.1 by Ok_Illustrator7421" },
});

let ADDRESS = 'https://oauth.reddit.com/r/wallstreetbets/comments/j4mwgj.json?&threaded=true';

//ADDRESS = 'https://oauth.reddit.com/api/morechildren?&link_id=t3_j4mwgj&children=g7knej5&depth=10';

async function getTopLevelComments() {
  let response = await instance.get(ADDRESS);
  let commentsIds = [];
  response.data[1].data.children.forEach(comment => {
    // looping through all top level comments
    commentsIds.push(comment.data.id)
  });
  console.log(commentsIds);
  return commentsIds;
}

async function getCommentBranches(idsArr) {

  let comments = [];
  for (let i = 0; i < idsArr.length; i++) {
    let idsStr = idsArr.slice(i, i + 3).join(',');
    let response = await instance.get('https://oauth.reddit.com/api/morechildren?&link_id=t3_j4mwgj&depth=30&children=' + idsStr);
    comments.push(response.data);
  }
  fs.writeFile('comments-data2.json', JSON.stringify(comments), function (err) {
    if (err) return console.log(err);
    console.log('Comments written to file: comments-data.json');
  });
}

//let commentsIds = await getTopLevelComments();
getCommentBranches(['g7kivm3']);

function writeCommentsToFile(responseData) {
  let comments = [];
  responseData[1].data.children.forEach(comment => {
    // looping through all top level comments
    comments.push({ id: comment.data.id, body: comment.data.body })
  });
  fs.writeFile('comments-data.json', JSON.stringify(comments), function (err) {
    if (err) return console.log(err);
    console.log('Comments written to file: comments-data.json');
  });
}

/*
instance.get('https://www.reddit.com/r/wallstreetbets/comments/j4mwgj.json')
  .then(response => {
    fs.writeFile(FILE_NAME + '.json', JSON.stringify(response.data), function (err) {
      if (err) return console.log(err);
      console.log('Response written to file: ' + FILE_NAME);
    });
  })
  .catch(err => {
    console.log(err.message);
  });

*/




/*


curl -X POST -d "grant_type=client_credentials" --user "j_LuyEDO7Ak61w:RMs04ujBYcBSE1R9KDSuwliTwpE" https://www.reddit.com/api/v1/access_token -A "User agent"

curl -X POST -d -A "User agent" "grant_type=password&username=Ok_Illustrator7421&password=aurelio" --user "j_LuyEDO7Ak61w:RMs04ujBYcBSE1R9KDSuwliTwpE" https://www.reddit.com/api/v1/access_token

curl -X POST -d "grant_type=password&username=Ok_Illustrator7421&password=aurelio" --user "j_LuyEDO7Ak61w:RMs04ujBYcBSE1R9KDSuwliTwpE" https://www.reddit.com/api/v1/access_token -A "Custom User Agent"

curl -X POST -d "grant_type=password&username=Ok_Illustrator7421&password=aurelio" --user "j_LuyEDO7Ak61w:RMs04ujBYcBSE1R9KDSuwliTwpE" https://www.reddit.com/api/v1/access_token -A "Custom User Agent"

*/









/* const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://www.reddit.com',
  timeout: 1000,
  headers: { "User-Agent": "ChangeMeClient/0.1 by Ok_Illustrator7421" },
  auth: {
    username: 'j_LuyEDO7Ak61w',
    password: 'RMs04ujBYcBSE1R9KDSuwliTwpE'
  }
});

let post_data = { "grant_type": "password", "username": "Ok_Illustrator7421", "password": "aurelio" };

instance.post('/api/v1/access_token', post_data)
  .then(response => {
    console.log(response.data);
  })
  .catch(err => {
    console.log(err);
  }) */


/*
  const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  }); */