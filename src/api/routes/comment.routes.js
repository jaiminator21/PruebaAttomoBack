const express = require("express");
const commentsRouter = express.Router();
const {
  postComment,
/*   deleteComment,
  putComment, */
} = require("../controllers/comment.controllers");
const {
  isAuth,
} = require("../../middlewares/auth"); 

//gamesRouter.post("/", postComment);
/* gamesRouter.get("/", getComment);
gamesRouter.put("/:id", putComment);
gamesRouter.delete("/:id", deleteComment);
 */

module.exports = commentsRouter;
