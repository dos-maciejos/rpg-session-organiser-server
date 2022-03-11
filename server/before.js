let gm;
let users = [];
let dates = [];
let propositions = [];

app.post("/session", (req, res) => {
  const accessToken = uuid.v4();
  let session = {
    access_token: accessToken,
    is_gm: !!req.body.is_gm,
  };
  if (gm === undefined) {
    if (session.is_gm) {
      gm = {
        username: req.body.username,
        access_token: accessToken,
      };
    } else {
      users.push({
        username: req.body.username,
        access_token: accessToken,
      });
    }
  } else if (gm.username === req.body.username) {
    gm.access_token = accessToken;
    session.is_gm = true;
  } else {
    session.is_gm = false;
    users.push({
      username: req.body.username,
      access_token: accessToken,
    });
  }
  res.json(session);
});

app.post("/date", (req, res) => {
  if (req.body.access_token === gm.access_token) {
    dates.push({
      hour: req.body.hour,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
    });
  }
  res.json({});
});

app.get("/dates", (_, res) => {
  res.json(dates);
});

const checkIfPropositionIsADate = (proposition, date) => {
  return (
    date.day === proposition.day &&
    date.month === proposition.month &&
    date.year === proposition.year &&
    date.hour >= proposition.hour
  );
};

const validateProposition = (proposition) => {
  for (let i = 0; i < dates.length; i++) {
    if (!checkIfPropositionIsADate(proposition, dates[i])) {
      return true;
    }
  }
  return false;
};

app.post("/proposition", (req, res) => {
  if (validateProposition(req.body)) {
    propositions.push({
      hour: req.body.hour,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
    });
  }
  res.json({});
});

app.get("/propositions", (_, res) => {
  res.json(propositions);
});

// Import the functions you need from the SDKs you need
const firebase = require("firebase");
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPb9wgk4Dc_aTPOUOBanbVEvXUkVFUZVQ",
  authDomain: "rpg-session-organiser-database.firebaseapp.com",
  projectId: "rpg-session-organiser-database",
  storageBucket: "rpg-session-organiser-database.appspot.com",
  messagingSenderId: "336454171220",
  appId: "1:336454171220:web:1561ebbac3edf93c1f4bc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
