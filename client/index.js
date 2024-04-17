const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  let name = "Okoye";
  let index = niceList.findIndex(ele => ele === name);
  if(index){
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name,
      index
    });
    console.log({ gift });
  }

}

main();