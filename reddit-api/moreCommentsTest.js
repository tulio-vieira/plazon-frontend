const axios = require('axios');
const fs = require('fs');

const FILE_NAME = 'moreComments';
const ACCESS_TOKEN = '-63hehTFt_oIMdy0cDZ77CoT72nA';

const instance = axios.create({
  timeout: 3000,
  headers: { "Authorization": `bearer ${ACCESS_TOKEN}`, "User-Agent": "ChangeMeClient/0.1 by Ok_Illustrator7421" },
});

let ADDRESS = 'https://oauth.reddit.com/api/morechildren?&id=g6dvbb4';

async function getMoreComments() {
  try {
    let response = await instance.get(ADDRESS);
    fs.writeFile(`${FILE_NAME}.json`, JSON.stringify(response.data), function (err) {
      if (err) return console.log(err);
      console.log(`Comments written to file: ${FILE_NAME}.json`);
    });
  } catch (err) {
    console.log(err.message);
  }
}

getMoreComments();