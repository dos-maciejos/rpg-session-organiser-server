const validateUsername = (username) => {
  return username && typeof username === "string" && username.length >= 6;
};

module.exports = validateUsername;
