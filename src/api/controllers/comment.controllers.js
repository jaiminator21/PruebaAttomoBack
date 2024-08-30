const Comment = require("../models/comment.model");
const User = require("../models/users.model");
const Game = require("../models/games.model");
const bcrypt = require("bcrypt");



const postComment = async (req, res, next) => {
 
  try {
    const userId = req.user._id; // Obtén el ID del usuario autenticado
    const gameId = req.body.gameId; // Asume que el ID del juego se pasa en el cuerpo de la solicitud
    const content = req.body.content; // Asume que el ID del juego se pasa en el cuerpo de la solicitud
    console.log(req.body);
    
    if (!gameId) {
      return res.status(400).json({ message: "Game ID is required." });
    }

    // Crear el comentario
    const comment = await Comment.create({
      ...req.body,
      owner: userId, // Asocia el comentario con el usuario autenticado
      content: content
    });

    // Actualizar el juego con el nuevo comentario


    // Enviar respuesta al cliente
    res.status(201).json({
      status: 201,
      message: "Comment created successfully.",
      data: comment,
    });
  } catch (error) {
    // Manejar errores específicos
    next(error);
  }
};

module.exports = {
  postComment,
};


const s = async (req, res) => {
  console.log(req);

  try {
    const { owner, content } = req.body;

    // Validar que los campos necesarios estén presentes
    if (!owner || !content) {
      return res.status(400).json({ message: 'Owner y content son requeridos.' });
    }

    // Verificar que el owner (user) existe en la base de datos
    const userExists = await User.findById(owner);
    if (!userExists) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Crear el comentario
    const newComment = new Comment({
      owner,
      content,
    });

    // Guardar el comentario en la base de datos
    await newComment.save();
    const updateGame = await Game.findByIdAndUpdate(
      userId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    // Devolver la respuesta con el comentario creado
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el comentario.' });
  }
};



module.exports = { postComment }
