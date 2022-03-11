const uuid = require("uuid");
const { userCalls } = require("../../utils");
const { validateUsername, validatePassword } = require("../../validators");

const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!validateUsername(username)) {
    return res.status(422).json({
      errors: ["Inproper username!"],
    });
  }

  if (!validatePassword(password)) {
    return res.status(422).json({
      errors: ["Inproper password!"],
    });
  }

  const accessToken = uuid.v4();
  const sessionId = uuid.v4();

  const session = await userCalls.createSession(
    username,
    password,
    accessToken,
    sessionId
  );

  if (!session) {
    return res.status(401).json({
      errors: ["Invalid credentials!"],
    });
  }

  res.status(201).json({
    data: session,
  });
};

module.exports = signIn;
