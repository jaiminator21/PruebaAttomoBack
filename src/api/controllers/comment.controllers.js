const Comment = require("../models/comment.model");
const Game = require("../models/games.model"); // Import the Game model
const bcrypt = require("bcrypt");

/* const getComments = async (req, res) => {
  console.log(req);
  try {
    const comments = await Comment.find(); // Retrieve all games from the database using the Game model
    return res.status(200).json(game); // Return a JSON response with status 200 containing all games
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return the error msg
  }
};
 */



/* const putComment = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params; // 
    const putComment = new User(req.body); // 
    putComment._id = id; // 
    const updateComment = await User.findByIdAndUpdate(id, putComment); // 
    if (!updateComment) {
      return res.status(404).json({ message: "The Comment ID does not exist" }); //
    }
    return res.status(200).json(updateComment); //
  } catch (error) {
    return res.status(500).json(error); // 
  }
};
 */
/* const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Extract the game ID from the request parameters
    const deleteComment = await Comment.findByIdAndDelete(id); // Find the game by ID and delete it from the database
    if (!deleteComment) {
      return res.status(404).json({ message: "The game ID does not exist" }); // If the game ID doesn't exist, return a JSON response with status 404
    }
    return res.status(200).json(deleteComment); // Return a JSON response with status 200 containing the deleted game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
}; */




module.exports = {  }
