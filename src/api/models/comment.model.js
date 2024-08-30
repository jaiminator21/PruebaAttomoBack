const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    content: {
      type: String, // Contenido del comentario
      required: true,
    },

    date: {
      type: Date, // Fecha del comentario
      default: Date.now,
    },
  }
);

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
