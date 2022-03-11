const { getGames, hashPassword } = require("../../utils");
const { validatePassword } = require("../../validators");

const showGame = (gameId, password, accessToken) => {
  const errors = [];

  if (!validatePassword(password)) {
    errors.push("Invalid password!");
  }

  if (errors.length) {
    return {
      data: {},
      errors,
    };
  }

  const hashedPassword = await hashPassword(password);

  if (hashedPassword) {
    const game = getGame(gameId, hashedPassword, accessToken);
  } else {
    return { data: {}, errors: ["Internal error"] };
  }

  return {
    data: {
      game,
    },
    errors,
  };
};

module.exports = listGames;
