const uuid = require("uuid");
const { userCalls, hash, gameCalls } = require("../../utils");
const { validatePassword } = require("../../validators");

const createGame = async (req, res) => {
  const { password, access_token: accessToken, name } = req.body;

  if (!validatePassword(password)) {
    return res.status(422).json({
      errors: ["Invalid password for session!"],
    });
  }

  const user = await userCalls.currentUser(accessToken);

  if (!user || !user.id) {
    return res.status(401).json({
      errors: ["Unauthorized!"],
    });
  }

  const gameId = uuid.v4();
  const joinCode = uuid.v4();
  const game = await gameCalls.createGame(
    gameId,
    joinCode,
    user.id,
    password,
    name
  );

  if (!game) {
    return res.status(500).json({
      errors: ["Internal error!"],
    });
  }

  res.status(201).json({
    data: {
      game,
    },
  });
};

module.exports = createGame;
