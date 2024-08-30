const Game = require("../models/games.model"); // Import the Game model
const Comment = require("../models/comment.model"); // Import the Game model
const { deleteFile } = require("../../middlewares/delete.file"); // Import the deleteFile function
const cloudinary = require("cloudinary").v2;

const getGames = async (req, res) => {
  console.log(req);
  try {
    const game = await Game.find(); // Retrieve all games from the database using the Game model
    return res.status(200).json(game); // Return a JSON response with status 200 containing all games
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return the error msg
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).populate('comments');
    console.log(game);
    if (game) {
      res.status(200).json({
        status: 200,
        data: game,
      });
    } else {
      res.status(404).json({ status: 404, message: "Game not found" });
    }
  } catch (error) {
    next(error);
  }
};

const postGame = async (req, res) => {

  
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!req.body.genre) {
      return res.status(400).json({ message: "Genre is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const newGame = new Game({
      name: req.body.name,
      genre: req.body.genre,
      votes: req.body.votes || 0,
      cover: req.file.path, // Asigna el path de la imagen subida
    });

    const createdGame = await newGame.save();
    console.log(createdGame);
    
    return res.status(201).json(createdGame);
  } catch (error) {
    return res.status(500).json(error);
  }
};



const putGame = async (req, res) => {
  try {
    const { id } = req.params; // Extract the game ID from the request parameters
    const putGame = new Game(req.body); // Create a new Game instance with updated data from the request body
    putGame._id = id; // Set the ID of the game instance to update
    console.log(putGame.cover);
    
    const updateGame = await Game.findByIdAndUpdate(id, putGame); // Find the game by ID and update it with the new game instance
    if (!updateGame) {
      return res.status(404).json({ message: "The game ID does not exist" }); // If the game ID doesn't exist, return a JSON response with status 404
    }
    
    return res.status(200).json(updateGame); // Return a JSON response with status 200 containing the updated game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
};

const deleteGame = async (req, res) => {
  try {
    const { id } = req.params; // Extract the game ID from the request parameters
    const deleteGame = await Game.findByIdAndDelete(id); // Find the game by ID and delete it from the database
    if (!deleteGame) {
      return res.status(404).json({ message: "The game ID does not exist" }); // If the game ID doesn't exist, return a JSON response with status 404
    }
    if (deleteGame.cover.includes("cloudinary")) {
      deleteFile(deleteGame.cover);
    }
/*     for (const image of deleteGame.images) {
      if (image.includes("cloudinary")) {
        deleteFile(image)z
      }
    } */
    return res.status(200).json(deleteGame); // Return a JSON response with status 200 containing the deleted game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
};


const AddVotes = async(req,res)=>{
  try {


    return res.status(200).json(updateGame); // Return a JSON response with status 200 containing the updated game
  } catch (error) {
    return res.status(500).json(error);// If an error occurs, return a JSON response with status 500 and the error message
  }
}

module.exports = { getGames, getGameById, postGame, putGame, deleteGame,  AddVotes, }; // Export the functions getGames, postGame, putGame, and deleteGame for use in other files
