const userCalls = require("./userCalls");
const gameCalls = require("./gameCalls");
const hashing = require("./hashing");

module.exports = {
  userCalls,
  gameCalls,
  hash: hashing.hash,
};
