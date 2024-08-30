const express = require("express");
const commentsRouter = express.Router();
const {
  postComment,
} = require("../controllers/comment.controllers");

const {
  isAuth,
} = require("../../middlewares/auth"); 



commentsRouter.post("/" , [isAuth],postComment);

module.exports = commentsRouter;
