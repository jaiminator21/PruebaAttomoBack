const express = require("express");
const userRoutes = express.Router();
const {
  register,
  login,
  logout,
  checkSession,
  checkAdmin,
  putUser,
} = require("../controllers/users.controllers");
const {
  isAuth,
} = require("../../middlewares/auth"); 

userRoutes.post("/register", register); 
userRoutes.post("/login", login); 
userRoutes.put("/:id", putUser); 
userRoutes.post("/logout", [isAuth], logout);
userRoutes.get("/checksession", [isAuth], checkSession);
userRoutes.get("/checkadmin", [isAuth], checkAdmin);

module.exports = userRoutes;
