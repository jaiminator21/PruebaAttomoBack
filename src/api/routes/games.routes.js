const express = require("express");
const upload = require("../../middlewares/upload.file");

const {
  isAuth,
} = require("../../middlewares/auth"); 
const { getGames, postGame, putGame, deleteGame, getGameById, AddVotes } = require("../controllers/games.controller");


const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", getGameById);
gamesRouter.post("/",  upload.single('cover') , postGame);
gamesRouter.put("/:id", putGame);
gamesRouter.delete("/:id", deleteGame);

module.exports = gamesRouter;
