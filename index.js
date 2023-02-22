const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PlayersModel = require("./models/Players");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:Password2@cluster0.9id8wxc.mongodb.net/TTT?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const id = req.body.id;
  const player = req.body.player;
  const rank = req.body.rank;
  //   const player = new PlayersModel({ id: "2", player: "Bobby", rank: "2" });

  try {
    await player.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
