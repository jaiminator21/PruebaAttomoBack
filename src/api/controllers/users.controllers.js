const User = require("../models/users.model");
const { generateSign } = require("../../utils/jwt");
const { validateEmail, validatePassword, usedEmail } = require("../../utils/validators");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  console.log(req.body);
  
  try {
    const newUser = new User(req.body);
    if (!validateEmail(newUser.email)) { //using validators to check if the email is valid
      return res.status(400).json({
        message:
          "Please enter a valid email.",
      }); 
    }
    console.log("email correcto");
    if (!validatePassword(newUser.password)) {//using validators to check if the password is valid
      return res.status(400).json({
        message:
          "The password does not meet the required parameters: 1 lowercase, 1 uppercase, 1 number, and 1 special character. ",
      });     
    }
    console.log("password correcto");
    if (await usedEmail(newUser.email)) {//checks if the email being registered exists
      return res.status(400).json({
        message: "This email is already in use.",
      });
    }
    console.log("email unico");
    const salt = 10; //lvl of encryption
    newUser.password = bcrypt.hashSync( //function to encrypt the password
      newUser.password,salt
    );
    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const userInfo = await User.findOne({ email: req.body.email }); //after the isAuth, it searches for the email that it recived 
    console.log("Informacion del usuario",userInfo);
    
    if (!userInfo) {//if there is no user
      return res.status(404).json({ message: "This user doesn't exist" });
    }
    if (!bcrypt.compareSync(req.body.password, userInfo.password)) { // after decypting the passwords it checks if they are the same
      return res.status(404).json({ message: "The passwords isn't correct" });
    }
    const token = generateSign(userInfo._id, userInfo.email, userInfo.username, userInfo._id); //generates token
    return res.status(200).json({ user: userInfo, token: token });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json(error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = null; // deletes token
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next(setError(error.statusCode, "Logout Error"));
  }
};

const putUser = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params; // Extract the game ID from the request parameters
    const putUser = new User(req.body); // Create a new Game instance with updated data from the request body
    putUser._id = id; // Set the ID of the game instance to update
    const updateUser = await User.findByIdAndUpdate(id, putUser); // Find the game by ID and update it with the new game instance
    if (!updateUser) {
      return res.status(404).json({ message: "The User ID does not exist" }); // If the game ID doesn't exist, return a JSON response with status 404
    }
    return res.status(200).json(updateUser); // Return a JSON response with status 200 containing the updated game
  } catch (error) {
    return res.status(500).json(error); // If an error occurs, return a JSON response with status 500 and the error message
  }
};


const checkSession = (req, res) => {
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    return res.tatus(500).json(error);
  }
};

const checkVotes = (req, res) => {
  maxVotes = 5;
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    return res.tatus(500).json(error);
  }
};

module.exports = { register, login, logout, checkSession, putUser };
