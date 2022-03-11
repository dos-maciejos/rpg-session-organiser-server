const argon = require("argon2");

const hash = async (password) => {
  return await argon.hash(password);
};

const verify = async (hash, password) => {
  return await argon.verify(hash, password);
};

module.exports = { hash, verify };
