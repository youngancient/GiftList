const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");
const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '156eb0d75153bcc964f3a7fa2e86027a908852b8d8f2b943fea06580f303ad7a';
const merkleTree = new MerkleTree(niceList);

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name, index} = req.body;
  // TODO: prove that a name is in the list 
  const proof = merkleTree.getProof(index);
  const isInTheList = verifyProof(proof,name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
