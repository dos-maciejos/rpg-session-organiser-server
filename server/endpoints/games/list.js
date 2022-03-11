const { getGames } = require("../../utils");

const listGames = (accessToken) => {
  const errors = [];
  const games = getGames(accessToken);

  return {
    data: {
      games,
    },
    errors,
  };
};

module.exports = listGames;
