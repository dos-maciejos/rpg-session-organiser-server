const uuid = require("uuid");
const { userCalls, hash } = require("../../utils");
const { validateUsername, validatePassword } = require("../../validators");

const signUp = async (req, res) => {
  const { username, password } = req.body;
  const accessToken = uuid.v4();
  const sessionId = uuid.v4();
  const userId = uuid.v4();
  const hashedPassword = await hash(password);

  const exists = await userCalls.checkIfUserExists(username);

  if (exists) {
    return res.status(403).json({
      errors: ["That username already exists!"],
    });
  }

  const session = await userCalls.createUser(
    username,
    hashedPassword,
    accessToken,
    userId,
    sessionId
  );

  if (!session) {
    return res.status(401).json({
      errors: ["Invalid credentials!"],
    });
  }

  res.status(201).json({
    data: {
      session,
    },
  });
};

module.exports = signUp;
