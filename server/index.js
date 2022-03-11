const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const bodyParser = require("body-parser");

const { games, auth, users } = require("./endpoints");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.post("/games", games.createGame);

app.post("/sessions", auth.signIn);

app.post("/users", auth.signUp);

app.get("/user/:id", users.showUser);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
