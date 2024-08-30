const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Games" }],
  
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
