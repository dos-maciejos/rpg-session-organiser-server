const validatePassword = (password) => {
  return password && typeof password === "string" && password.length >= 6;
};

module.exports = validatePassword;
