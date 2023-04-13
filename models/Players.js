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
  },
  win: {
    type: String,
  },
  loss: {
    type: String,
  },
});

// const Players = mongoose.model("Players", PlayersSchema);
// module.exports = Players;

module.exports = mongoose.model("Players", PlayersSchema);
