const { userCalls } = require("../../utils");

const showUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await userCalls.readUser(userId);

  if (!user || !user.username) {
    return res.status(404).json({
      errors: ["User not found!"],
    });
  }

  res.json({
    data: user.username,
  });
};

module.exports = showUser;
