const query = require("./connector");
const { verify } = require("./hashing");

const currentUser = async (accessToken) => {
  let dbQuery = `SELECT * FROM sessions WHERE sessions.access_token = "${accessToken}" LIMIT 1`;
  const [sessions] = await query(dbQuery);
  const currentSession = sessions[0];
  if (!currentSession) {
    return null;
  }
  dbQuery = `SELECT * FROM users WHERE users.id = "${currentSession.user_id}" LIMIT 1`;
  const [users] = await query(dbQuery);
  return users[0];
};

const createSession = async (username, password, accessToken, sessionId) => {
  let dbQuery = `SELECT * FROM users WHERE users.username = "${username}" LIMIT 1`;
  const [users] = await query(dbQuery);
  const currentUser = users[0];
  if (!currentUser) {
    return null;
  }

  const verified = await verify(currentUser.password_hash, password);

  if (!verified) {
    return null;
  }

  dbQuery = `INSERT INTO sessions VALUES ("${sessionId}", "${currentUser.id}", "${accessToken}")`;
  try {
    await query(dbQuery);
    return {
      id: sessionId,
      user_id: currentUser.id,
      access_token: accessToken,
    };
  } catch (err) {
    console.warn(err);
    return null;
  }
};

const checkIfUserExists = async (username) => {
  const dbQuery = `SELECT * FROM users WHERE users.username = "${username}"`;
  const [users] = await query(dbQuery);
  return !!users.length;
};

const readUser = async (userId) => {
  const dbQuery = `SELECT * FROM users WHERE users.id = "${userId}"`;
  const [users] = await query(dbQuery);
  return users[0];
};

const createUser = async (
  username,
  hashedPassword,
  accessToken,
  userId,
  sessionId
) => {
  let dbQuery = `INSERT INTO users VALUES ("${userId}", "${username}", "${hashedPassword}")`;
  try {
    await query(dbQuery);
    dbQuery = `INSERT INTO sessions VALUES ("${sessionId}", "${userId}", "${accessToken}")`;
    await query(dbQuery);
    return {
      id: sessionId,
      user_id: userId,
      access_token: accessToken,
    };
  } catch (err) {
    console.warn(err);
    return null;
  }
};

module.exports = {
  currentUser,
  createSession,
  createUser,
  checkIfUserExists,
  readUser,
};
