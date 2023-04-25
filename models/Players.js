const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  win: {
    type: String,
    required: true,
  },
  loss: {
    type: String,
    required: true,
  },
});

// const Players = mongoose.model("Players", PlayersSchema);
// module.exports = Players;

module.exports = mongoose.model("Players", PlayersSchema);
