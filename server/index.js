const express = require("express");
const cors = require("cors")
const uuid = require("uuid");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});

let gm;
let users = [];
let dates = [];
let propositions = [];

app.post("/session", (req, res) => {
  console.log(req.body);
  const userId = uuid.v4();
  let session = {
    access_token: userId,
    is_gm: false,
  }
  if (gm === undefined) {
    if (req.query.is_gm) {
      gm = {
        username: req.query.username,
        uuid: userId,
      }
      session.is_gm = true;
    }
    else {
      users.push({
        username: req.query.username,
        uuid: userId,
      })
    }
  }
  else if (gm && gm.username === req.query.username) {
    session.is_gm = true;
    gm.uuid = userId;
  }
  else {
    users.push({
      username: req.query.username,
      uuid: userId,
    })
  }
  res.json(session)
});

app.post("/date", (req, res) => {
  if (req.query.access_token === gm.uuid) {
    dates.push({
      hour: req.query.hour,
      day: req.query.day,
      month: req.query.month,
      year: req.query.year,
    });
  }
  res.json(dates)
});

app.get("/dates", (_, res) => {
  res.json(dates);
});

const checkIfPropositionIsADate = (proposition, date) => {
  return date.day === proposition.day && date.month === proposition.month && date.year === proposition.year && date.hour >= proposition.hour
}

const validateProposition = (proposition) => {
  for (let i = 0; i < dates.length; i ++) {
    if (!checkIfPropositionIsADate(proposition, dates[i])) {
      return true;
    }
  }
  return false;
}

app.post("/proposition", (req, res) => {
  if (validateProposition(req.query)) {
    propositions.push({
      hour: req.query.hour,
      day: req.query.day,
      month: req.query.month,
      year: req.query.year,
    });
  }
  res.json(propositions)
});

app.get("/propositions", (_, res) => {
  res.json(propositions);
});


// TODO CLASS/FUNCTION OF USER, ADD USER ID AND ACCESS TOKEN SEPERATELY, VALIDATE !!
