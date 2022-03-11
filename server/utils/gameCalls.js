const query = require("./connector");

const createGame = async (gameId, joinCode, userId, password, name) => {
  let dbQuery = `INSERT INTO games VALUES ("${gameId}", "${name}", "${joinCode}", "${userId}", "${password}")`;
  try {
    await query(dbQuery);
    dbQuery = `INSERT INTO game_users VALUES ("${gameId}", "${userId}")`;
    await query(dbQuery);

    return {
      id: gameId,
      name,
      join_code: joinCode,
      gm_id: userId,
      password,
    };
  } catch (err) {
    console.warn(err);
    return null;
  }
};

const createDate = async (dateId, gameId, gmId, scheduledAt) => {
  let dbQuery = `INSERT INTO dates VALUES ("${dateId}", "${gameId}", "${gmId}", "${scheduledAt}")`;
  try {
    await query(dbQuery);
  } catch (err) {
    console.warn(err);
    return null;
  }

  return {
    date_id: dateId,
    game_id: gameId,
    gm_id: gmId,
    scheduled_at: scheduledAt,
  };
};

module.exports = { createGame };
