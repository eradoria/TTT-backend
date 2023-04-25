const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const db = mongoose.connection;
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const { USER, PASSWORD, PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PlayersModel = require("./models/Players");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:Password2@cluster0.9id8wxc.mongodb.net/TTT",
  {
    useNewUrlParser: true,
  }
);

app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("Welcome to our server!");
});

app.get("/rankings", async (req, res) => {
  PlayersModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.post("/insert", async (req, res) => {
  console.log(req.body); // the request body is being received correctly
  const player = req.body.player;
  const rank = req.body.rank;
  const status = req.body.status;
  const win = req.body.win;
  const loss = req.body.loss;

  const newplayer = new PlayersModel({
    player: player,
    rank: rank,
    status: status,
    win: win,
    loss: loss,
  });

  try {
    console.log(newplayer); // the request body is being received correctly
    await newplayer.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const id = req.body.id;
  const newRank = req.body.newRank;

  try {
    await PlayersModel.findById(id, (err, updateRank) => {
      updateRank.rank = newRank;
      updateRank.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/readd", async (req, res) => {
  console.log(req.body); // the request body is being received correctly
  const id = req.body.id;
  const newRank = req.body.newRank;
  const status = req.body.status;

  try {
    await PlayersModel.findByIdAndUpdate(id, {
      rank: newRank,
      status: status,
    });
    res.send("readd");
    console.log("player added back to rankings");
  } catch (err) {
    console.log(err);
  }
});

app.put("/remove", async (req, res) => {
  console.log(req.body); //  request body is being received correctly
  const id = req.body.id;
  const newStatus = req.body.newStatus;
  console.log(id);
  console.log(newStatus);
  try {
    await PlayersModel.findById(id, (err, updateStatus) => {
      updateStatus.status = newStatus;
      updateStatus.save();
      res.send("removed");
      console.log("player removed from rankings");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await PlayersModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
