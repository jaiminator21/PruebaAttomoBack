const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    genre: {
      type: String,
      required: false,
    },
    votes: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
      required: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true } // Esto añade automáticamente campos createdAt y updatedAt
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
