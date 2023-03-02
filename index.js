const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

const db = mongoose.connection;
const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PlayersModel = require("./models/Players");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:Password2@cluster0.9id8wxc.mongodb.net/TTT?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/insert", async (req, res) => {
  const id = req.body.id;
  const player = req.body.player;
  const rank = req.body.rank;

  const newplayer = new PlayersModel({ id: id, player: player, rank: rank });

  try {
    await newplayer.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
