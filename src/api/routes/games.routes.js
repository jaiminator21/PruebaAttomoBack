const express = require("express");
const upload = require("../../middlewares/upload.file");

const {
  isAuth,
} = require("../../middlewares/auth"); 
const { getGames, postGame, putGame, deleteGame, getGameById,} = require("../controllers/games.controller");


const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", getGameById);
gamesRouter.post("/",  [isAuth],upload.single('cover') , postGame);
gamesRouter.put("/:id", [isAuth], putGame);
gamesRouter.delete("/:id", [isAuth],deleteGame);

module.exports = gamesRouter;
