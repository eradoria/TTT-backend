const mongoose = require("mongoose");

const PlayersSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  player: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
});

// const Players = mongoose.model("Players", PlayersSchema);
// module.exports = Players;

module.exports = mongoose.model("Players", PlayersSchema);
